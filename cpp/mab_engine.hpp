#ifndef MAB_ENGINE_HPP
#define MAB_ENGINE_HPP

#include <vector>
#include <cmath>
#include <cstdint>
#include <algorithm>
#include <numeric>
#include <random>
#include <iostream>

struct SplitResult {
    int best_feature;
    int best_bin;
    double best_gain;
    int samples_evaluated;
};

// Online Welford accumulator for running mean and sample variance
struct WelfordStats {
    double mean = 0.0;
    double m2 = 0.0;
    int count = 0;

    inline void update(double x) {
        count++;
        double delta = x - mean;
        mean += delta / count;
        double delta2 = x - mean;
        m2 += delta * delta2;
    }

    inline double variance() const {
        return (count > 1) ? (m2 / (count - 1)) : 0.25;
    }
};

// Serfling / Bardenet-Maillard finite-population Empirical Bernstein bound
inline double compute_serfling_bound(double variance, int n_sampled, int N_total, double delta) {
    if (n_sampled <= 1) return 1.0;
    if (n_sampled >= N_total) return 0.0;

    double fp_factor = std::max(0.0, 1.0 - (static_cast<double>(n_sampled) - 1.0) / static_cast<double>(N_total));
    if (fp_factor <= 1e-9) return 0.0;

    double log_term = std::log(3.0 / std::max(delta, 1e-12));
    double v = std::max(variance, 1e-7);
    double term1 = std::sqrt(2.0 * v * fp_factor * log_term / static_cast<double>(n_sampled));
    double term2 = 3.0 * log_term * fp_factor / static_cast<double>(n_sampled);
    return term1 + term2;
}

// Multi-class Gini impurity calculation across bins for a single feature
inline void compute_gini_gains(
    const std::vector<int>& hist_f, // [256 * n_classes]
    int actual_bins,
    const std::vector<int>& batch_class_counts,
    int batch_size,
    int n_classes,
    std::vector<float>& gains_out
) {
    std::fill(gains_out.begin(), gains_out.end(), -1.0f);
    if (batch_size <= 1) return;

    double total_sq = 0.0;
    for (int c = 0; c < n_classes; ++c) {
        double p = static_cast<double>(batch_class_counts[c]) / batch_size;
        total_sq += p * p;
    }
    double total_gini = 1.0 - total_sq;

    std::vector<double> left_counts(n_classes, 0.0);
    double left_total = 0.0;

    for (int b = 0; b < actual_bins - 1; ++b) {
        for (int c = 0; c < n_classes; ++c) {
            int cnt = hist_f[b * n_classes + c];
            left_counts[c] += cnt;
            left_total += cnt;
        }

        double right_total = batch_size - left_total;
        if (left_total < 1.0 || right_total < 1.0) continue;

        double left_sq = 0.0;
        double right_sq = 0.0;
        for (int c = 0; c < n_classes; ++c) {
            double p_l = left_counts[c] / left_total;
            left_sq += p_l * p_l;

            double p_r = (batch_class_counts[c] - left_counts[c]) / right_total;
            right_sq += p_r * p_r;
        }

        double gini_l = 1.0 - left_sq;
        double gini_r = 1.0 - right_sq;
        double split_gini = (left_total / batch_size) * gini_l + (right_total / batch_size) * gini_r;
        double gain = total_gini - split_gini;
        gains_out[b] = static_cast<float>(gain > 0.0 ? gain : 0.0);
    }
}

class FastMABEngineCpp {
public:
    int n_features;
    int n_classes;
    int max_bins;
    double delta;
    bool use_serfling;

    FastMABEngineCpp(int n_features, int n_classes, int max_bins = 256, double delta = 0.05, bool use_serfling = true)
        : n_features(n_features), n_classes(n_classes), max_bins(max_bins), delta(delta), use_serfling(use_serfling) {}

    SplitResult find_best_split(
        const std::vector<uint8_t>& X_binned, // Column-major (F * N) or Row-major
        const std::vector<int>& y,
        const std::vector<int>& node_indices,
        const std::vector<int>& candidate_features,
        const std::vector<int>& actual_bins_per_feat,
        int N_total_dataset,
        int m0 = 100,
        int m_min = 15,
        double alpha = 1.0,
        bool use_adaptive_batch = true
    ) {
        int N_node = static_cast<int>(node_indices.size());
        if (N_node <= 1 || candidate_features.empty()) {
            return {-1, -1, 0.0, 0};
        }

        std::vector<int> shuffled_indices = node_indices;
        std::mt19937 g(42);
        std::shuffle(shuffled_indices.begin(), shuffled_indices.end(), g);

        // Arm tracking
        std::vector<std::vector<WelfordStats>> stats(n_features, std::vector<WelfordStats>(max_bins));
        std::vector<std::vector<bool>> active_arms(n_features, std::vector<bool>(max_bins, false));
        std::vector<bool> active_feats(n_features, false);

        int total_arms = 0;
        for (int f : candidate_features) {
            active_feats[f] = true;
            int n_b = actual_bins_per_feat[f] - 1;
            for (int b = 0; b < n_b; ++b) {
                active_arms[f][b] = true;
                total_arms++;
            }
        }

        if (total_arms == 0) return {-1, -1, 0.0, 0};

        int cursor = 0;
        int cumulative_sampled = 0;
        int active_count = total_arms;

        std::vector<float> gains_buf(max_bins);
        std::vector<int> batch_class_counts(n_classes, 0);
        std::vector<int> hist_f(max_bins * n_classes, 0);

        while (active_count > 1 && cursor < N_node) {
            int remaining = N_node - cursor;
            int batch_size;
            if (!use_adaptive_batch) {
                batch_size = std::min(m0, remaining);
            } else {
                double ratio = static_cast<double>(std::max(1, active_count)) / total_arms;
                int calc_m = static_cast<int>(std::max(static_cast<double>(m_min), std::floor(m0 * std::pow(ratio, alpha))));
                batch_size = std::min(calc_m, remaining);
            }

            if (batch_size <= 0) break;

            int start_idx = cursor;
            int end_idx = cursor + batch_size;
            cursor = end_idx;
            cumulative_sampled += batch_size;

            std::fill(batch_class_counts.begin(), batch_class_counts.end(), 0);
            for (int i = start_idx; i < end_idx; ++i) {
                batch_class_counts[y[shuffled_indices[i]]]++;
            }

            double best_lcb = -1e9;
            std::vector<std::vector<double>> ucb_vals(n_features, std::vector<double>(max_bins, 0.0));

            for (int f : candidate_features) {
                if (!active_feats[f]) continue;
                int n_b = actual_bins_per_feat[f] - 1;

                std::fill(hist_f.begin(), hist_f.end(), 0);
                for (int i = start_idx; i < end_idx; ++i) {
                    int row = shuffled_indices[i];
                    uint8_t bin_val = X_binned[row * n_features + f];
                    int lbl = y[row];
                    hist_f[bin_val * n_classes + lbl]++;
                }

                compute_gini_gains(hist_f, actual_bins_per_feat[f], batch_class_counts, batch_size, n_classes, gains_buf);

                for (int b = 0; b < n_b; ++b) {
                    if (!active_arms[f][b]) continue;
                    double obs_gain = std::max(0.0f, gains_buf[b]);
                    stats[f][b].update(obs_gain);

                    double var = stats[f][b].variance();
                    double bound = use_serfling ?
                        compute_serfling_bound(var, cumulative_sampled, N_node, delta) :
                        std::sqrt(std::log(2.0 / std::max(delta, 1e-12)) / (2.0 * cumulative_sampled));

                    double lcb = stats[f][b].mean - bound;
                    double ucb = stats[f][b].mean + bound;
                    ucb_vals[f][b] = ucb;

                    if (lcb > best_lcb) {
                        best_lcb = lcb;
                    }
                }
            }

            // Arm elimination
            int new_active = 0;
            for (int f : candidate_features) {
                if (!active_feats[f]) continue;
                int n_b = actual_bins_per_feat[f] - 1;
                bool feat_active = false;
                for (int b = 0; b < n_b; ++b) {
                    if (active_arms[f][b]) {
                        if (ucb_vals[f][b] < best_lcb) {
                            active_arms[f][b] = false;
                        } else {
                            new_active++;
                            feat_active = true;
                        }
                    }
                }
                active_feats[f] = feat_active;
            }

            active_count = new_active;
            if (cursor >= N_node) break;
        }

        // Return best arm
        int best_f = -1;
        int best_b = -1;
        double max_mean = -1.0;
        for (int f : candidate_features) {
            int n_b = actual_bins_per_feat[f] - 1;
            for (int b = 0; b < n_b; ++b) {
                if (stats[f][b].mean > max_mean) {
                    max_mean = stats[f][b].mean;
                    best_f = f;
                    best_b = b;
                }
            }
        }

        return {best_f, best_b, std::max(max_mean, 0.0), cumulative_sampled};
    }
};

#endif // MAB_ENGINE_HPP
