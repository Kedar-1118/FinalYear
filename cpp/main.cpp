#include "mab_engine.hpp"
#include <chrono>
#include <iostream>
#include <vector>
#include <random>

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << " MABSplit C++ High-Performance Engine Benchmark" << std::endl;
    std::cout << "==========================================================" << std::endl;

    const int N = 100000; // 100k samples
    const int F = 20;     // 20 features
    const int C = 2;      // 2 classes
    const int B = 128;    // 128 bins

    std::cout << "Generating synthetic binned dataset: " << N << " samples, " << F << " features..." << std::endl;

    std::vector<uint8_t> X_binned(N * F);
    std::vector<int> y(N);
    std::vector<int> node_indices(N);
    std::vector<int> candidate_features(F);
    std::vector<int> actual_bins_per_feat(F, B);

    std::mt19937 rng(42);
    std::uniform_int_distribution<int> bin_dist(0, B - 1);
    std::uniform_int_distribution<int> label_dist(0, C - 1);

    for (int i = 0; i < N; ++i) {
        node_indices[i] = i;
        y[i] = label_dist(rng);
        for (int f = 0; f < F; ++f) {
            // Plant informative signal in feature 3
            if (f == 3) {
                X_binned[i * F + f] = (y[i] == 1) ? bin_dist(rng) / 2 : bin_dist(rng);
            } else {
                X_binned[i * F + f] = static_cast<uint8_t>(bin_dist(rng));
            }
        }
    }
    std::iota(candidate_features.begin(), candidate_features.end(), 0);

    FastMABEngineCpp engine(F, C, 256, 0.05, true);

    std::cout << "Running MAB Active Arm Elimination on " << N << " samples..." << std::endl;
    auto start = std::chrono::high_resolution_clock::now();

    SplitResult res = engine.find_best_split(
        X_binned,
        y,
        node_indices,
        candidate_features,
        actual_bins_per_feat,
        N,
        120, // m0
        20,  // m_min
        1.0, // alpha
        true // use_adaptive_batch
    );

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> elapsed = end - start;

    std::cout << "\n------------------- Split Results -------------------" << std::endl;
    std::cout << "Best Feature:       " << res.best_feature << std::endl;
    std::cout << "Best Bin:           " << res.best_bin << std::endl;
    std::cout << "Best Gini Gain:     " << res.best_gain << std::endl;
    std::cout << "Samples Evaluated:  " << res.samples_evaluated << " / " << N 
              << " (" << (100.0 * res.samples_evaluated / N) << "% sample read)" << std::endl;
    std::cout << "Execution Time:     " << elapsed.count() << " ms" << std::endl;
    std::cout << "==========================================================" << std::endl;

    return 0;
}
