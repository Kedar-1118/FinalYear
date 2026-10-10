#ifndef SERFLING_BOUNDS_HPP
#define SERFLING_BOUNDS_HPP

#include <cmath>
#include <algorithm>
#include <vector>

namespace mabsplit {

/**
 * @brief Computes finite population correction coefficient kappa(n, N) = 1 - (n - 1) / N.
 * 
 * @param n_sampled Number of instances evaluated without replacement.
 * @param N_total Total number of instances partitioned to the current node.
 * @return double Finite population factor in [0.0, 1.0].
 */
inline double finite_population_factor(int n_sampled, int N_total) {
    if (n_sampled <= 1) return 1.0;
    if (n_sampled >= N_total) return 0.0;
    double fp = 1.0 - (static_cast<double>(n_sampled) - 1.0) / static_cast<double>(N_total);
    return (fp > 0.0) ? fp : 0.0;
}

/**
 * @brief Serfling / Bardenet-Maillard empirical Bernstein bound radius for non-replacement sampling.
 *
 * Radius formula:
 *   Rad = sqrt(2 * variance * kappa * ln(3/delta) / n) + 3 * ln(3/delta) * kappa / n
 *
 * @param variance Empirical sample variance of the candidate arm.
 * @param n_sampled Current number of evaluated samples.
 * @param N_total Total dataset size at node.
 * @param delta Confidence parameter (failure probability).
 * @return double Confidence radius epsilon_t.
 */
inline double serfling_empirical_bernstein_radius(
    double variance,
    int n_sampled,
    int N_total,
    double delta
) {
    if (n_sampled <= 1) return 1.0;
    if (n_sampled >= N_total) return 0.0;

    const double kappa = finite_population_factor(n_sampled, N_total);
    if (kappa <= 1e-12) return 0.0;

    const double safe_delta = (delta > 1e-12) ? delta : 1e-12;
    const double log_term = std::log(3.0 / safe_delta);
    const double v = (variance > 1e-7) ? variance : 1e-7;
    const double n_d = static_cast<double>(n_sampled);

    const double term1 = std::sqrt(2.0 * v * kappa * log_term / n_d);
    const double term2 = 3.0 * log_term * kappa / n_d;
    return term1 + term2;
}

/**
 * @brief Vectorized / batch calculation of Serfling bounds for an array of active arms.
 */
inline void compute_batch_serfling_radii(
    const std::vector<double>& variances,
    int n_sampled,
    int N_total,
    double delta,
    std::vector<double>& radii_out
) {
    radii_out.resize(variances.size());
    const double kappa = finite_population_factor(n_sampled, N_total);
    if (kappa <= 1e-12) {
        std::fill(radii_out.begin(), radii_out.end(), 0.0);
        return;
    }

    const double safe_delta = (delta > 1e-12) ? delta : 1e-12;
    const double log_term = std::log(3.0 / safe_delta);
    const double n_d = static_cast<double>(n_sampled);
    const double scale1 = std::sqrt(2.0 * kappa * log_term / n_d);
    const double term2 = 3.0 * log_term * kappa / n_d;

    for (size_t i = 0; i < variances.size(); ++i) {
        double v = (variances[i] > 1e-7) ? variances[i] : 1e-7;
        radii_out[i] = std::sqrt(v) * scale1 + term2;
    }
}

} // namespace mabsplit

#endif // SERFLING_BOUNDS_HPP
