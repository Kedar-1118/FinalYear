// Pre-packaged Benchmark Dataset Analysis and Tree Split Hierarchies
window.MAB_ANALYSIS_DATA = {
  "adult": {
    "dataset_name": "Adult Census Income",
    "n_samples": 15000,
    "n_features": 14,
    "n_classes": 2,
    "class_names": [
      "<=50K",
      ">50K"
    ],
    "feature_names": [
      "age",
      "workclass",
      "fnlwgt",
      "education",
      "education.num",
      "marital.status",
      "occupation",
      "relationship",
      "race",
      "sex",
      "capital.gain",
      "capital.loss",
      "hours.per.week",
      "native.country"
    ],
    "performance": {
      "mab_fit_time_sec": 1.866,
      "std_dt_fit_time_sec": 0.0152,
      "speedup_ratio": 0.01,
      "total_nodes": 57,
      "tree_depth": 5,
      "splits_by_mode": {
        "exact": 15,
        "mab": 15
      },
      "samples_evaluated": 53428,
      "theoretical_full_scan_samples": 420000,
      "sample_evaluation_reduction_pct": 87.3
    },
    "top_features": {
      "top_3": [
        "capital.gain",
        "education.num",
        "relationship"
      ],
      "top_5": [
        "capital.gain",
        "education.num",
        "relationship",
        "age",
        "hours.per.week"
      ],
      "top_5_cumulative_pct": 74.25
    },
    "root_split": {
      "node_id": 0,
      "depth": 0,
      "feature_name": "relationship",
      "threshold": 0.5,
      "samples": 15000,
      "solver_mode": "mab",
      "gini": 0.3658,
      "gini_gain": 0.0565,
      "left_samples": 6052,
      "right_samples": 8948,
      "left_pred": "<=50K",
      "right_pred": "<=50K"
    },
    "final_splits_count": 13,
    "final_splits": [
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "hours.per.week",
        "threshold": 46.5,
        "samples": 7631,
        "solver_mode": "mab",
        "gini": 0.0763,
        "gini_gain": 0.0025,
        "left_samples": 6575,
        "right_samples": 1056,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "education.num",
        "threshold": 9.5,
        "samples": 2746,
        "solver_mode": "mab",
        "gini": 0.4422,
        "gini_gain": 0.0171,
        "left_samples": 1776,
        "right_samples": 970,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 5095.5,
        "samples": 1334,
        "solver_mode": "mab",
        "gini": 0.3428,
        "gini_gain": 0.0193,
        "left_samples": 1104,
        "right_samples": 230,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "age",
        "threshold": 31.5,
        "samples": 1216,
        "solver_mode": "mab",
        "gini": 0.3178,
        "gini_gain": 0.0029,
        "left_samples": 750,
        "right_samples": 466,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "education.num",
        "threshold": 8.5,
        "samples": 480,
        "solver_mode": "exact",
        "gini": 0.4537,
        "gini_gain": 0.021,
        "left_samples": 66,
        "right_samples": 414,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "age",
        "threshold": 32.5,
        "samples": 411,
        "solver_mode": "exact",
        "gini": 0.392,
        "gini_gain": 0.0227,
        "left_samples": 105,
        "right_samples": 306,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 5095.5,
        "samples": 275,
        "solver_mode": "exact",
        "gini": 0.4878,
        "gini_gain": 0.0295,
        "left_samples": 254,
        "right_samples": 21,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "hours.per.week",
        "threshold": 52.5,
        "samples": 124,
        "solver_mode": "exact",
        "gini": 0.2706,
        "gini_gain": 0.0212,
        "left_samples": 111,
        "right_samples": 13,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 3852.5,
        "samples": 120,
        "solver_mode": "exact",
        "gini": 0.4599,
        "gini_gain": 0.0612,
        "left_samples": 109,
        "right_samples": 11,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "fnlwgt",
        "threshold": 269725.0625,
        "samples": 79,
        "solver_mode": "exact",
        "gini": 0.4326,
        "gini_gain": 0.0426,
        "left_samples": 69,
        "right_samples": 10,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "workclass",
        "threshold": 2.5,
        "samples": 75,
        "solver_mode": "exact",
        "gini": 0.4956,
        "gini_gain": 0.0418,
        "left_samples": 13,
        "right_samples": 62,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 4826.0,
        "samples": 52,
        "solver_mode": "exact",
        "gini": 0.4882,
        "gini_gain": 0.2453,
        "left_samples": 14,
        "right_samples": 38,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 4401.0,
        "samples": 47,
        "solver_mode": "exact",
        "gini": 0.498,
        "gini_gain": 0.3857,
        "left_samples": 25,
        "right_samples": 22,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      }
    ],
    "all_splits": [
      {
        "node_id": 0,
        "depth": 0,
        "feature_name": "relationship",
        "threshold": 0.5,
        "samples": 15000,
        "solver_mode": "mab",
        "gini": 0.3658,
        "gini_gain": 0.0565,
        "left_samples": 6052,
        "right_samples": 8948,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 2,
        "depth": 1,
        "feature_name": "relationship",
        "threshold": 4.5,
        "samples": 8948,
        "solver_mode": "mab",
        "gini": 0.1843,
        "gini_gain": 0.0235,
        "left_samples": 8249,
        "right_samples": 699,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 1,
        "depth": 1,
        "feature_name": "education.num",
        "threshold": 12.5,
        "samples": 6052,
        "solver_mode": "mab",
        "gini": 0.4941,
        "gini_gain": 0.063,
        "left_samples": 4244,
        "right_samples": 1808,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 5,
        "depth": 2,
        "feature_name": "capital.gain",
        "threshold": 4718.5,
        "samples": 8249,
        "solver_mode": "mab",
        "gini": 0.1322,
        "gini_gain": 0.0305,
        "left_samples": 8042,
        "right_samples": 207,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 3,
        "depth": 2,
        "feature_name": "capital.gain",
        "threshold": 4082.5,
        "samples": 4244,
        "solver_mode": "mab",
        "gini": 0.442,
        "gini_gain": 0.0453,
        "left_samples": 3962,
        "right_samples": 282,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 4,
        "depth": 2,
        "feature_name": "hours.per.week",
        "threshold": 38.5,
        "samples": 1808,
        "solver_mode": "mab",
        "gini": 0.4055,
        "gini_gain": 0.013,
        "left_samples": 199,
        "right_samples": 1609,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 6,
        "depth": 2,
        "feature_name": "education.num",
        "threshold": 12.5,
        "samples": 699,
        "solver_mode": "mab",
        "gini": 0.4987,
        "gini_gain": 0.0512,
        "left_samples": 500,
        "right_samples": 199,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 11,
        "depth": 3,
        "feature_name": "education.num",
        "threshold": 13.5,
        "samples": 8042,
        "solver_mode": "mab",
        "gini": 0.0974,
        "gini_gain": 0.005,
        "left_samples": 7631,
        "right_samples": 411,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 7,
        "depth": 3,
        "feature_name": "age",
        "threshold": 35.5,
        "samples": 3962,
        "solver_mode": "mab",
        "gini": 0.4114,
        "gini_gain": 0.0074,
        "left_samples": 1216,
        "right_samples": 2746,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 10,
        "depth": 3,
        "feature_name": "age",
        "threshold": 33.5,
        "samples": 1609,
        "solver_mode": "mab",
        "gini": 0.3792,
        "gini_gain": 0.0116,
        "left_samples": 275,
        "right_samples": 1334,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 13,
        "depth": 3,
        "feature_name": "capital.gain",
        "threshold": 5316.5,
        "samples": 500,
        "solver_mode": "mab",
        "gini": 0.4682,
        "gini_gain": 0.0326,
        "left_samples": 480,
        "right_samples": 20,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 8,
        "depth": 3,
        "feature_name": "capital.gain",
        "threshold": 5095.5,
        "samples": 282,
        "solver_mode": "exact",
        "gini": 0.1901,
        "gini_gain": 0.0724,
        "left_samples": 47,
        "right_samples": 235,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 12,
        "depth": 3,
        "feature_name": "capital.gain",
        "threshold": 7565.5,
        "samples": 207,
        "solver_mode": "exact",
        "gini": 0.268,
        "gini_gain": 0.1169,
        "left_samples": 52,
        "right_samples": 155,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 9,
        "depth": 3,
        "feature_name": "hours.per.week",
        "threshold": 30.5,
        "samples": 199,
        "solver_mode": "exact",
        "gini": 0.4997,
        "gini_gain": 0.0506,
        "left_samples": 120,
        "right_samples": 79,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 14,
        "depth": 3,
        "feature_name": "occupation",
        "threshold": 8.5,
        "samples": 199,
        "solver_mode": "exact",
        "gini": 0.3954,
        "gini_gain": 0.04,
        "left_samples": 75,
        "right_samples": 124,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "hours.per.week",
        "threshold": 46.5,
        "samples": 7631,
        "solver_mode": "mab",
        "gini": 0.0763,
        "gini_gain": 0.0025,
        "left_samples": 6575,
        "right_samples": 1056,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "education.num",
        "threshold": 9.5,
        "samples": 2746,
        "solver_mode": "mab",
        "gini": 0.4422,
        "gini_gain": 0.0171,
        "left_samples": 1776,
        "right_samples": 970,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 5095.5,
        "samples": 1334,
        "solver_mode": "mab",
        "gini": 0.3428,
        "gini_gain": 0.0193,
        "left_samples": 1104,
        "right_samples": 230,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "age",
        "threshold": 31.5,
        "samples": 1216,
        "solver_mode": "mab",
        "gini": 0.3178,
        "gini_gain": 0.0029,
        "left_samples": 750,
        "right_samples": 466,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "education.num",
        "threshold": 8.5,
        "samples": 480,
        "solver_mode": "exact",
        "gini": 0.4537,
        "gini_gain": 0.021,
        "left_samples": 66,
        "right_samples": 414,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "age",
        "threshold": 32.5,
        "samples": 411,
        "solver_mode": "exact",
        "gini": 0.392,
        "gini_gain": 0.0227,
        "left_samples": 105,
        "right_samples": 306,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 5095.5,
        "samples": 275,
        "solver_mode": "exact",
        "gini": 0.4878,
        "gini_gain": 0.0295,
        "left_samples": 254,
        "right_samples": 21,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "hours.per.week",
        "threshold": 52.5,
        "samples": 124,
        "solver_mode": "exact",
        "gini": 0.2706,
        "gini_gain": 0.0212,
        "left_samples": 111,
        "right_samples": 13,
        "left_pred": ">50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 3852.5,
        "samples": 120,
        "solver_mode": "exact",
        "gini": 0.4599,
        "gini_gain": 0.0612,
        "left_samples": 109,
        "right_samples": 11,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "fnlwgt",
        "threshold": 269725.0625,
        "samples": 79,
        "solver_mode": "exact",
        "gini": 0.4326,
        "gini_gain": 0.0426,
        "left_samples": 69,
        "right_samples": 10,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "workclass",
        "threshold": 2.5,
        "samples": 75,
        "solver_mode": "exact",
        "gini": 0.4956,
        "gini_gain": 0.0418,
        "left_samples": 13,
        "right_samples": 62,
        "left_pred": "<=50K",
        "right_pred": ">50K"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 4826.0,
        "samples": 52,
        "solver_mode": "exact",
        "gini": 0.4882,
        "gini_gain": 0.2453,
        "left_samples": 14,
        "right_samples": 38,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "capital.gain",
        "threshold": 4401.0,
        "samples": 47,
        "solver_mode": "exact",
        "gini": 0.498,
        "gini_gain": 0.3857,
        "left_samples": 25,
        "right_samples": 22,
        "left_pred": ">50K",
        "right_pred": "<=50K"
      }
    ],
    "tree_hierarchy": {
      "node_id": 0,
      "is_leaf": false,
      "depth": 0,
      "samples": 15000,
      "class_counts": [
        11385,
        3615
      ],
      "probabilities": [
        0.759,
        0.241
      ],
      "predicted_class": "<=50K",
      "predicted_class_idx": 0,
      "gini": 0.3658,
      "solver_mode": "mab",
      "feature_idx": 7,
      "feature_name": "relationship",
      "threshold": 0.5,
      "bin_idx": 0,
      "left": {
        "node_id": 1,
        "is_leaf": false,
        "depth": 1,
        "samples": 6052,
        "class_counts": [
          3356,
          2696
        ],
        "probabilities": [
          0.5545,
          0.4455
        ],
        "predicted_class": "<=50K",
        "predicted_class_idx": 0,
        "gini": 0.4941,
        "solver_mode": "mab",
        "feature_idx": 4,
        "feature_name": "education.num",
        "threshold": 12.5,
        "bin_idx": 11,
        "left": {
          "node_id": 3,
          "is_leaf": false,
          "depth": 2,
          "samples": 4244,
          "class_counts": [
            2845,
            1399
          ],
          "probabilities": [
            0.6704,
            0.3296
          ],
          "predicted_class": "<=50K",
          "predicted_class_idx": 0,
          "gini": 0.442,
          "solver_mode": "mab",
          "feature_idx": 10,
          "feature_name": "capital.gain",
          "threshold": 4082.5,
          "bin_idx": 62,
          "left": {
            "node_id": 7,
            "is_leaf": false,
            "depth": 3,
            "samples": 3962,
            "class_counts": [
              2815,
              1147
            ],
            "probabilities": [
              0.7105,
              0.2895
            ],
            "predicted_class": "<=50K",
            "predicted_class_idx": 0,
            "gini": 0.4114,
            "solver_mode": "mab",
            "feature_idx": 0,
            "feature_name": "age",
            "threshold": 35.5,
            "bin_idx": 18,
            "left": {
              "node_id": 15,
              "is_leaf": false,
              "depth": 4,
              "samples": 1216,
              "class_counts": [
                975,
                241
              ],
              "probabilities": [
                0.8018,
                0.1982
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.3178,
              "solver_mode": "mab",
              "feature_idx": 0,
              "feature_name": "age",
              "threshold": 31.5,
              "bin_idx": 14,
              "left": {
                "node_id": 31,
                "is_leaf": true,
                "depth": 5,
                "samples": 750,
                "class_counts": [
                  624,
                  126
                ],
                "probabilities": [
                  0.832,
                  0.168
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.2796,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 32,
                "is_leaf": true,
                "depth": 5,
                "samples": 466,
                "class_counts": [
                  351,
                  115
                ],
                "probabilities": [
                  0.7532,
                  0.2468
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.3718,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0029
            },
            "right": {
              "node_id": 16,
              "is_leaf": false,
              "depth": 4,
              "samples": 2746,
              "class_counts": [
                1840,
                906
              ],
              "probabilities": [
                0.6701,
                0.3299
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.4422,
              "solver_mode": "mab",
              "feature_idx": 4,
              "feature_name": "education.num",
              "threshold": 9.5,
              "bin_idx": 8,
              "left": {
                "node_id": 33,
                "is_leaf": true,
                "depth": 5,
                "samples": 1776,
                "class_counts": [
                  1311,
                  465
                ],
                "probabilities": [
                  0.7382,
                  0.2618
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.3865,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 34,
                "is_leaf": true,
                "depth": 5,
                "samples": 970,
                "class_counts": [
                  529,
                  441
                ],
                "probabilities": [
                  0.5454,
                  0.4546
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.4959,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0171
            },
            "gini_gain": 0.0074
          },
          "right": {
            "node_id": 8,
            "is_leaf": false,
            "depth": 3,
            "samples": 282,
            "class_counts": [
              30,
              252
            ],
            "probabilities": [
              0.1064,
              0.8936
            ],
            "predicted_class": ">50K",
            "predicted_class_idx": 1,
            "gini": 0.1901,
            "solver_mode": "exact",
            "feature_idx": 10,
            "feature_name": "capital.gain",
            "threshold": 5095.5,
            "bin_idx": 71,
            "left": {
              "node_id": 17,
              "is_leaf": false,
              "depth": 4,
              "samples": 47,
              "class_counts": [
                25,
                22
              ],
              "probabilities": [
                0.5319,
                0.4681
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.498,
              "solver_mode": "exact",
              "feature_idx": 10,
              "feature_name": "capital.gain",
              "threshold": 4401.0,
              "bin_idx": 64,
              "left": {
                "node_id": 35,
                "is_leaf": true,
                "depth": 5,
                "samples": 25,
                "class_counts": [
                  3,
                  22
                ],
                "probabilities": [
                  0.12,
                  0.88
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.2112,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 36,
                "is_leaf": true,
                "depth": 5,
                "samples": 22,
                "class_counts": [
                  22,
                  0
                ],
                "probabilities": [
                  1.0,
                  0.0
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.0,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.3857
            },
            "right": {
              "node_id": 18,
              "is_leaf": true,
              "depth": 4,
              "samples": 235,
              "class_counts": [
                5,
                230
              ],
              "probabilities": [
                0.0213,
                0.9787
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.0416,
              "solver_mode": "leaf"
            },
            "gini_gain": 0.0724
          },
          "gini_gain": 0.0453
        },
        "right": {
          "node_id": 4,
          "is_leaf": false,
          "depth": 2,
          "samples": 1808,
          "class_counts": [
            511,
            1297
          ],
          "probabilities": [
            0.2826,
            0.7174
          ],
          "predicted_class": ">50K",
          "predicted_class_idx": 1,
          "gini": 0.4055,
          "solver_mode": "mab",
          "feature_idx": 12,
          "feature_name": "hours.per.week",
          "threshold": 38.5,
          "bin_idx": 37,
          "left": {
            "node_id": 9,
            "is_leaf": false,
            "depth": 3,
            "samples": 199,
            "class_counts": [
              102,
              97
            ],
            "probabilities": [
              0.5126,
              0.4874
            ],
            "predicted_class": "<=50K",
            "predicted_class_idx": 0,
            "gini": 0.4997,
            "solver_mode": "exact",
            "feature_idx": 12,
            "feature_name": "hours.per.week",
            "threshold": 30.5,
            "bin_idx": 29,
            "left": {
              "node_id": 19,
              "is_leaf": false,
              "depth": 4,
              "samples": 120,
              "class_counts": [
                77,
                43
              ],
              "probabilities": [
                0.6417,
                0.3583
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.4599,
              "solver_mode": "exact",
              "feature_idx": 10,
              "feature_name": "capital.gain",
              "threshold": 3852.5,
              "bin_idx": 58,
              "left": {
                "node_id": 39,
                "is_leaf": true,
                "depth": 5,
                "samples": 109,
                "class_counts": [
                  76,
                  33
                ],
                "probabilities": [
                  0.6972,
                  0.3028
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.4222,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 40,
                "is_leaf": true,
                "depth": 5,
                "samples": 11,
                "class_counts": [
                  1,
                  10
                ],
                "probabilities": [
                  0.0909,
                  0.9091
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.1653,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0612
            },
            "right": {
              "node_id": 20,
              "is_leaf": false,
              "depth": 4,
              "samples": 79,
              "class_counts": [
                25,
                54
              ],
              "probabilities": [
                0.3165,
                0.6835
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.4326,
              "solver_mode": "exact",
              "feature_idx": 2,
              "feature_name": "fnlwgt",
              "threshold": 269725.0625,
              "bin_idx": 208,
              "left": {
                "node_id": 41,
                "is_leaf": true,
                "depth": 5,
                "samples": 69,
                "class_counts": [
                  18,
                  51
                ],
                "probabilities": [
                  0.2609,
                  0.7391
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.3856,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 42,
                "is_leaf": true,
                "depth": 5,
                "samples": 10,
                "class_counts": [
                  7,
                  3
                ],
                "probabilities": [
                  0.7,
                  0.3
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.42,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0426
            },
            "gini_gain": 0.0506
          },
          "right": {
            "node_id": 10,
            "is_leaf": false,
            "depth": 3,
            "samples": 1609,
            "class_counts": [
              409,
              1200
            ],
            "probabilities": [
              0.2542,
              0.7458
            ],
            "predicted_class": ">50K",
            "predicted_class_idx": 1,
            "gini": 0.3792,
            "solver_mode": "mab",
            "feature_idx": 0,
            "feature_name": "age",
            "threshold": 33.5,
            "bin_idx": 16,
            "left": {
              "node_id": 21,
              "is_leaf": false,
              "depth": 4,
              "samples": 275,
              "class_counts": [
                116,
                159
              ],
              "probabilities": [
                0.4218,
                0.5782
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.4878,
              "solver_mode": "exact",
              "feature_idx": 10,
              "feature_name": "capital.gain",
              "threshold": 5095.5,
              "bin_idx": 71,
              "left": {
                "node_id": 43,
                "is_leaf": true,
                "depth": 5,
                "samples": 254,
                "class_counts": [
                  116,
                  138
                ],
                "probabilities": [
                  0.4567,
                  0.5433
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.4962,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 44,
                "is_leaf": true,
                "depth": 5,
                "samples": 21,
                "class_counts": [
                  0,
                  21
                ],
                "probabilities": [
                  0.0,
                  1.0
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.0,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0295
            },
            "right": {
              "node_id": 22,
              "is_leaf": false,
              "depth": 4,
              "samples": 1334,
              "class_counts": [
                293,
                1041
              ],
              "probabilities": [
                0.2196,
                0.7804
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.3428,
              "solver_mode": "mab",
              "feature_idx": 10,
              "feature_name": "capital.gain",
              "threshold": 5095.5,
              "bin_idx": 71,
              "left": {
                "node_id": 45,
                "is_leaf": true,
                "depth": 5,
                "samples": 1104,
                "class_counts": [
                  292,
                  812
                ],
                "probabilities": [
                  0.2645,
                  0.7355
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.3891,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 46,
                "is_leaf": true,
                "depth": 5,
                "samples": 230,
                "class_counts": [
                  1,
                  229
                ],
                "probabilities": [
                  0.0043,
                  0.9957
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.0087,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0193
            },
            "gini_gain": 0.0116
          },
          "gini_gain": 0.013
        },
        "gini_gain": 0.063
      },
      "right": {
        "node_id": 2,
        "is_leaf": false,
        "depth": 1,
        "samples": 8948,
        "class_counts": [
          8029,
          919
        ],
        "probabilities": [
          0.8973,
          0.1027
        ],
        "predicted_class": "<=50K",
        "predicted_class_idx": 0,
        "gini": 0.1843,
        "solver_mode": "mab",
        "feature_idx": 7,
        "feature_name": "relationship",
        "threshold": 4.5,
        "bin_idx": 4,
        "left": {
          "node_id": 5,
          "is_leaf": false,
          "depth": 2,
          "samples": 8249,
          "class_counts": [
            7662,
            587
          ],
          "probabilities": [
            0.9288,
            0.0712
          ],
          "predicted_class": "<=50K",
          "predicted_class_idx": 0,
          "gini": 0.1322,
          "solver_mode": "mab",
          "feature_idx": 10,
          "feature_name": "capital.gain",
          "threshold": 4718.5,
          "bin_idx": 67,
          "left": {
            "node_id": 11,
            "is_leaf": false,
            "depth": 3,
            "samples": 8042,
            "class_counts": [
              7629,
              413
            ],
            "probabilities": [
              0.9486,
              0.0514
            ],
            "predicted_class": "<=50K",
            "predicted_class_idx": 0,
            "gini": 0.0974,
            "solver_mode": "mab",
            "feature_idx": 4,
            "feature_name": "education.num",
            "threshold": 13.5,
            "bin_idx": 12,
            "left": {
              "node_id": 23,
              "is_leaf": false,
              "depth": 4,
              "samples": 7631,
              "class_counts": [
                7328,
                303
              ],
              "probabilities": [
                0.9603,
                0.0397
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.0763,
              "solver_mode": "mab",
              "feature_idx": 12,
              "feature_name": "hours.per.week",
              "threshold": 46.5,
              "bin_idx": 45,
              "left": {
                "node_id": 47,
                "is_leaf": true,
                "depth": 5,
                "samples": 6575,
                "class_counts": [
                  6406,
                  169
                ],
                "probabilities": [
                  0.9743,
                  0.0257
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.0501,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 48,
                "is_leaf": true,
                "depth": 5,
                "samples": 1056,
                "class_counts": [
                  922,
                  134
                ],
                "probabilities": [
                  0.8731,
                  0.1269
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.2216,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0025
            },
            "right": {
              "node_id": 24,
              "is_leaf": false,
              "depth": 4,
              "samples": 411,
              "class_counts": [
                301,
                110
              ],
              "probabilities": [
                0.7324,
                0.2676
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.392,
              "solver_mode": "exact",
              "feature_idx": 0,
              "feature_name": "age",
              "threshold": 32.5,
              "bin_idx": 15,
              "left": {
                "node_id": 49,
                "is_leaf": true,
                "depth": 5,
                "samples": 105,
                "class_counts": [
                  96,
                  9
                ],
                "probabilities": [
                  0.9143,
                  0.0857
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.1567,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 50,
                "is_leaf": true,
                "depth": 5,
                "samples": 306,
                "class_counts": [
                  205,
                  101
                ],
                "probabilities": [
                  0.6699,
                  0.3301
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.4422,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0227
            },
            "gini_gain": 0.005
          },
          "right": {
            "node_id": 12,
            "is_leaf": false,
            "depth": 3,
            "samples": 207,
            "class_counts": [
              33,
              174
            ],
            "probabilities": [
              0.1594,
              0.8406
            ],
            "predicted_class": ">50K",
            "predicted_class_idx": 1,
            "gini": 0.268,
            "solver_mode": "exact",
            "feature_idx": 10,
            "feature_name": "capital.gain",
            "threshold": 7565.5,
            "bin_idx": 85,
            "left": {
              "node_id": 25,
              "is_leaf": false,
              "depth": 4,
              "samples": 52,
              "class_counts": [
                30,
                22
              ],
              "probabilities": [
                0.5769,
                0.4231
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.4882,
              "solver_mode": "exact",
              "feature_idx": 10,
              "feature_name": "capital.gain",
              "threshold": 4826.0,
              "bin_idx": 68,
              "left": {
                "node_id": 51,
                "is_leaf": true,
                "depth": 5,
                "samples": 14,
                "class_counts": [
                  0,
                  14
                ],
                "probabilities": [
                  0.0,
                  1.0
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.0,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 52,
                "is_leaf": true,
                "depth": 5,
                "samples": 38,
                "class_counts": [
                  30,
                  8
                ],
                "probabilities": [
                  0.7895,
                  0.2105
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.3324,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.2453
            },
            "right": {
              "node_id": 26,
              "is_leaf": true,
              "depth": 4,
              "samples": 155,
              "class_counts": [
                3,
                152
              ],
              "probabilities": [
                0.0194,
                0.9806
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.038,
              "solver_mode": "leaf"
            },
            "gini_gain": 0.1169
          },
          "gini_gain": 0.0305
        },
        "right": {
          "node_id": 6,
          "is_leaf": false,
          "depth": 2,
          "samples": 699,
          "class_counts": [
            367,
            332
          ],
          "probabilities": [
            0.525,
            0.475
          ],
          "predicted_class": "<=50K",
          "predicted_class_idx": 0,
          "gini": 0.4987,
          "solver_mode": "mab",
          "feature_idx": 4,
          "feature_name": "education.num",
          "threshold": 12.5,
          "bin_idx": 11,
          "left": {
            "node_id": 13,
            "is_leaf": false,
            "depth": 3,
            "samples": 500,
            "class_counts": [
              313,
              187
            ],
            "probabilities": [
              0.626,
              0.374
            ],
            "predicted_class": "<=50K",
            "predicted_class_idx": 0,
            "gini": 0.4682,
            "solver_mode": "mab",
            "feature_idx": 10,
            "feature_name": "capital.gain",
            "threshold": 5316.5,
            "bin_idx": 72,
            "left": {
              "node_id": 27,
              "is_leaf": false,
              "depth": 4,
              "samples": 480,
              "class_counts": [
                313,
                167
              ],
              "probabilities": [
                0.6521,
                0.3479
              ],
              "predicted_class": "<=50K",
              "predicted_class_idx": 0,
              "gini": 0.4537,
              "solver_mode": "exact",
              "feature_idx": 4,
              "feature_name": "education.num",
              "threshold": 8.5,
              "bin_idx": 7,
              "left": {
                "node_id": 55,
                "is_leaf": true,
                "depth": 5,
                "samples": 66,
                "class_counts": [
                  60,
                  6
                ],
                "probabilities": [
                  0.9091,
                  0.0909
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.1653,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 56,
                "is_leaf": true,
                "depth": 5,
                "samples": 414,
                "class_counts": [
                  253,
                  161
                ],
                "probabilities": [
                  0.6111,
                  0.3889
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.4753,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.021
            },
            "right": {
              "node_id": 28,
              "is_leaf": true,
              "depth": 4,
              "samples": 20,
              "class_counts": [
                0,
                20
              ],
              "probabilities": [
                0.0,
                1.0
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.0,
              "solver_mode": "leaf"
            },
            "gini_gain": 0.0326
          },
          "right": {
            "node_id": 14,
            "is_leaf": false,
            "depth": 3,
            "samples": 199,
            "class_counts": [
              54,
              145
            ],
            "probabilities": [
              0.2714,
              0.7286
            ],
            "predicted_class": ">50K",
            "predicted_class_idx": 1,
            "gini": 0.3954,
            "solver_mode": "exact",
            "feature_idx": 6,
            "feature_name": "occupation",
            "threshold": 8.5,
            "bin_idx": 8,
            "left": {
              "node_id": 29,
              "is_leaf": false,
              "depth": 4,
              "samples": 75,
              "class_counts": [
                34,
                41
              ],
              "probabilities": [
                0.4533,
                0.5467
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.4956,
              "solver_mode": "exact",
              "feature_idx": 1,
              "feature_name": "workclass",
              "threshold": 2.5,
              "bin_idx": 2,
              "left": {
                "node_id": 59,
                "is_leaf": true,
                "depth": 5,
                "samples": 13,
                "class_counts": [
                  10,
                  3
                ],
                "probabilities": [
                  0.7692,
                  0.2308
                ],
                "predicted_class": "<=50K",
                "predicted_class_idx": 0,
                "gini": 0.355,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 60,
                "is_leaf": true,
                "depth": 5,
                "samples": 62,
                "class_counts": [
                  24,
                  38
                ],
                "probabilities": [
                  0.3871,
                  0.6129
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.4745,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0418
            },
            "right": {
              "node_id": 30,
              "is_leaf": false,
              "depth": 4,
              "samples": 124,
              "class_counts": [
                20,
                104
              ],
              "probabilities": [
                0.1613,
                0.8387
              ],
              "predicted_class": ">50K",
              "predicted_class_idx": 1,
              "gini": 0.2706,
              "solver_mode": "exact",
              "feature_idx": 12,
              "feature_name": "hours.per.week",
              "threshold": 52.5,
              "bin_idx": 51,
              "left": {
                "node_id": 61,
                "is_leaf": true,
                "depth": 5,
                "samples": 111,
                "class_counts": [
                  14,
                  97
                ],
                "probabilities": [
                  0.1261,
                  0.8739
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.2204,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 62,
                "is_leaf": true,
                "depth": 5,
                "samples": 13,
                "class_counts": [
                  6,
                  7
                ],
                "probabilities": [
                  0.4615,
                  0.5385
                ],
                "predicted_class": ">50K",
                "predicted_class_idx": 1,
                "gini": 0.497,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0212
            },
            "gini_gain": 0.04
          },
          "gini_gain": 0.0512
        },
        "gini_gain": 0.0235
      },
      "gini_gain": 0.0565
    },
    "feature_contributions": [
      {
        "rank": 1,
        "feature_idx": 10,
        "feature_name": "capital.gain",
        "mab_importance_pct": 35.71,
        "rf_importance_pct": 20.45,
        "mutual_info_pct": 11.28,
        "mutual_info_raw": 0.0749,
        "split_count": 10,
        "stats": {
          "feature_idx": 10,
          "feature_name": "capital.gain",
          "min": 0.0,
          "max": 99999.0,
          "mean": 1094.7919921875,
          "std": 7458.58056640625,
          "unique_values": 35
        },
        "composite_score": 24.26,
        "cumulative_pct": 24.26
      },
      {
        "rank": 2,
        "feature_idx": 4,
        "feature_name": "education.num",
        "mab_importance_pct": 17.86,
        "rf_importance_pct": 17.02,
        "mutual_info_pct": 9.46,
        "mutual_info_raw": 0.0628,
        "split_count": 5,
        "stats": {
          "feature_idx": 4,
          "feature_name": "education.num",
          "min": 1.0,
          "max": 16.0,
          "mean": 10.064800262451172,
          "std": 2.5673000812530518,
          "unique_values": 15
        },
        "composite_score": 15.47,
        "cumulative_pct": 39.72
      },
      {
        "rank": 3,
        "feature_idx": 7,
        "feature_name": "relationship",
        "mab_importance_pct": 7.14,
        "rf_importance_pct": 18.32,
        "mutual_info_pct": 15.6,
        "mutual_info_raw": 0.1036,
        "split_count": 2,
        "stats": {
          "feature_idx": 7,
          "feature_name": "relationship",
          "min": 0.0,
          "max": 5.0,
          "mean": 1.4472999572753906,
          "std": 1.6032999753952026,
          "unique_values": 6
        },
        "composite_score": 13.17,
        "cumulative_pct": 52.89
      },
      {
        "rank": 4,
        "feature_idx": 0,
        "feature_name": "age",
        "mab_importance_pct": 14.29,
        "rf_importance_pct": 11.65,
        "mutual_info_pct": 10.39,
        "mutual_info_raw": 0.069,
        "split_count": 4,
        "stats": {
          "feature_idx": 0,
          "feature_name": "age",
          "min": 17.0,
          "max": 90.0,
          "mean": 38.59239959716797,
          "std": 13.668399810791016,
          "unique_values": 64
        },
        "composite_score": 12.39,
        "cumulative_pct": 65.28
      },
      {
        "rank": 5,
        "feature_idx": 12,
        "feature_name": "hours.per.week",
        "mab_importance_pct": 14.29,
        "rf_importance_pct": 5.17,
        "mutual_info_pct": 5.77,
        "mutual_info_raw": 0.0383,
        "split_count": 4,
        "stats": {
          "feature_idx": 12,
          "feature_name": "hours.per.week",
          "min": 1.0,
          "max": 99.0,
          "mean": 40.3473014831543,
          "std": 12.255000114440918,
          "unique_values": 56
        },
        "composite_score": 8.97,
        "cumulative_pct": 74.25
      },
      {
        "rank": 6,
        "feature_idx": 5,
        "feature_name": "marital.status",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 8.69,
        "mutual_info_pct": 13.54,
        "mutual_info_raw": 0.0899,
        "split_count": 0,
        "stats": {
          "feature_idx": 5,
          "feature_name": "marital.status",
          "min": 0.0,
          "max": 6.0,
          "mean": 2.628200054168701,
          "std": 1.5049999952316284,
          "unique_values": 7
        },
        "composite_score": 6.43,
        "cumulative_pct": 80.67
      },
      {
        "rank": 7,
        "feature_idx": 6,
        "feature_name": "occupation",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 3.84,
        "mutual_info_pct": 11.51,
        "mutual_info_raw": 0.0764,
        "split_count": 1,
        "stats": {
          "feature_idx": 6,
          "feature_name": "occupation",
          "min": 0.0,
          "max": 14.0,
          "mean": 6.564199924468994,
          "std": 4.225599765777588,
          "unique_values": 14
        },
        "composite_score": 5.65,
        "cumulative_pct": 86.32
      },
      {
        "rank": 8,
        "feature_idx": 3,
        "feature_name": "education",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.92,
        "mutual_info_pct": 8.48,
        "mutual_info_raw": 0.0563,
        "split_count": 0,
        "stats": {
          "feature_idx": 3,
          "feature_name": "education",
          "min": 0.0,
          "max": 15.0,
          "mean": 10.323100090026855,
          "std": 3.8757998943328857,
          "unique_values": 15
        },
        "composite_score": 3.14,
        "cumulative_pct": 89.46
      },
      {
        "rank": 9,
        "feature_idx": 2,
        "feature_name": "fnlwgt",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 3.01,
        "mutual_info_pct": 1.32,
        "mutual_info_raw": 0.0088,
        "split_count": 1,
        "stats": {
          "feature_idx": 2,
          "feature_name": "fnlwgt",
          "min": 19214.0,
          "max": 1484705.0,
          "mean": 190287.25,
          "std": 105597.6171875,
          "unique_values": 982
        },
        "composite_score": 2.81,
        "cumulative_pct": 92.27
      },
      {
        "rank": 10,
        "feature_idx": 1,
        "feature_name": "workclass",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 1.5,
        "mutual_info_pct": 3.1,
        "mutual_info_raw": 0.0206,
        "split_count": 1,
        "stats": {
          "feature_idx": 1,
          "feature_name": "workclass",
          "min": 0.0,
          "max": 8.0,
          "mean": 3.8596999645233154,
          "std": 1.454800009727478,
          "unique_values": 7
        },
        "composite_score": 2.73,
        "cumulative_pct": 95.0
      },
      {
        "rank": 11,
        "feature_idx": 11,
        "feature_name": "capital.loss",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 3.95,
        "mutual_info_pct": 3.35,
        "mutual_info_raw": 0.0223,
        "split_count": 0,
        "stats": {
          "feature_idx": 11,
          "feature_name": "capital.loss",
          "min": 0.0,
          "max": 4356.0,
          "mean": 86.44509887695312,
          "std": 400.1235046386719,
          "unique_values": 20
        },
        "composite_score": 2.22,
        "cumulative_pct": 97.22
      },
      {
        "rank": 12,
        "feature_idx": 9,
        "feature_name": "sex",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.18,
        "mutual_info_pct": 5.09,
        "mutual_info_raw": 0.0338,
        "split_count": 0,
        "stats": {
          "feature_idx": 9,
          "feature_name": "sex",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.6687999963760376,
          "std": 0.4706000089645386,
          "unique_values": 2
        },
        "composite_score": 2.04,
        "cumulative_pct": 99.26
      },
      {
        "rank": 13,
        "feature_idx": 8,
        "feature_name": "race",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.45,
        "mutual_info_pct": 1.03,
        "mutual_info_raw": 0.0068,
        "split_count": 0,
        "stats": {
          "feature_idx": 8,
          "feature_name": "race",
          "min": 0.0,
          "max": 4.0,
          "mean": 3.6693999767303467,
          "std": 0.8435999751091003,
          "unique_values": 5
        },
        "composite_score": 0.42,
        "cumulative_pct": 99.68
      },
      {
        "rank": 14,
        "feature_idx": 13,
        "feature_name": "native.country",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.86,
        "mutual_info_pct": 0.06,
        "mutual_info_raw": 0.0004,
        "split_count": 0,
        "stats": {
          "feature_idx": 13,
          "feature_name": "native.country",
          "min": 0.0,
          "max": 41.0,
          "mean": 36.71440124511719,
          "std": 7.807499885559082,
          "unique_values": 29
        },
        "composite_score": 0.32,
        "cumulative_pct": 100.0
      }
    ]
  },
  "covertype": {
    "dataset_name": "Forest Covertype",
    "n_samples": 20000,
    "n_features": 54,
    "n_classes": 7,
    "class_names": [
      "Spruce/Fir",
      "Lodgepole Pine",
      "Ponderosa Pine",
      "Cottonwood/Willow",
      "Aspen",
      "Douglas-fir",
      "Krummholz"
    ],
    "feature_names": [
      "Elevation",
      "Aspect",
      "Slope",
      "Horizontal_Distance_To_Hydrology",
      "Vertical_Distance_To_Hydrology",
      "Horizontal_Distance_To_Roadways",
      "Hillshade_9am",
      "Hillshade_Noon",
      "Hillshade_3pm",
      "Horizontal_Distance_To_Fire_Points",
      "Wilderness_Area_1",
      "Wilderness_Area_2",
      "Wilderness_Area_3",
      "Wilderness_Area_4",
      "Soil_Type_1",
      "Soil_Type_2",
      "Soil_Type_3",
      "Soil_Type_4",
      "Soil_Type_5",
      "Soil_Type_6",
      "Soil_Type_7",
      "Soil_Type_8",
      "Soil_Type_9",
      "Soil_Type_10",
      "Soil_Type_11",
      "Soil_Type_12",
      "Soil_Type_13",
      "Soil_Type_14",
      "Soil_Type_15",
      "Soil_Type_16",
      "Soil_Type_17",
      "Soil_Type_18",
      "Soil_Type_19",
      "Soil_Type_20",
      "Soil_Type_21",
      "Soil_Type_22",
      "Soil_Type_23",
      "Soil_Type_24",
      "Soil_Type_25",
      "Soil_Type_26",
      "Soil_Type_27",
      "Soil_Type_28",
      "Soil_Type_29",
      "Soil_Type_30",
      "Soil_Type_31",
      "Soil_Type_32",
      "Soil_Type_33",
      "Soil_Type_34",
      "Soil_Type_35",
      "Soil_Type_36",
      "Soil_Type_37",
      "Soil_Type_38",
      "Soil_Type_39",
      "Soil_Type_40"
    ],
    "performance": {
      "mab_fit_time_sec": 0.0726,
      "std_dt_fit_time_sec": 0.0461,
      "speedup_ratio": 0.63,
      "total_nodes": 57,
      "tree_depth": 5,
      "splits_by_mode": {
        "exact": 7,
        "mab": 23
      },
      "samples_evaluated": 99456,
      "theoretical_full_scan_samples": 560000,
      "sample_evaluation_reduction_pct": 82.2
    },
    "top_features": {
      "top_3": [
        "Elevation",
        "Horizontal_Distance_To_Fire_Points",
        "Horizontal_Distance_To_Roadways"
      ],
      "top_5": [
        "Elevation",
        "Horizontal_Distance_To_Fire_Points",
        "Horizontal_Distance_To_Roadways",
        "Hillshade_9am",
        "Wilderness_Area_1"
      ],
      "top_5_cumulative_pct": 60.19
    },
    "root_split": {
      "node_id": 0,
      "depth": 0,
      "feature_name": "Horizontal_Distance_To_Fire_Points",
      "threshold": 2573.1992,
      "samples": 20000,
      "solver_mode": "mab",
      "gini": 0.6615,
      "gini_gain": 0.1199,
      "left_samples": 8516,
      "right_samples": 11484,
      "left_pred": "Spruce/Fir",
      "right_pred": "Lodgepole Pine"
    },
    "final_splits_count": 13,
    "final_splits": [
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 196.5,
        "samples": 8860,
        "solver_mode": "mab",
        "gini": 0.1814,
        "gini_gain": 0.002,
        "left_samples": 1001,
        "right_samples": 7859,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 205.5,
        "samples": 1870,
        "solver_mode": "mab",
        "gini": 0.5994,
        "gini_gain": 0.0971,
        "left_samples": 764,
        "right_samples": 1106,
        "left_pred": "Ponderosa Pine",
        "right_pred": "Cottonwood/Willow"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "Elevation",
        "threshold": 2988.0,
        "samples": 1730,
        "solver_mode": "mab",
        "gini": 0.432,
        "gini_gain": 0.0352,
        "left_samples": 239,
        "right_samples": 1491,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "Aspect",
        "threshold": 51.0,
        "samples": 1351,
        "solver_mode": "mab",
        "gini": 0.5173,
        "gini_gain": 0.0139,
        "left_samples": 225,
        "right_samples": 1126,
        "left_pred": "Aspen",
        "right_pred": "Aspen"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "Soil_Type_4",
        "threshold": 0.5,
        "samples": 1298,
        "solver_mode": "mab",
        "gini": 0.6392,
        "gini_gain": 0.0614,
        "left_samples": 1078,
        "right_samples": 220,
        "left_pred": "Douglas-fir",
        "right_pred": "Ponderosa Pine"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "Slope",
        "threshold": 14.5,
        "samples": 1135,
        "solver_mode": "mab",
        "gini": 0.496,
        "gini_gain": 0.021,
        "left_samples": 777,
        "right_samples": 358,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "Horizontal_Distance_To_Roadways",
        "threshold": 5159.0,
        "samples": 880,
        "solver_mode": "mab",
        "gini": 0.3696,
        "gini_gain": 0.0503,
        "left_samples": 486,
        "right_samples": 394,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "Hillshade_3pm",
        "threshold": 182.5,
        "samples": 650,
        "solver_mode": "mab",
        "gini": 0.2707,
        "gini_gain": 0.017,
        "left_samples": 569,
        "right_samples": 81,
        "left_pred": "Krummholz",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "Elevation",
        "threshold": 2671.0,
        "samples": 554,
        "solver_mode": "mab",
        "gini": 0.4295,
        "gini_gain": 0.0623,
        "left_samples": 170,
        "right_samples": 384,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 235.5,
        "samples": 554,
        "solver_mode": "mab",
        "gini": 0.4755,
        "gini_gain": 0.1221,
        "left_samples": 462,
        "right_samples": 92,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "Soil_Type_39",
        "threshold": 0.5,
        "samples": 287,
        "solver_mode": "exact",
        "gini": 0.5738,
        "gini_gain": 0.0692,
        "left_samples": 216,
        "right_samples": 71,
        "left_pred": "Spruce/Fir",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "Horizontal_Distance_To_Hydrology",
        "threshold": 134.0,
        "samples": 225,
        "solver_mode": "exact",
        "gini": 0.5457,
        "gini_gain": 0.0709,
        "left_samples": 82,
        "right_samples": 143,
        "left_pred": "Krummholz",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "Hillshade_Noon",
        "threshold": 222.5,
        "samples": 195,
        "solver_mode": "exact",
        "gini": 0.7333,
        "gini_gain": 0.1135,
        "left_samples": 84,
        "right_samples": 111,
        "left_pred": "Douglas-fir",
        "right_pred": "Aspen"
      }
    ],
    "all_splits": [
      {
        "node_id": 0,
        "depth": 0,
        "feature_name": "Horizontal_Distance_To_Fire_Points",
        "threshold": 2573.1992,
        "samples": 20000,
        "solver_mode": "mab",
        "gini": 0.6615,
        "gini_gain": 0.1199,
        "left_samples": 8516,
        "right_samples": 11484,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 2,
        "depth": 1,
        "feature_name": "Elevation",
        "threshold": 3100.0,
        "samples": 11484,
        "solver_mode": "mab",
        "gini": 0.3184,
        "gini_gain": 0.0423,
        "left_samples": 10848,
        "right_samples": 636,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 1,
        "depth": 1,
        "feature_name": "Elevation",
        "threshold": 2932.0,
        "samples": 8516,
        "solver_mode": "mab",
        "gini": 0.8425,
        "gini_gain": 0.1282,
        "left_samples": 4714,
        "right_samples": 3802,
        "left_pred": "Ponderosa Pine",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 5,
        "depth": 2,
        "feature_name": "Vertical_Distance_To_Hydrology",
        "threshold": 65.0,
        "samples": 10848,
        "solver_mode": "mab",
        "gini": 0.2584,
        "gini_gain": 0.0189,
        "left_samples": 9414,
        "right_samples": 1434,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 3,
        "depth": 2,
        "feature_name": "Elevation",
        "threshold": 2668.0,
        "samples": 4714,
        "solver_mode": "mab",
        "gini": 0.7916,
        "gini_gain": 0.1389,
        "left_samples": 3168,
        "right_samples": 1546,
        "left_pred": "Cottonwood/Willow",
        "right_pred": "Aspen"
      },
      {
        "node_id": 4,
        "depth": 2,
        "feature_name": "Elevation",
        "threshold": 3239.0,
        "samples": 3802,
        "solver_mode": "mab",
        "gini": 0.6184,
        "gini_gain": 0.1419,
        "left_samples": 2865,
        "right_samples": 937,
        "left_pred": "Spruce/Fir",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 6,
        "depth": 2,
        "feature_name": "Elevation",
        "threshold": 3280.3047,
        "samples": 636,
        "solver_mode": "mab",
        "gini": 0.5778,
        "gini_gain": 0.1775,
        "left_samples": 298,
        "right_samples": 338,
        "left_pred": "Spruce/Fir",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 11,
        "depth": 3,
        "feature_name": "Horizontal_Distance_To_Fire_Points",
        "threshold": 6580.0,
        "samples": 9414,
        "solver_mode": "mab",
        "gini": 0.2015,
        "gini_gain": 0.0055,
        "left_samples": 8860,
        "right_samples": 554,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 7,
        "depth": 3,
        "feature_name": "Elevation",
        "threshold": 2370.0,
        "samples": 3168,
        "solver_mode": "mab",
        "gini": 0.6959,
        "gini_gain": 0.0802,
        "left_samples": 1870,
        "right_samples": 1298,
        "left_pred": "Cottonwood/Willow",
        "right_pred": "Douglas-fir"
      },
      {
        "node_id": 9,
        "depth": 3,
        "feature_name": "Horizontal_Distance_To_Roadways",
        "threshold": 5398.0,
        "samples": 2865,
        "solver_mode": "mab",
        "gini": 0.5015,
        "gini_gain": 0.0441,
        "left_samples": 1730,
        "right_samples": 1135,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 8,
        "depth": 3,
        "feature_name": "Hillshade_9am",
        "threshold": 185.5,
        "samples": 1546,
        "solver_mode": "mab",
        "gini": 0.5641,
        "gini_gain": 0.0196,
        "left_samples": 195,
        "right_samples": 1351,
        "left_pred": "Aspen",
        "right_pred": "Aspen"
      },
      {
        "node_id": 12,
        "depth": 3,
        "feature_name": "Horizontal_Distance_To_Fire_Points",
        "threshold": 5541.4609,
        "samples": 1434,
        "solver_mode": "mab",
        "gini": 0.4892,
        "gini_gain": 0.0787,
        "left_samples": 880,
        "right_samples": 554,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 10,
        "depth": 3,
        "feature_name": "Elevation",
        "threshold": 3308.0,
        "samples": 937,
        "solver_mode": "mab",
        "gini": 0.4002,
        "gini_gain": 0.0367,
        "left_samples": 287,
        "right_samples": 650,
        "left_pred": "Krummholz",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 14,
        "depth": 3,
        "feature_name": "Wilderness_Area_2",
        "threshold": 0.5,
        "samples": 338,
        "solver_mode": "exact",
        "gini": 0.1935,
        "gini_gain": 0.0605,
        "left_samples": 315,
        "right_samples": 23,
        "left_pred": "Krummholz",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 13,
        "depth": 3,
        "feature_name": "Horizontal_Distance_To_Roadways",
        "threshold": 5245.0,
        "samples": 298,
        "solver_mode": "exact",
        "gini": 0.6349,
        "gini_gain": 0.2229,
        "left_samples": 225,
        "right_samples": 73,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 196.5,
        "samples": 8860,
        "solver_mode": "mab",
        "gini": 0.1814,
        "gini_gain": 0.002,
        "left_samples": 1001,
        "right_samples": 7859,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 205.5,
        "samples": 1870,
        "solver_mode": "mab",
        "gini": 0.5994,
        "gini_gain": 0.0971,
        "left_samples": 764,
        "right_samples": 1106,
        "left_pred": "Ponderosa Pine",
        "right_pred": "Cottonwood/Willow"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "Elevation",
        "threshold": 2988.0,
        "samples": 1730,
        "solver_mode": "mab",
        "gini": 0.432,
        "gini_gain": 0.0352,
        "left_samples": 239,
        "right_samples": 1491,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "Aspect",
        "threshold": 51.0,
        "samples": 1351,
        "solver_mode": "mab",
        "gini": 0.5173,
        "gini_gain": 0.0139,
        "left_samples": 225,
        "right_samples": 1126,
        "left_pred": "Aspen",
        "right_pred": "Aspen"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "Soil_Type_4",
        "threshold": 0.5,
        "samples": 1298,
        "solver_mode": "mab",
        "gini": 0.6392,
        "gini_gain": 0.0614,
        "left_samples": 1078,
        "right_samples": 220,
        "left_pred": "Douglas-fir",
        "right_pred": "Ponderosa Pine"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "Slope",
        "threshold": 14.5,
        "samples": 1135,
        "solver_mode": "mab",
        "gini": 0.496,
        "gini_gain": 0.021,
        "left_samples": 777,
        "right_samples": 358,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "Horizontal_Distance_To_Roadways",
        "threshold": 5159.0,
        "samples": 880,
        "solver_mode": "mab",
        "gini": 0.3696,
        "gini_gain": 0.0503,
        "left_samples": 486,
        "right_samples": 394,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "Hillshade_3pm",
        "threshold": 182.5,
        "samples": 650,
        "solver_mode": "mab",
        "gini": 0.2707,
        "gini_gain": 0.017,
        "left_samples": 569,
        "right_samples": 81,
        "left_pred": "Krummholz",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "Elevation",
        "threshold": 2671.0,
        "samples": 554,
        "solver_mode": "mab",
        "gini": 0.4295,
        "gini_gain": 0.0623,
        "left_samples": 170,
        "right_samples": 384,
        "left_pred": "Lodgepole Pine",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "Hillshade_9am",
        "threshold": 235.5,
        "samples": 554,
        "solver_mode": "mab",
        "gini": 0.4755,
        "gini_gain": 0.1221,
        "left_samples": 462,
        "right_samples": 92,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "Soil_Type_39",
        "threshold": 0.5,
        "samples": 287,
        "solver_mode": "exact",
        "gini": 0.5738,
        "gini_gain": 0.0692,
        "left_samples": 216,
        "right_samples": 71,
        "left_pred": "Spruce/Fir",
        "right_pred": "Krummholz"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "Horizontal_Distance_To_Hydrology",
        "threshold": 134.0,
        "samples": 225,
        "solver_mode": "exact",
        "gini": 0.5457,
        "gini_gain": 0.0709,
        "left_samples": 82,
        "right_samples": 143,
        "left_pred": "Krummholz",
        "right_pred": "Spruce/Fir"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "Hillshade_Noon",
        "threshold": 222.5,
        "samples": 195,
        "solver_mode": "exact",
        "gini": 0.7333,
        "gini_gain": 0.1135,
        "left_samples": 84,
        "right_samples": 111,
        "left_pred": "Douglas-fir",
        "right_pred": "Aspen"
      }
    ],
    "tree_hierarchy": {
      "node_id": 0,
      "is_leaf": false,
      "depth": 0,
      "samples": 20000,
      "class_counts": [
        3653,
        10760,
        1089,
        1076,
        1243,
        1061,
        1118
      ],
      "probabilities": [
        0.1826,
        0.538,
        0.0544,
        0.0538,
        0.0622,
        0.053,
        0.0559
      ],
      "predicted_class": "Lodgepole Pine",
      "predicted_class_idx": 1,
      "gini": 0.6615,
      "solver_mode": "mab",
      "feature_idx": 9,
      "feature_name": "Horizontal_Distance_To_Fire_Points",
      "threshold": 2573.1992,
      "bin_idx": 108,
      "left": {
        "node_id": 1,
        "is_leaf": false,
        "depth": 1,
        "samples": 8516,
        "class_counts": [
          2063,
          1422,
          1082,
          1076,
          1072,
          1046,
          755
        ],
        "probabilities": [
          0.2422,
          0.167,
          0.1271,
          0.1264,
          0.1259,
          0.1228,
          0.0887
        ],
        "predicted_class": "Spruce/Fir",
        "predicted_class_idx": 0,
        "gini": 0.8425,
        "solver_mode": "mab",
        "feature_idx": 0,
        "feature_name": "Elevation",
        "threshold": 2932.0,
        "bin_idx": 164,
        "left": {
          "node_id": 3,
          "is_leaf": false,
          "depth": 2,
          "samples": 4714,
          "class_counts": [
            84,
            408,
            1082,
            1076,
            1017,
            1046,
            1
          ],
          "probabilities": [
            0.0178,
            0.0866,
            0.2295,
            0.2283,
            0.2157,
            0.2219,
            0.0002
          ],
          "predicted_class": "Ponderosa Pine",
          "predicted_class_idx": 2,
          "gini": 0.7916,
          "solver_mode": "mab",
          "feature_idx": 0,
          "feature_name": "Elevation",
          "threshold": 2668.0,
          "bin_idx": 70,
          "left": {
            "node_id": 7,
            "is_leaf": false,
            "depth": 3,
            "samples": 3168,
            "class_counts": [
              5,
              86,
              999,
              1076,
              61,
              941,
              0
            ],
            "probabilities": [
              0.0016,
              0.0271,
              0.3153,
              0.3396,
              0.0193,
              0.297,
              0.0
            ],
            "predicted_class": "Cottonwood/Willow",
            "predicted_class_idx": 3,
            "gini": 0.6959,
            "solver_mode": "mab",
            "feature_idx": 0,
            "feature_name": "Elevation",
            "threshold": 2370.0,
            "bin_idx": 23,
            "left": {
              "node_id": 15,
              "is_leaf": false,
              "depth": 4,
              "samples": 1870,
              "class_counts": [
                0,
                2,
                473,
                1017,
                0,
                378,
                0
              ],
              "probabilities": [
                0.0,
                0.0011,
                0.2529,
                0.5439,
                0.0,
                0.2021,
                0.0
              ],
              "predicted_class": "Cottonwood/Willow",
              "predicted_class_idx": 3,
              "gini": 0.5994,
              "solver_mode": "mab",
              "feature_idx": 6,
              "feature_name": "Hillshade_9am",
              "threshold": 205.5,
              "bin_idx": 117,
              "left": {
                "node_id": 31,
                "is_leaf": true,
                "depth": 5,
                "samples": 764,
                "class_counts": [
                  0,
                  1,
                  298,
                  182,
                  0,
                  283,
                  0
                ],
                "probabilities": [
                  0.0,
                  0.0013,
                  0.3901,
                  0.2382,
                  0.0,
                  0.3704,
                  0.0
                ],
                "predicted_class": "Ponderosa Pine",
                "predicted_class_idx": 2,
                "gini": 0.6539,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 32,
                "is_leaf": true,
                "depth": 5,
                "samples": 1106,
                "class_counts": [
                  0,
                  1,
                  175,
                  835,
                  0,
                  95,
                  0
                ],
                "probabilities": [
                  0.0,
                  0.0009,
                  0.1582,
                  0.755,
                  0.0,
                  0.0859,
                  0.0
                ],
                "predicted_class": "Cottonwood/Willow",
                "predicted_class_idx": 3,
                "gini": 0.3976,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0971
            },
            "right": {
              "node_id": 16,
              "is_leaf": false,
              "depth": 4,
              "samples": 1298,
              "class_counts": [
                5,
                84,
                526,
                59,
                61,
                563,
                0
              ],
              "probabilities": [
                0.0039,
                0.0647,
                0.4052,
                0.0455,
                0.047,
                0.4337,
                0.0
              ],
              "predicted_class": "Douglas-fir",
              "predicted_class_idx": 5,
              "gini": 0.6392,
              "solver_mode": "mab",
              "feature_idx": 17,
              "feature_name": "Soil_Type_4",
              "threshold": 0.5,
              "bin_idx": 0,
              "left": {
                "node_id": 33,
                "is_leaf": true,
                "depth": 5,
                "samples": 1078,
                "class_counts": [
                  5,
                  82,
                  339,
                  59,
                  57,
                  536,
                  0
                ],
                "probabilities": [
                  0.0046,
                  0.0761,
                  0.3145,
                  0.0547,
                  0.0529,
                  0.4972,
                  0.0
                ],
                "predicted_class": "Douglas-fir",
                "predicted_class_idx": 5,
                "gini": 0.6423,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 34,
                "is_leaf": true,
                "depth": 5,
                "samples": 220,
                "class_counts": [
                  0,
                  2,
                  187,
                  0,
                  4,
                  27,
                  0
                ],
                "probabilities": [
                  0.0,
                  0.0091,
                  0.85,
                  0.0,
                  0.0182,
                  0.1227,
                  0.0
                ],
                "predicted_class": "Ponderosa Pine",
                "predicted_class_idx": 2,
                "gini": 0.262,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0614
            },
            "gini_gain": 0.0802
          },
          "right": {
            "node_id": 8,
            "is_leaf": false,
            "depth": 3,
            "samples": 1546,
            "class_counts": [
              79,
              322,
              83,
              0,
              956,
              105,
              1
            ],
            "probabilities": [
              0.0511,
              0.2083,
              0.0537,
              0.0,
              0.6184,
              0.0679,
              0.0006
            ],
            "predicted_class": "Aspen",
            "predicted_class_idx": 4,
            "gini": 0.5641,
            "solver_mode": "mab",
            "feature_idx": 6,
            "feature_name": "Hillshade_9am",
            "threshold": 185.5,
            "bin_idx": 97,
            "left": {
              "node_id": 17,
              "is_leaf": false,
              "depth": 4,
              "samples": 195,
              "class_counts": [
                17,
                55,
                7,
                0,
                63,
                53,
                0
              ],
              "probabilities": [
                0.0872,
                0.2821,
                0.0359,
                0.0,
                0.3231,
                0.2718,
                0.0
              ],
              "predicted_class": "Aspen",
              "predicted_class_idx": 4,
              "gini": 0.7333,
              "solver_mode": "exact",
              "feature_idx": 7,
              "feature_name": "Hillshade_Noon",
              "threshold": 222.5,
              "bin_idx": 97,
              "left": {
                "node_id": 35,
                "is_leaf": true,
                "depth": 5,
                "samples": 84,
                "class_counts": [
                  11,
                  26,
                  0,
                  0,
                  3,
                  44,
                  0
                ],
                "probabilities": [
                  0.131,
                  0.3095,
                  0.0,
                  0.0,
                  0.0357,
                  0.5238,
                  0.0
                ],
                "predicted_class": "Douglas-fir",
                "predicted_class_idx": 5,
                "gini": 0.6114,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 36,
                "is_leaf": true,
                "depth": 5,
                "samples": 111,
                "class_counts": [
                  6,
                  29,
                  7,
                  0,
                  60,
                  9,
                  0
                ],
                "probabilities": [
                  0.0541,
                  0.2613,
                  0.0631,
                  0.0,
                  0.5405,
                  0.0811,
                  0.0
                ],
                "predicted_class": "Aspen",
                "predicted_class_idx": 4,
                "gini": 0.6261,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.1135
            },
            "right": {
              "node_id": 18,
              "is_leaf": false,
              "depth": 4,
              "samples": 1351,
              "class_counts": [
                62,
                267,
                76,
                0,
                893,
                52,
                1
              ],
              "probabilities": [
                0.0459,
                0.1976,
                0.0563,
                0.0,
                0.661,
                0.0385,
                0.0007
              ],
              "predicted_class": "Aspen",
              "predicted_class_idx": 4,
              "gini": 0.5173,
              "solver_mode": "mab",
              "feature_idx": 1,
              "feature_name": "Aspect",
              "threshold": 51.0,
              "bin_idx": 44,
              "left": {
                "node_id": 37,
                "is_leaf": true,
                "depth": 5,
                "samples": 225,
                "class_counts": [
                  22,
                  72,
                  0,
                  0,
                  103,
                  28,
                  0
                ],
                "probabilities": [
                  0.0978,
                  0.32,
                  0.0,
                  0.0,
                  0.4578,
                  0.1244,
                  0.0
                ],
                "predicted_class": "Aspen",
                "predicted_class_idx": 4,
                "gini": 0.663,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 38,
                "is_leaf": true,
                "depth": 5,
                "samples": 1126,
                "class_counts": [
                  40,
                  195,
                  76,
                  0,
                  790,
                  24,
                  1
                ],
                "probabilities": [
                  0.0355,
                  0.1732,
                  0.0675,
                  0.0,
                  0.7016,
                  0.0213,
                  0.0009
                ],
                "predicted_class": "Aspen",
                "predicted_class_idx": 4,
                "gini": 0.4715,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0139
            },
            "gini_gain": 0.0196
          },
          "gini_gain": 0.1389
        },
        "right": {
          "node_id": 4,
          "is_leaf": false,
          "depth": 2,
          "samples": 3802,
          "class_counts": [
            1979,
            1014,
            0,
            0,
            55,
            0,
            754
          ],
          "probabilities": [
            0.5205,
            0.2667,
            0.0,
            0.0,
            0.0145,
            0.0,
            0.1983
          ],
          "predicted_class": "Spruce/Fir",
          "predicted_class_idx": 0,
          "gini": 0.6184,
          "solver_mode": "mab",
          "feature_idx": 0,
          "feature_name": "Elevation",
          "threshold": 3239.0,
          "bin_idx": 237,
          "left": {
            "node_id": 9,
            "is_leaf": false,
            "depth": 3,
            "samples": 2865,
            "class_counts": [
              1766,
              983,
              0,
              0,
              55,
              0,
              61
            ],
            "probabilities": [
              0.6164,
              0.3431,
              0.0,
              0.0,
              0.0192,
              0.0,
              0.0213
            ],
            "predicted_class": "Spruce/Fir",
            "predicted_class_idx": 0,
            "gini": 0.5015,
            "solver_mode": "mab",
            "feature_idx": 5,
            "feature_name": "Horizontal_Distance_To_Roadways",
            "threshold": 5398.0,
            "bin_idx": 208,
            "left": {
              "node_id": 19,
              "is_leaf": false,
              "depth": 4,
              "samples": 1730,
              "class_counts": [
                1249,
                365,
                0,
                0,
                55,
                0,
                61
              ],
              "probabilities": [
                0.722,
                0.211,
                0.0,
                0.0,
                0.0318,
                0.0,
                0.0353
              ],
              "predicted_class": "Spruce/Fir",
              "predicted_class_idx": 0,
              "gini": 0.432,
              "solver_mode": "mab",
              "feature_idx": 0,
              "feature_name": "Elevation",
              "threshold": 2988.0,
              "bin_idx": 180,
              "left": {
                "node_id": 39,
                "is_leaf": true,
                "depth": 5,
                "samples": 239,
                "class_counts": [
                  84,
                  103,
                  0,
                  0,
                  51,
                  0,
                  1
                ],
                "probabilities": [
                  0.3515,
                  0.431,
                  0.0,
                  0.0,
                  0.2134,
                  0.0,
                  0.0042
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.6452,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 40,
                "is_leaf": true,
                "depth": 5,
                "samples": 1491,
                "class_counts": [
                  1165,
                  262,
                  0,
                  0,
                  4,
                  0,
                  60
                ],
                "probabilities": [
                  0.7814,
                  0.1757,
                  0.0,
                  0.0,
                  0.0027,
                  0.0,
                  0.0402
                ],
                "predicted_class": "Spruce/Fir",
                "predicted_class_idx": 0,
                "gini": 0.357,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0352
            },
            "right": {
              "node_id": 20,
              "is_leaf": false,
              "depth": 4,
              "samples": 1135,
              "class_counts": [
                517,
                618,
                0,
                0,
                0,
                0,
                0
              ],
              "probabilities": [
                0.4555,
                0.5445,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              "predicted_class": "Lodgepole Pine",
              "predicted_class_idx": 1,
              "gini": 0.496,
              "solver_mode": "mab",
              "feature_idx": 2,
              "feature_name": "Slope",
              "threshold": 14.5,
              "bin_idx": 14,
              "left": {
                "node_id": 41,
                "is_leaf": true,
                "depth": 5,
                "samples": 777,
                "class_counts": [
                  408,
                  369,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "probabilities": [
                  0.5251,
                  0.4749,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ],
                "predicted_class": "Spruce/Fir",
                "predicted_class_idx": 0,
                "gini": 0.4987,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 42,
                "is_leaf": true,
                "depth": 5,
                "samples": 358,
                "class_counts": [
                  109,
                  249,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "probabilities": [
                  0.3045,
                  0.6955,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.4235,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.021
            },
            "gini_gain": 0.0441
          },
          "right": {
            "node_id": 10,
            "is_leaf": false,
            "depth": 3,
            "samples": 937,
            "class_counts": [
              213,
              31,
              0,
              0,
              0,
              0,
              693
            ],
            "probabilities": [
              0.2273,
              0.0331,
              0.0,
              0.0,
              0.0,
              0.0,
              0.7396
            ],
            "predicted_class": "Krummholz",
            "predicted_class_idx": 6,
            "gini": 0.4002,
            "solver_mode": "mab",
            "feature_idx": 0,
            "feature_name": "Elevation",
            "threshold": 3308.0,
            "bin_idx": 242,
            "left": {
              "node_id": 21,
              "is_leaf": false,
              "depth": 4,
              "samples": 287,
              "class_counts": [
                113,
                27,
                0,
                0,
                0,
                0,
                147
              ],
              "probabilities": [
                0.3937,
                0.0941,
                0.0,
                0.0,
                0.0,
                0.0,
                0.5122
              ],
              "predicted_class": "Krummholz",
              "predicted_class_idx": 6,
              "gini": 0.5738,
              "solver_mode": "exact",
              "feature_idx": 52,
              "feature_name": "Soil_Type_39",
              "threshold": 0.5,
              "bin_idx": 0,
              "left": {
                "node_id": 43,
                "is_leaf": true,
                "depth": 5,
                "samples": 216,
                "class_counts": [
                  104,
                  27,
                  0,
                  0,
                  0,
                  0,
                  85
                ],
                "probabilities": [
                  0.4815,
                  0.125,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.3935
                ],
                "predicted_class": "Spruce/Fir",
                "predicted_class_idx": 0,
                "gini": 0.5977,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 44,
                "is_leaf": true,
                "depth": 5,
                "samples": 71,
                "class_counts": [
                  9,
                  0,
                  0,
                  0,
                  0,
                  0,
                  62
                ],
                "probabilities": [
                  0.1268,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.8732
                ],
                "predicted_class": "Krummholz",
                "predicted_class_idx": 6,
                "gini": 0.2214,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0692
            },
            "right": {
              "node_id": 22,
              "is_leaf": false,
              "depth": 4,
              "samples": 650,
              "class_counts": [
                100,
                4,
                0,
                0,
                0,
                0,
                546
              ],
              "probabilities": [
                0.1538,
                0.0062,
                0.0,
                0.0,
                0.0,
                0.0,
                0.84
              ],
              "predicted_class": "Krummholz",
              "predicted_class_idx": 6,
              "gini": 0.2707,
              "solver_mode": "mab",
              "feature_idx": 8,
              "feature_name": "Hillshade_3pm",
              "threshold": 182.5,
              "bin_idx": 178,
              "left": {
                "node_id": 45,
                "is_leaf": true,
                "depth": 5,
                "samples": 569,
                "class_counts": [
                  68,
                  3,
                  0,
                  0,
                  0,
                  0,
                  498
                ],
                "probabilities": [
                  0.1195,
                  0.0053,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.8752
                ],
                "predicted_class": "Krummholz",
                "predicted_class_idx": 6,
                "gini": 0.2197,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 46,
                "is_leaf": true,
                "depth": 5,
                "samples": 81,
                "class_counts": [
                  32,
                  1,
                  0,
                  0,
                  0,
                  0,
                  48
                ],
                "probabilities": [
                  0.3951,
                  0.0123,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.5926
                ],
                "predicted_class": "Krummholz",
                "predicted_class_idx": 6,
                "gini": 0.4926,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.017
            },
            "gini_gain": 0.0367
          },
          "gini_gain": 0.1419
        },
        "gini_gain": 0.1282
      },
      "right": {
        "node_id": 2,
        "is_leaf": false,
        "depth": 1,
        "samples": 11484,
        "class_counts": [
          1590,
          9338,
          7,
          0,
          171,
          15,
          363
        ],
        "probabilities": [
          0.1385,
          0.8131,
          0.0006,
          0.0,
          0.0149,
          0.0013,
          0.0316
        ],
        "predicted_class": "Lodgepole Pine",
        "predicted_class_idx": 1,
        "gini": 0.3184,
        "solver_mode": "mab",
        "feature_idx": 0,
        "feature_name": "Elevation",
        "threshold": 3100.0,
        "bin_idx": 214,
        "left": {
          "node_id": 5,
          "is_leaf": false,
          "depth": 2,
          "samples": 10848,
          "class_counts": [
            1424,
            9231,
            7,
            0,
            171,
            15,
            0
          ],
          "probabilities": [
            0.1313,
            0.8509,
            0.0006,
            0.0,
            0.0158,
            0.0014,
            0.0
          ],
          "predicted_class": "Lodgepole Pine",
          "predicted_class_idx": 1,
          "gini": 0.2584,
          "solver_mode": "mab",
          "feature_idx": 4,
          "feature_name": "Vertical_Distance_To_Hydrology",
          "threshold": 65.0,
          "bin_idx": 82,
          "left": {
            "node_id": 11,
            "is_leaf": false,
            "depth": 3,
            "samples": 9414,
            "class_counts": [
              876,
              8365,
              4,
              0,
              157,
              12,
              0
            ],
            "probabilities": [
              0.0931,
              0.8886,
              0.0004,
              0.0,
              0.0167,
              0.0013,
              0.0
            ],
            "predicted_class": "Lodgepole Pine",
            "predicted_class_idx": 1,
            "gini": 0.2015,
            "solver_mode": "mab",
            "feature_idx": 9,
            "feature_name": "Horizontal_Distance_To_Fire_Points",
            "threshold": 6580.0,
            "bin_idx": 247,
            "left": {
              "node_id": 23,
              "is_leaf": false,
              "depth": 4,
              "samples": 8860,
              "class_counts": [
                703,
                7984,
                4,
                0,
                157,
                12,
                0
              ],
              "probabilities": [
                0.0793,
                0.9011,
                0.0005,
                0.0,
                0.0177,
                0.0014,
                0.0
              ],
              "predicted_class": "Lodgepole Pine",
              "predicted_class_idx": 1,
              "gini": 0.1814,
              "solver_mode": "mab",
              "feature_idx": 6,
              "feature_name": "Hillshade_9am",
              "threshold": 196.5,
              "bin_idx": 108,
              "left": {
                "node_id": 47,
                "is_leaf": true,
                "depth": 5,
                "samples": 1001,
                "class_counts": [
                  172,
                  820,
                  0,
                  0,
                  5,
                  4,
                  0
                ],
                "probabilities": [
                  0.1718,
                  0.8192,
                  0.0,
                  0.0,
                  0.005,
                  0.004,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.2994,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 48,
                "is_leaf": true,
                "depth": 5,
                "samples": 7859,
                "class_counts": [
                  531,
                  7164,
                  4,
                  0,
                  152,
                  8,
                  0
                ],
                "probabilities": [
                  0.0676,
                  0.9116,
                  0.0005,
                  0.0,
                  0.0193,
                  0.001,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.1641,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.002
            },
            "right": {
              "node_id": 24,
              "is_leaf": false,
              "depth": 4,
              "samples": 554,
              "class_counts": [
                173,
                381,
                0,
                0,
                0,
                0,
                0
              ],
              "probabilities": [
                0.3123,
                0.6877,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              "predicted_class": "Lodgepole Pine",
              "predicted_class_idx": 1,
              "gini": 0.4295,
              "solver_mode": "mab",
              "feature_idx": 0,
              "feature_name": "Elevation",
              "threshold": 2671.0,
              "bin_idx": 71,
              "left": {
                "node_id": 49,
                "is_leaf": true,
                "depth": 5,
                "samples": 170,
                "class_counts": [
                  8,
                  162,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "probabilities": [
                  0.0471,
                  0.9529,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.0897,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 50,
                "is_leaf": true,
                "depth": 5,
                "samples": 384,
                "class_counts": [
                  165,
                  219,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "probabilities": [
                  0.4297,
                  0.5703,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.4901,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0623
            },
            "gini_gain": 0.0055
          },
          "right": {
            "node_id": 12,
            "is_leaf": false,
            "depth": 3,
            "samples": 1434,
            "class_counts": [
              548,
              866,
              3,
              0,
              14,
              3,
              0
            ],
            "probabilities": [
              0.3821,
              0.6039,
              0.0021,
              0.0,
              0.0098,
              0.0021,
              0.0
            ],
            "predicted_class": "Lodgepole Pine",
            "predicted_class_idx": 1,
            "gini": 0.4892,
            "solver_mode": "mab",
            "feature_idx": 9,
            "feature_name": "Horizontal_Distance_To_Fire_Points",
            "threshold": 5541.4609,
            "bin_idx": 201,
            "left": {
              "node_id": 25,
              "is_leaf": false,
              "depth": 4,
              "samples": 880,
              "class_counts": [
                198,
                670,
                3,
                0,
                6,
                3,
                0
              ],
              "probabilities": [
                0.225,
                0.7614,
                0.0034,
                0.0,
                0.0068,
                0.0034,
                0.0
              ],
              "predicted_class": "Lodgepole Pine",
              "predicted_class_idx": 1,
              "gini": 0.3696,
              "solver_mode": "mab",
              "feature_idx": 5,
              "feature_name": "Horizontal_Distance_To_Roadways",
              "threshold": 5159.0,
              "bin_idx": 200,
              "left": {
                "node_id": 51,
                "is_leaf": true,
                "depth": 5,
                "samples": 486,
                "class_counts": [
                  176,
                  298,
                  3,
                  0,
                  6,
                  3,
                  0
                ],
                "probabilities": [
                  0.3621,
                  0.6132,
                  0.0062,
                  0.0,
                  0.0123,
                  0.0062,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.4927,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 52,
                "is_leaf": true,
                "depth": 5,
                "samples": 394,
                "class_counts": [
                  22,
                  372,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "probabilities": [
                  0.0558,
                  0.9442,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.1054,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0503
            },
            "right": {
              "node_id": 26,
              "is_leaf": false,
              "depth": 4,
              "samples": 554,
              "class_counts": [
                350,
                196,
                0,
                0,
                8,
                0,
                0
              ],
              "probabilities": [
                0.6318,
                0.3538,
                0.0,
                0.0,
                0.0144,
                0.0,
                0.0
              ],
              "predicted_class": "Spruce/Fir",
              "predicted_class_idx": 0,
              "gini": 0.4755,
              "solver_mode": "mab",
              "feature_idx": 6,
              "feature_name": "Hillshade_9am",
              "threshold": 235.5,
              "bin_idx": 147,
              "left": {
                "node_id": 53,
                "is_leaf": true,
                "depth": 5,
                "samples": 462,
                "class_counts": [
                  345,
                  115,
                  0,
                  0,
                  2,
                  0,
                  0
                ],
                "probabilities": [
                  0.7468,
                  0.2489,
                  0.0,
                  0.0,
                  0.0043,
                  0.0,
                  0.0
                ],
                "predicted_class": "Spruce/Fir",
                "predicted_class_idx": 0,
                "gini": 0.3804,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 54,
                "is_leaf": true,
                "depth": 5,
                "samples": 92,
                "class_counts": [
                  5,
                  81,
                  0,
                  0,
                  6,
                  0,
                  0
                ],
                "probabilities": [
                  0.0543,
                  0.8804,
                  0.0,
                  0.0,
                  0.0652,
                  0.0,
                  0.0
                ],
                "predicted_class": "Lodgepole Pine",
                "predicted_class_idx": 1,
                "gini": 0.2176,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.1221
            },
            "gini_gain": 0.0787
          },
          "gini_gain": 0.0189
        },
        "right": {
          "node_id": 6,
          "is_leaf": false,
          "depth": 2,
          "samples": 636,
          "class_counts": [
            166,
            107,
            0,
            0,
            0,
            0,
            363
          ],
          "probabilities": [
            0.261,
            0.1682,
            0.0,
            0.0,
            0.0,
            0.0,
            0.5708
          ],
          "predicted_class": "Krummholz",
          "predicted_class_idx": 6,
          "gini": 0.5778,
          "solver_mode": "mab",
          "feature_idx": 0,
          "feature_name": "Elevation",
          "threshold": 3280.3047,
          "bin_idx": 240,
          "left": {
            "node_id": 13,
            "is_leaf": false,
            "depth": 3,
            "samples": 298,
            "class_counts": [
              136,
              101,
              0,
              0,
              0,
              0,
              61
            ],
            "probabilities": [
              0.4564,
              0.3389,
              0.0,
              0.0,
              0.0,
              0.0,
              0.2047
            ],
            "predicted_class": "Spruce/Fir",
            "predicted_class_idx": 0,
            "gini": 0.6349,
            "solver_mode": "exact",
            "feature_idx": 5,
            "feature_name": "Horizontal_Distance_To_Roadways",
            "threshold": 5245.0,
            "bin_idx": 203,
            "left": {
              "node_id": 27,
              "is_leaf": false,
              "depth": 4,
              "samples": 225,
              "class_counts": [
                136,
                28,
                0,
                0,
                0,
                0,
                61
              ],
              "probabilities": [
                0.6044,
                0.1244,
                0.0,
                0.0,
                0.0,
                0.0,
                0.2711
              ],
              "predicted_class": "Spruce/Fir",
              "predicted_class_idx": 0,
              "gini": 0.5457,
              "solver_mode": "exact",
              "feature_idx": 3,
              "feature_name": "Horizontal_Distance_To_Hydrology",
              "threshold": 134.0,
              "bin_idx": 12,
              "left": {
                "node_id": 55,
                "is_leaf": true,
                "depth": 5,
                "samples": 82,
                "class_counts": [
                  33,
                  4,
                  0,
                  0,
                  0,
                  0,
                  45
                ],
                "probabilities": [
                  0.4024,
                  0.0488,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.5488
                ],
                "predicted_class": "Krummholz",
                "predicted_class_idx": 6,
                "gini": 0.5345,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 56,
                "is_leaf": true,
                "depth": 5,
                "samples": 143,
                "class_counts": [
                  103,
                  24,
                  0,
                  0,
                  0,
                  0,
                  16
                ],
                "probabilities": [
                  0.7203,
                  0.1678,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.1119
                ],
                "predicted_class": "Spruce/Fir",
                "predicted_class_idx": 0,
                "gini": 0.4405,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0709
            },
            "right": {
              "node_id": 28,
              "is_leaf": true,
              "depth": 4,
              "samples": 73,
              "class_counts": [
                0,
                73,
                0,
                0,
                0,
                0,
                0
              ],
              "probabilities": [
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              "predicted_class": "Lodgepole Pine",
              "predicted_class_idx": 1,
              "gini": 0.0,
              "solver_mode": "leaf"
            },
            "gini_gain": 0.2229
          },
          "right": {
            "node_id": 14,
            "is_leaf": false,
            "depth": 3,
            "samples": 338,
            "class_counts": [
              30,
              6,
              0,
              0,
              0,
              0,
              302
            ],
            "probabilities": [
              0.0888,
              0.0178,
              0.0,
              0.0,
              0.0,
              0.0,
              0.8935
            ],
            "predicted_class": "Krummholz",
            "predicted_class_idx": 6,
            "gini": 0.1935,
            "solver_mode": "exact",
            "feature_idx": 11,
            "feature_name": "Wilderness_Area_2",
            "threshold": 0.5,
            "bin_idx": 0,
            "left": {
              "node_id": 29,
              "is_leaf": true,
              "depth": 4,
              "samples": 315,
              "class_counts": [
                16,
                1,
                0,
                0,
                0,
                0,
                298
              ],
              "probabilities": [
                0.0508,
                0.0032,
                0.0,
                0.0,
                0.0,
                0.0,
                0.946
              ],
              "predicted_class": "Krummholz",
              "predicted_class_idx": 6,
              "gini": 0.1024,
              "solver_mode": "leaf"
            },
            "right": {
              "node_id": 30,
              "is_leaf": true,
              "depth": 4,
              "samples": 23,
              "class_counts": [
                14,
                5,
                0,
                0,
                0,
                0,
                4
              ],
              "probabilities": [
                0.6087,
                0.2174,
                0.0,
                0.0,
                0.0,
                0.0,
                0.1739
              ],
              "predicted_class": "Spruce/Fir",
              "predicted_class_idx": 0,
              "gini": 0.552,
              "solver_mode": "leaf"
            },
            "gini_gain": 0.0605
          },
          "gini_gain": 0.1775
        },
        "gini_gain": 0.0423
      },
      "gini_gain": 0.1199
    },
    "feature_contributions": [
      {
        "rank": 1,
        "feature_idx": 0,
        "feature_name": "Elevation",
        "mab_importance_pct": 32.14,
        "rf_importance_pct": 15.07,
        "mutual_info_pct": 19.03,
        "mutual_info_raw": 0.6626,
        "split_count": 9,
        "stats": {
          "feature_idx": 0,
          "feature_name": "Elevation",
          "min": 1874.0,
          "max": 3846.0,
          "mean": 2812.884033203125,
          "std": 299.50738525390625,
          "unique_values": 549
        },
        "composite_score": 22.89,
        "cumulative_pct": 22.88
      },
      {
        "rank": 2,
        "feature_idx": 9,
        "feature_name": "Horizontal_Distance_To_Fire_Points",
        "mab_importance_pct": 10.71,
        "rf_importance_pct": 19.28,
        "mutual_info_pct": 10.97,
        "mutual_info_raw": 0.3818,
        "split_count": 3,
        "stats": {
          "feature_idx": 9,
          "feature_name": "Horizontal_Distance_To_Fire_Points",
          "min": 0.0,
          "max": 7172.0,
          "mean": 3382.9951171875,
          "std": 2036.2098388671875,
          "unique_values": 888
        },
        "composite_score": 13.77,
        "cumulative_pct": 36.65
      },
      {
        "rank": 3,
        "feature_idx": 5,
        "feature_name": "Horizontal_Distance_To_Roadways",
        "mab_importance_pct": 10.71,
        "rf_importance_pct": 8.02,
        "mutual_info_pct": 8.39,
        "mutual_info_raw": 0.2921,
        "split_count": 3,
        "stats": {
          "feature_idx": 5,
          "feature_name": "Horizontal_Distance_To_Roadways",
          "min": 0.0,
          "max": 7117.0,
          "mean": 3047.738037109375,
          "std": 1987.9814453125,
          "unique_values": 883
        },
        "composite_score": 9.19,
        "cumulative_pct": 45.83
      },
      {
        "rank": 4,
        "feature_idx": 6,
        "feature_name": "Hillshade_9am",
        "mab_importance_pct": 14.29,
        "rf_importance_pct": 2.44,
        "mutual_info_pct": 2.55,
        "mutual_info_raw": 0.0889,
        "split_count": 4,
        "stats": {
          "feature_idx": 6,
          "feature_name": "Hillshade_9am",
          "min": 65.0,
          "max": 254.0,
          "mean": 216.63059997558594,
          "std": 25.462099075317383,
          "unique_values": 119
        },
        "composite_score": 7.21,
        "cumulative_pct": 53.04
      },
      {
        "rank": 5,
        "feature_idx": 10,
        "feature_name": "Wilderness_Area_1",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 13.16,
        "mutual_info_pct": 10.16,
        "mutual_info_raw": 0.3536,
        "split_count": 0,
        "stats": {
          "feature_idx": 10,
          "feature_name": "Wilderness_Area_1",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.7085999846458435,
          "std": 0.4544000029563904,
          "unique_values": 2
        },
        "composite_score": 7.15,
        "cumulative_pct": 60.19
      },
      {
        "rank": 6,
        "feature_idx": 13,
        "feature_name": "Wilderness_Area_4",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 6.68,
        "mutual_info_pct": 8.11,
        "mutual_info_raw": 0.2822,
        "split_count": 0,
        "stats": {
          "feature_idx": 13,
          "feature_name": "Wilderness_Area_4",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.11699999868869781,
          "std": 0.321399986743927,
          "unique_values": 2
        },
        "composite_score": 4.37,
        "cumulative_pct": 64.55
      },
      {
        "rank": 7,
        "feature_idx": 4,
        "feature_name": "Vertical_Distance_To_Hydrology",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 4.47,
        "mutual_info_pct": 3.16,
        "mutual_info_raw": 0.1101,
        "split_count": 1,
        "stats": {
          "feature_idx": 4,
          "feature_name": "Vertical_Distance_To_Hydrology",
          "min": -123.0,
          "max": 411.0,
          "mean": 36.9900016784668,
          "std": 49.10139846801758,
          "unique_values": 196
        },
        "composite_score": 3.78,
        "cumulative_pct": 68.33
      },
      {
        "rank": 8,
        "feature_idx": 3,
        "feature_name": "Horizontal_Distance_To_Hydrology",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 2.85,
        "mutual_info_pct": 1.74,
        "mutual_info_raw": 0.0605,
        "split_count": 1,
        "stats": {
          "feature_idx": 3,
          "feature_name": "Horizontal_Distance_To_Hydrology",
          "min": 0.0,
          "max": 1343.0,
          "mean": 223.27920532226562,
          "std": 187.5225067138672,
          "unique_values": 160
        },
        "composite_score": 2.86,
        "cumulative_pct": 71.19
      },
      {
        "rank": 9,
        "feature_idx": 2,
        "feature_name": "Slope",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 2.09,
        "mutual_info_pct": 2.73,
        "mutual_info_raw": 0.0949,
        "split_count": 1,
        "stats": {
          "feature_idx": 2,
          "feature_name": "Slope",
          "min": 0.0,
          "max": 61.0,
          "mean": 13.511799812316895,
          "std": 7.792200088500977,
          "unique_values": 40
        },
        "composite_score": 2.84,
        "cumulative_pct": 74.03
      },
      {
        "rank": 10,
        "feature_idx": 8,
        "feature_name": "Hillshade_3pm",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 2.08,
        "mutual_info_pct": 2.52,
        "mutual_info_raw": 0.0879,
        "split_count": 1,
        "stats": {
          "feature_idx": 8,
          "feature_name": "Hillshade_3pm",
          "min": 0.0,
          "max": 248.0,
          "mean": 137.29739379882812,
          "std": 36.142398834228516,
          "unique_values": 179
        },
        "composite_score": 2.79,
        "cumulative_pct": 76.82
      },
      {
        "rank": 11,
        "feature_idx": 1,
        "feature_name": "Aspect",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 2.29,
        "mutual_info_pct": 1.47,
        "mutual_info_raw": 0.0511,
        "split_count": 1,
        "stats": {
          "feature_idx": 1,
          "feature_name": "Aspect",
          "min": 0.0,
          "max": 359.0,
          "mean": 141.79739379882812,
          "std": 105.6947021484375,
          "unique_values": 302
        },
        "composite_score": 2.6,
        "cumulative_pct": 79.42
      },
      {
        "rank": 12,
        "feature_idx": 12,
        "feature_name": "Wilderness_Area_3",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 4.86,
        "mutual_info_pct": 3.58,
        "mutual_info_raw": 0.1246,
        "split_count": 0,
        "stats": {
          "feature_idx": 12,
          "feature_name": "Wilderness_Area_3",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.16259999573230743,
          "std": 0.36899998784065247,
          "unique_values": 2
        },
        "composite_score": 2.6,
        "cumulative_pct": 82.02
      },
      {
        "rank": 13,
        "feature_idx": 7,
        "feature_name": "Hillshade_Noon",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 2.02,
        "mutual_info_pct": 1.57,
        "mutual_info_raw": 0.0547,
        "split_count": 1,
        "stats": {
          "feature_idx": 7,
          "feature_name": "Hillshade_Noon",
          "min": 99.0,
          "max": 254.0,
          "mean": 223.2075958251953,
          "std": 18.824100494384766,
          "unique_values": 91
        },
        "composite_score": 2.53,
        "cumulative_pct": 84.55
      },
      {
        "rank": 14,
        "feature_idx": 52,
        "feature_name": "Soil_Type_39",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 1.21,
        "mutual_info_pct": 1.06,
        "mutual_info_raw": 0.0369,
        "split_count": 1,
        "stats": {
          "feature_idx": 52,
          "feature_name": "Soil_Type_39",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.017400000244379044,
          "std": 0.1306000053882599,
          "unique_values": 2
        },
        "composite_score": 2.12,
        "cumulative_pct": 86.67
      },
      {
        "rank": 15,
        "feature_idx": 17,
        "feature_name": "Soil_Type_4",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 0.91,
        "mutual_info_pct": 0.87,
        "mutual_info_raw": 0.0302,
        "split_count": 1,
        "stats": {
          "feature_idx": 17,
          "feature_name": "Soil_Type_4",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.02239999920129776,
          "std": 0.14810000360012054,
          "unique_values": 2
        },
        "composite_score": 1.96,
        "cumulative_pct": 88.62
      },
      {
        "rank": 16,
        "feature_idx": 11,
        "feature_name": "Wilderness_Area_2",
        "mab_importance_pct": 3.57,
        "rf_importance_pct": 0.49,
        "mutual_info_pct": 0.5,
        "mutual_info_raw": 0.0174,
        "split_count": 1,
        "stats": {
          "feature_idx": 11,
          "feature_name": "Wilderness_Area_2",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.012000000104308128,
          "std": 0.10869999974966049,
          "unique_values": 2
        },
        "composite_score": 1.72,
        "cumulative_pct": 90.34
      },
      {
        "rank": 17,
        "feature_idx": 23,
        "feature_name": "Soil_Type_10",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.45,
        "mutual_info_pct": 2.8,
        "mutual_info_raw": 0.0973,
        "split_count": 0,
        "stats": {
          "feature_idx": 23,
          "feature_name": "Soil_Type_10",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.05299999937415123,
          "std": 0.2240000069141388,
          "unique_values": 2
        },
        "composite_score": 1.56,
        "cumulative_pct": 91.9
      },
      {
        "rank": 18,
        "feature_idx": 16,
        "feature_name": "Soil_Type_3",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 1.82,
        "mutual_info_pct": 2.03,
        "mutual_info_raw": 0.0707,
        "split_count": 0,
        "stats": {
          "feature_idx": 16,
          "feature_name": "Soil_Type_3",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.02419999986886978,
          "std": 0.15379999577999115,
          "unique_values": 2
        },
        "composite_score": 1.14,
        "cumulative_pct": 93.04
      },
      {
        "rank": 19,
        "feature_idx": 42,
        "feature_name": "Soil_Type_29",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.54,
        "mutual_info_pct": 3.19,
        "mutual_info_raw": 0.1111,
        "split_count": 0,
        "stats": {
          "feature_idx": 42,
          "feature_name": "Soil_Type_29",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.3192000091075897,
          "std": 0.4661000072956085,
          "unique_values": 2
        },
        "composite_score": 0.99,
        "cumulative_pct": 94.03
      },
      {
        "rank": 20,
        "feature_idx": 51,
        "feature_name": "Soil_Type_38",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 1.64,
        "mutual_info_pct": 1.63,
        "mutual_info_raw": 0.0568,
        "split_count": 0,
        "stats": {
          "feature_idx": 51,
          "feature_name": "Soil_Type_38",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.019300000742077827,
          "std": 0.13760000467300415,
          "unique_values": 2
        },
        "composite_score": 0.98,
        "cumulative_pct": 95.01
      },
      {
        "rank": 21,
        "feature_idx": 43,
        "feature_name": "Soil_Type_30",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 1.04,
        "mutual_info_pct": 1.18,
        "mutual_info_raw": 0.0409,
        "split_count": 0,
        "stats": {
          "feature_idx": 43,
          "feature_name": "Soil_Type_30",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.08060000091791153,
          "std": 0.2721000015735626,
          "unique_values": 2
        },
        "composite_score": 0.66,
        "cumulative_pct": 95.67
      },
      {
        "rank": 22,
        "feature_idx": 25,
        "feature_name": "Soil_Type_12",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.34,
        "mutual_info_pct": 1.72,
        "mutual_info_raw": 0.0597,
        "split_count": 0,
        "stats": {
          "feature_idx": 25,
          "feature_name": "Soil_Type_12",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.14399999380111694,
          "std": 0.35109999775886536,
          "unique_values": 2
        },
        "composite_score": 0.55,
        "cumulative_pct": 96.22
      },
      {
        "rank": 23,
        "feature_idx": 19,
        "feature_name": "Soil_Type_6",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.44,
        "mutual_info_pct": 1.33,
        "mutual_info_raw": 0.0463,
        "split_count": 0,
        "stats": {
          "feature_idx": 19,
          "feature_name": "Soil_Type_6",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.016599999740719795,
          "std": 0.12800000607967377,
          "unique_values": 2
        },
        "composite_score": 0.49,
        "cumulative_pct": 96.71
      },
      {
        "rank": 24,
        "feature_idx": 53,
        "feature_name": "Soil_Type_40",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.75,
        "mutual_info_pct": 0.83,
        "mutual_info_raw": 0.029,
        "split_count": 0,
        "stats": {
          "feature_idx": 53,
          "feature_name": "Soil_Type_40",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.011800000444054604,
          "std": 0.1080000028014183,
          "unique_values": 2
        },
        "composite_score": 0.47,
        "cumulative_pct": 97.18
      },
      {
        "rank": 25,
        "feature_idx": 36,
        "feature_name": "Soil_Type_23",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.9,
        "mutual_info_pct": 0.49,
        "mutual_info_raw": 0.0169,
        "split_count": 0,
        "stats": {
          "feature_idx": 36,
          "feature_name": "Soil_Type_23",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.02759999968111515,
          "std": 0.16369999945163727,
          "unique_values": 2
        },
        "composite_score": 0.44,
        "cumulative_pct": 97.62
      },
      {
        "rank": 26,
        "feature_idx": 26,
        "feature_name": "Soil_Type_13",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.28,
        "mutual_info_pct": 0.91,
        "mutual_info_raw": 0.0316,
        "split_count": 0,
        "stats": {
          "feature_idx": 26,
          "feature_name": "Soil_Type_13",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.012199999764561653,
          "std": 0.1096000000834465,
          "unique_values": 2
        },
        "composite_score": 0.33,
        "cumulative_pct": 97.95
      },
      {
        "rank": 27,
        "feature_idx": 15,
        "feature_name": "Soil_Type_2",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.13,
        "mutual_info_pct": 1.05,
        "mutual_info_raw": 0.0367,
        "split_count": 0,
        "stats": {
          "feature_idx": 15,
          "feature_name": "Soil_Type_2",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.015200000256299973,
          "std": 0.12210000306367874,
          "unique_values": 2
        },
        "composite_score": 0.31,
        "cumulative_pct": 98.26
      },
      {
        "rank": 28,
        "feature_idx": 31,
        "feature_name": "Soil_Type_18",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.1,
        "mutual_info_pct": 0.92,
        "mutual_info_raw": 0.0322,
        "split_count": 0,
        "stats": {
          "feature_idx": 31,
          "feature_name": "Soil_Type_18",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.042500000447034836,
          "std": 0.20170000195503235,
          "unique_values": 2
        },
        "composite_score": 0.27,
        "cumulative_pct": 98.53
      },
      {
        "rank": 29,
        "feature_idx": 35,
        "feature_name": "Soil_Type_22",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.49,
        "mutual_info_pct": 0.19,
        "mutual_info_raw": 0.0067,
        "split_count": 0,
        "stats": {
          "feature_idx": 35,
          "feature_name": "Soil_Type_22",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.008200000040233135,
          "std": 0.09019999951124191,
          "unique_values": 2
        },
        "composite_score": 0.22,
        "cumulative_pct": 98.75
      },
      {
        "rank": 30,
        "feature_idx": 30,
        "feature_name": "Soil_Type_17",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.24,
        "mutual_info_pct": 0.41,
        "mutual_info_raw": 0.0143,
        "split_count": 0,
        "stats": {
          "feature_idx": 30,
          "feature_name": "Soil_Type_17",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.015599999576807022,
          "std": 0.12409999966621399,
          "unique_values": 2
        },
        "composite_score": 0.19,
        "cumulative_pct": 98.94
      },
      {
        "rank": 31,
        "feature_idx": 18,
        "feature_name": "Soil_Type_5",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.03,
        "mutual_info_pct": 0.63,
        "mutual_info_raw": 0.022,
        "split_count": 0,
        "stats": {
          "feature_idx": 18,
          "feature_name": "Soil_Type_5",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.003800000064074993,
          "std": 0.061500001698732376,
          "unique_values": 2
        },
        "composite_score": 0.17,
        "cumulative_pct": 99.11
      },
      {
        "rank": 32,
        "feature_idx": 24,
        "feature_name": "Soil_Type_11",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.14,
        "mutual_info_pct": 0.36,
        "mutual_info_raw": 0.0126,
        "split_count": 0,
        "stats": {
          "feature_idx": 24,
          "feature_name": "Soil_Type_11",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.009800000116229057,
          "std": 0.09849999845027924,
          "unique_values": 2
        },
        "composite_score": 0.14,
        "cumulative_pct": 99.25
      },
      {
        "rank": 33,
        "feature_idx": 37,
        "feature_name": "Soil_Type_24",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.16,
        "mutual_info_pct": 0.18,
        "mutual_info_raw": 0.0062,
        "split_count": 0,
        "stats": {
          "feature_idx": 37,
          "feature_name": "Soil_Type_24",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.029600000008940697,
          "std": 0.1695999950170517,
          "unique_values": 2
        },
        "composite_score": 0.1,
        "cumulative_pct": 99.35
      },
      {
        "rank": 34,
        "feature_idx": 50,
        "feature_name": "Soil_Type_37",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.02,
        "mutual_info_pct": 0.37,
        "mutual_info_raw": 0.0128,
        "split_count": 0,
        "stats": {
          "feature_idx": 50,
          "feature_name": "Soil_Type_37",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0007999999797903001,
          "std": 0.029100000858306885,
          "unique_values": 2
        },
        "composite_score": 0.1,
        "cumulative_pct": 99.45
      },
      {
        "rank": 35,
        "feature_idx": 21,
        "feature_name": "Soil_Type_8",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.32,
        "mutual_info_raw": 0.0112,
        "split_count": 0,
        "stats": {
          "feature_idx": 21,
          "feature_name": "Soil_Type_8",
          "min": 0.0,
          "max": 0.0,
          "mean": 0.0,
          "std": 0.0,
          "unique_values": 1
        },
        "composite_score": 0.08,
        "cumulative_pct": 99.53
      },
      {
        "rank": 36,
        "feature_idx": 33,
        "feature_name": "Soil_Type_20",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.02,
        "mutual_info_pct": 0.26,
        "mutual_info_raw": 0.009,
        "split_count": 0,
        "stats": {
          "feature_idx": 33,
          "feature_name": "Soil_Type_20",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.03849999979138374,
          "std": 0.1923999935388565,
          "unique_values": 2
        },
        "composite_score": 0.07,
        "cumulative_pct": 99.6
      },
      {
        "rank": 37,
        "feature_idx": 32,
        "feature_name": "Soil_Type_19",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.02,
        "mutual_info_pct": 0.2,
        "mutual_info_raw": 0.0068,
        "split_count": 0,
        "stats": {
          "feature_idx": 32,
          "feature_name": "Soil_Type_19",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.003599999938160181,
          "std": 0.06030000001192093,
          "unique_values": 2
        },
        "composite_score": 0.06,
        "cumulative_pct": 99.66
      },
      {
        "rank": 38,
        "feature_idx": 44,
        "feature_name": "Soil_Type_31",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.04,
        "mutual_info_pct": 0.17,
        "mutual_info_raw": 0.0061,
        "split_count": 0,
        "stats": {
          "feature_idx": 44,
          "feature_name": "Soil_Type_31",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.00839999970048666,
          "std": 0.09149999916553497,
          "unique_values": 2
        },
        "composite_score": 0.06,
        "cumulative_pct": 99.72
      },
      {
        "rank": 39,
        "feature_idx": 45,
        "feature_name": "Soil_Type_32",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.17,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 45,
          "feature_name": "Soil_Type_32",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.018200000748038292,
          "std": 0.13369999825954437,
          "unique_values": 2
        },
        "composite_score": 0.06,
        "cumulative_pct": 99.78
      },
      {
        "rank": 40,
        "feature_idx": 46,
        "feature_name": "Soil_Type_33",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.14,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 46,
          "feature_name": "Soil_Type_33",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.015599999576807022,
          "std": 0.12389999628067017,
          "unique_values": 2
        },
        "composite_score": 0.05,
        "cumulative_pct": 99.83
      },
      {
        "rank": 41,
        "feature_idx": 47,
        "feature_name": "Soil_Type_34",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.16,
        "mutual_info_raw": 0.0056,
        "split_count": 0,
        "stats": {
          "feature_idx": 47,
          "feature_name": "Soil_Type_34",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0003000000142492354,
          "std": 0.018699999898672104,
          "unique_values": 1
        },
        "composite_score": 0.04,
        "cumulative_pct": 99.87
      },
      {
        "rank": 42,
        "feature_idx": 29,
        "feature_name": "Soil_Type_16",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.01,
        "mutual_info_pct": 0.11,
        "mutual_info_raw": 0.0038,
        "split_count": 0,
        "stats": {
          "feature_idx": 29,
          "feature_name": "Soil_Type_16",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.02329999953508377,
          "std": 0.1509000062942505,
          "unique_values": 2
        },
        "composite_score": 0.03,
        "cumulative_pct": 99.9
      },
      {
        "rank": 43,
        "feature_idx": 48,
        "feature_name": "Soil_Type_35",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.08,
        "mutual_info_pct": 0.02,
        "mutual_info_raw": 0.0005,
        "split_count": 0,
        "stats": {
          "feature_idx": 48,
          "feature_name": "Soil_Type_35",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.002300000051036477,
          "std": 0.0478999987244606,
          "unique_values": 2
        },
        "composite_score": 0.03,
        "cumulative_pct": 99.93
      },
      {
        "rank": 44,
        "feature_idx": 38,
        "feature_name": "Soil_Type_25",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.01,
        "mutual_info_pct": 0.06,
        "mutual_info_raw": 0.0021,
        "split_count": 0,
        "stats": {
          "feature_idx": 38,
          "feature_name": "Soil_Type_25",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0,
          "std": 0.0071000000461936,
          "unique_values": 1
        },
        "composite_score": 0.02,
        "cumulative_pct": 99.95
      },
      {
        "rank": 45,
        "feature_idx": 39,
        "feature_name": "Soil_Type_26",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.01,
        "mutual_info_pct": 0.05,
        "mutual_info_raw": 0.0016,
        "split_count": 0,
        "stats": {
          "feature_idx": 39,
          "feature_name": "Soil_Type_26",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0015999999595806003,
          "std": 0.03929999843239784,
          "unique_values": 2
        },
        "composite_score": 0.02,
        "cumulative_pct": 99.97
      },
      {
        "rank": 46,
        "feature_idx": 14,
        "feature_name": "Soil_Type_1",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.04,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 14,
          "feature_name": "Soil_Type_1",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.008700000122189522,
          "std": 0.09290000051259995,
          "unique_values": 2
        },
        "composite_score": 0.01,
        "cumulative_pct": 99.98
      },
      {
        "rank": 47,
        "feature_idx": 22,
        "feature_name": "Soil_Type_9",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.02,
        "mutual_info_raw": 0.0008,
        "split_count": 0,
        "stats": {
          "feature_idx": 22,
          "feature_name": "Soil_Type_9",
          "min": 0.0,
          "max": 1.0,
          "mean": 9.999999747378752e-05,
          "std": 0.009999999776482582,
          "unique_values": 1
        },
        "composite_score": 0.01,
        "cumulative_pct": 99.99
      },
      {
        "rank": 48,
        "feature_idx": 27,
        "feature_name": "Soil_Type_14",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.03,
        "mutual_info_pct": 0.01,
        "mutual_info_raw": 0.0005,
        "split_count": 0,
        "stats": {
          "feature_idx": 27,
          "feature_name": "Soil_Type_14",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.00419999985024333,
          "std": 0.06430000066757202,
          "unique_values": 2
        },
        "composite_score": 0.01,
        "cumulative_pct": 100.0
      },
      {
        "rank": 49,
        "feature_idx": 20,
        "feature_name": "Soil_Type_7",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 20,
          "feature_name": "Soil_Type_7",
          "min": 0.0,
          "max": 0.0,
          "mean": 0.0,
          "std": 0.0,
          "unique_values": 1
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      },
      {
        "rank": 50,
        "feature_idx": 28,
        "feature_name": "Soil_Type_15",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 28,
          "feature_name": "Soil_Type_15",
          "min": 0.0,
          "max": 0.0,
          "mean": 0.0,
          "std": 0.0,
          "unique_values": 1
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      },
      {
        "rank": 51,
        "feature_idx": 34,
        "feature_name": "Soil_Type_21",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 34,
          "feature_name": "Soil_Type_21",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0003000000142492354,
          "std": 0.01730000041425228,
          "unique_values": 1
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      },
      {
        "rank": 52,
        "feature_idx": 40,
        "feature_name": "Soil_Type_27",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 40,
          "feature_name": "Soil_Type_27",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0003000000142492354,
          "std": 0.018699999898672104,
          "unique_values": 1
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      },
      {
        "rank": 53,
        "feature_idx": 41,
        "feature_name": "Soil_Type_28",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.01,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 41,
          "feature_name": "Soil_Type_28",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0003000000142492354,
          "std": 0.01730000041425228,
          "unique_values": 1
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      },
      {
        "rank": 54,
        "feature_idx": 49,
        "feature_name": "Soil_Type_36",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.0,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 49,
          "feature_name": "Soil_Type_36",
          "min": 0.0,
          "max": 1.0,
          "mean": 0.0003000000142492354,
          "std": 0.018699999898672104,
          "unique_values": 2
        },
        "composite_score": 0.0,
        "cumulative_pct": 100.0
      }
    ]
  },
  "higgs": {
    "dataset_name": "HIGGS Boson Kinematics",
    "n_samples": 20000,
    "n_features": 28,
    "n_classes": 2,
    "class_names": [
      "Background (0)",
      "Signal (1)"
    ],
    "feature_names": [
      "lepton_pT",
      "lepton_eta",
      "lepton_phi",
      "missing_energy_magnitude",
      "missing_energy_phi",
      "jet_1_pt",
      "jet_1_eta",
      "jet_1_phi",
      "jet_1_b-tag",
      "jet_2_pt",
      "jet_2_eta",
      "jet_2_phi",
      "jet_2_b-tag",
      "jet_3_pt",
      "jet_3_eta",
      "jet_3_phi",
      "jet_3_b-tag",
      "jet_4_pt",
      "jet_4_eta",
      "jet_4_phi",
      "jet_4_b-tag",
      "m_jj",
      "m_jjj",
      "m_lv",
      "m_jlv",
      "m_bb",
      "m_wbb",
      "m_wwbb"
    ],
    "performance": {
      "mab_fit_time_sec": 0.3258,
      "std_dt_fit_time_sec": 0.8304,
      "speedup_ratio": 2.55,
      "total_nodes": 63,
      "tree_depth": 5,
      "splits_by_mode": {
        "exact": 5,
        "mab": 26
      },
      "samples_evaluated": 98847,
      "theoretical_full_scan_samples": 620000,
      "sample_evaluation_reduction_pct": 84.1
    },
    "top_features": {
      "top_3": [
        "m_bb",
        "m_wwbb",
        "m_jjj"
      ],
      "top_5": [
        "m_bb",
        "m_wwbb",
        "m_jjj",
        "jet_1_pt",
        "m_jlv"
      ],
      "top_5_cumulative_pct": 58.52
    },
    "root_split": {
      "node_id": 0,
      "depth": 0,
      "feature_name": "m_bb",
      "threshold": 1.0613,
      "samples": 20000,
      "solver_mode": "mab",
      "gini": 0.4985,
      "gini_gain": 0.0215,
      "left_samples": 14062,
      "right_samples": 5938,
      "left_pred": "Signal (1)",
      "right_pred": "Background (0)"
    },
    "final_splits_count": 16,
    "final_splits": [
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.9331,
        "samples": 5817,
        "solver_mode": "mab",
        "gini": 0.3696,
        "gini_gain": 0.0111,
        "left_samples": 4290,
        "right_samples": 1527,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "m_jlv",
        "threshold": 1.036,
        "samples": 1941,
        "solver_mode": "mab",
        "gini": 0.3489,
        "gini_gain": 0.0111,
        "left_samples": 1403,
        "right_samples": 538,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.7485,
        "samples": 1699,
        "solver_mode": "mab",
        "gini": 0.4672,
        "gini_gain": 0.0088,
        "left_samples": 854,
        "right_samples": 845,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 1.0913,
        "samples": 1432,
        "solver_mode": "mab",
        "gini": 0.4655,
        "gini_gain": 0.0019,
        "left_samples": 813,
        "right_samples": 619,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 1.1763,
        "samples": 1270,
        "solver_mode": "mab",
        "gini": 0.4888,
        "gini_gain": 0.0267,
        "left_samples": 653,
        "right_samples": 617,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 0.9528,
        "samples": 1220,
        "solver_mode": "mab",
        "gini": 0.4938,
        "gini_gain": 0.0067,
        "left_samples": 936,
        "right_samples": 284,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "missing_energy_phi",
        "threshold": 1.1694,
        "samples": 1143,
        "solver_mode": "mab",
        "gini": 0.4639,
        "gini_gain": -0.0,
        "left_samples": 954,
        "right_samples": 189,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "jet_1_pt",
        "threshold": 0.7182,
        "samples": 1081,
        "solver_mode": "mab",
        "gini": 0.4686,
        "gini_gain": 0.0045,
        "left_samples": 383,
        "right_samples": 698,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "jet_4_pt",
        "threshold": 1.301,
        "samples": 917,
        "solver_mode": "mab",
        "gini": 0.4838,
        "gini_gain": 0.0,
        "left_samples": 691,
        "right_samples": 226,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "jet_2_pt",
        "threshold": 1.2785,
        "samples": 802,
        "solver_mode": "mab",
        "gini": 0.4937,
        "gini_gain": 0.0136,
        "left_samples": 543,
        "right_samples": 259,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 0.9922,
        "samples": 731,
        "solver_mode": "mab",
        "gini": 0.4411,
        "gini_gain": 0.0053,
        "left_samples": 617,
        "right_samples": 114,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 28,
        "depth": 4,
        "feature_name": "lepton_pT",
        "threshold": 2.0818,
        "samples": 451,
        "solver_mode": "exact",
        "gini": 0.4993,
        "gini_gain": 0.0139,
        "left_samples": 433,
        "right_samples": 18,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "jet_1_eta",
        "threshold": -1.1477,
        "samples": 445,
        "solver_mode": "exact",
        "gini": 0.485,
        "gini_gain": 0.0143,
        "left_samples": 47,
        "right_samples": 398,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "jet_1_pt",
        "threshold": 1.4677,
        "samples": 439,
        "solver_mode": "exact",
        "gini": 0.4981,
        "gini_gain": 0.0144,
        "left_samples": 405,
        "right_samples": 34,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.8182,
        "samples": 400,
        "solver_mode": "exact",
        "gini": 0.4504,
        "gini_gain": 0.0263,
        "left_samples": 90,
        "right_samples": 310,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.9949,
        "samples": 212,
        "solver_mode": "exact",
        "gini": 0.2693,
        "gini_gain": 0.0209,
        "left_samples": 7,
        "right_samples": 205,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      }
    ],
    "all_splits": [
      {
        "node_id": 0,
        "depth": 0,
        "feature_name": "m_bb",
        "threshold": 1.0613,
        "samples": 20000,
        "solver_mode": "mab",
        "gini": 0.4985,
        "gini_gain": 0.0215,
        "left_samples": 14062,
        "right_samples": 5938,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 1,
        "depth": 1,
        "feature_name": "m_wbb",
        "threshold": 0.8106,
        "samples": 14062,
        "solver_mode": "mab",
        "gini": 0.482,
        "gini_gain": 0.0178,
        "left_samples": 4462,
        "right_samples": 9600,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 2,
        "depth": 1,
        "feature_name": "m_jjj",
        "threshold": 1.0633,
        "samples": 5938,
        "solver_mode": "mab",
        "gini": 0.465,
        "gini_gain": 0.0099,
        "left_samples": 4028,
        "right_samples": 1910,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 4,
        "depth": 2,
        "feature_name": "m_bb",
        "threshold": 0.689,
        "samples": 9600,
        "solver_mode": "mab",
        "gini": 0.4493,
        "gini_gain": 0.023,
        "left_samples": 2513,
        "right_samples": 7087,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 3,
        "depth": 2,
        "feature_name": "jet_1_pt",
        "threshold": 0.817,
        "samples": 4462,
        "solver_mode": "mab",
        "gini": 0.4962,
        "gini_gain": 0.0111,
        "left_samples": 2919,
        "right_samples": 1543,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 5,
        "depth": 2,
        "feature_name": "m_wwbb",
        "threshold": 0.8511,
        "samples": 4028,
        "solver_mode": "mab",
        "gini": 0.4347,
        "gini_gain": 0.0059,
        "left_samples": 1170,
        "right_samples": 2858,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 6,
        "depth": 2,
        "feature_name": "m_bb",
        "threshold": 1.6539,
        "samples": 1910,
        "solver_mode": "mab",
        "gini": 0.4982,
        "gini_gain": 0.02,
        "left_samples": 1253,
        "right_samples": 657,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 10,
        "depth": 3,
        "feature_name": "m_wwbb",
        "threshold": 1.1417,
        "samples": 7087,
        "solver_mode": "mab",
        "gini": 0.4005,
        "gini_gain": 0.0095,
        "left_samples": 5817,
        "right_samples": 1270,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 7,
        "depth": 3,
        "feature_name": "m_wwbb",
        "threshold": 0.6865,
        "samples": 2919,
        "solver_mode": "mab",
        "gini": 0.4809,
        "gini_gain": 0.0026,
        "left_samples": 1220,
        "right_samples": 1699,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 12,
        "depth": 3,
        "feature_name": "m_jlv",
        "threshold": 1.2515,
        "samples": 2858,
        "solver_mode": "mab",
        "gini": 0.4071,
        "gini_gain": 0.0149,
        "left_samples": 1941,
        "right_samples": 917,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 9,
        "depth": 3,
        "feature_name": "m_wwbb",
        "threshold": 0.881,
        "samples": 2513,
        "solver_mode": "mab",
        "gini": 0.4991,
        "gini_gain": 0.0323,
        "left_samples": 1081,
        "right_samples": 1432,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 8,
        "depth": 3,
        "feature_name": "m_wwbb",
        "threshold": 0.7892,
        "samples": 1543,
        "solver_mode": "mab",
        "gini": 0.4931,
        "gini_gain": 0.0327,
        "left_samples": 1143,
        "right_samples": 400,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 13,
        "depth": 3,
        "feature_name": "m_jj",
        "threshold": 1.4155,
        "samples": 1253,
        "solver_mode": "mab",
        "gini": 0.4964,
        "gini_gain": 0.0007,
        "left_samples": 802,
        "right_samples": 451,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 11,
        "depth": 3,
        "feature_name": "jet_1_pt",
        "threshold": 0.9189,
        "samples": 1170,
        "solver_mode": "mab",
        "gini": 0.4817,
        "gini_gain": 0.0192,
        "left_samples": 731,
        "right_samples": 439,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 14,
        "depth": 3,
        "feature_name": "lepton_pT",
        "threshold": 1.1687,
        "samples": 657,
        "solver_mode": "mab",
        "gini": 0.4434,
        "gini_gain": 0.028,
        "left_samples": 445,
        "right_samples": 212,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.9331,
        "samples": 5817,
        "solver_mode": "mab",
        "gini": 0.3696,
        "gini_gain": 0.0111,
        "left_samples": 4290,
        "right_samples": 1527,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "m_jlv",
        "threshold": 1.036,
        "samples": 1941,
        "solver_mode": "mab",
        "gini": 0.3489,
        "gini_gain": 0.0111,
        "left_samples": 1403,
        "right_samples": 538,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.7485,
        "samples": 1699,
        "solver_mode": "mab",
        "gini": 0.4672,
        "gini_gain": 0.0088,
        "left_samples": 854,
        "right_samples": 845,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 1.0913,
        "samples": 1432,
        "solver_mode": "mab",
        "gini": 0.4655,
        "gini_gain": 0.0019,
        "left_samples": 813,
        "right_samples": 619,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 1.1763,
        "samples": 1270,
        "solver_mode": "mab",
        "gini": 0.4888,
        "gini_gain": 0.0267,
        "left_samples": 653,
        "right_samples": 617,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 0.9528,
        "samples": 1220,
        "solver_mode": "mab",
        "gini": 0.4938,
        "gini_gain": 0.0067,
        "left_samples": 936,
        "right_samples": 284,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "missing_energy_phi",
        "threshold": 1.1694,
        "samples": 1143,
        "solver_mode": "mab",
        "gini": 0.4639,
        "gini_gain": -0.0,
        "left_samples": 954,
        "right_samples": 189,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "jet_1_pt",
        "threshold": 0.7182,
        "samples": 1081,
        "solver_mode": "mab",
        "gini": 0.4686,
        "gini_gain": 0.0045,
        "left_samples": 383,
        "right_samples": 698,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "jet_4_pt",
        "threshold": 1.301,
        "samples": 917,
        "solver_mode": "mab",
        "gini": 0.4838,
        "gini_gain": 0.0,
        "left_samples": 691,
        "right_samples": 226,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "jet_2_pt",
        "threshold": 1.2785,
        "samples": 802,
        "solver_mode": "mab",
        "gini": 0.4937,
        "gini_gain": 0.0136,
        "left_samples": 543,
        "right_samples": 259,
        "left_pred": "Background (0)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "m_jjj",
        "threshold": 0.9922,
        "samples": 731,
        "solver_mode": "mab",
        "gini": 0.4411,
        "gini_gain": 0.0053,
        "left_samples": 617,
        "right_samples": 114,
        "left_pred": "Background (0)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 28,
        "depth": 4,
        "feature_name": "lepton_pT",
        "threshold": 2.0818,
        "samples": 451,
        "solver_mode": "exact",
        "gini": 0.4993,
        "gini_gain": 0.0139,
        "left_samples": 433,
        "right_samples": 18,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "jet_1_eta",
        "threshold": -1.1477,
        "samples": 445,
        "solver_mode": "exact",
        "gini": 0.485,
        "gini_gain": 0.0143,
        "left_samples": 47,
        "right_samples": 398,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "jet_1_pt",
        "threshold": 1.4677,
        "samples": 439,
        "solver_mode": "exact",
        "gini": 0.4981,
        "gini_gain": 0.0144,
        "left_samples": 405,
        "right_samples": 34,
        "left_pred": "Signal (1)",
        "right_pred": "Signal (1)"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.8182,
        "samples": 400,
        "solver_mode": "exact",
        "gini": 0.4504,
        "gini_gain": 0.0263,
        "left_samples": 90,
        "right_samples": 310,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "m_wwbb",
        "threshold": 0.9949,
        "samples": 212,
        "solver_mode": "exact",
        "gini": 0.2693,
        "gini_gain": 0.0209,
        "left_samples": 7,
        "right_samples": 205,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      }
    ],
    "tree_hierarchy": {
      "node_id": 0,
      "is_leaf": false,
      "depth": 0,
      "samples": 20000,
      "class_counts": [
        9452,
        10548
      ],
      "probabilities": [
        0.4726,
        0.5274
      ],
      "predicted_class": "Signal (1)",
      "predicted_class_idx": 1,
      "gini": 0.4985,
      "solver_mode": "mab",
      "feature_idx": 25,
      "feature_name": "m_bb",
      "threshold": 1.0613,
      "bin_idx": 179,
      "left": {
        "node_id": 1,
        "is_leaf": false,
        "depth": 1,
        "samples": 14062,
        "class_counts": [
          5698,
          8364
        ],
        "probabilities": [
          0.4052,
          0.5948
        ],
        "predicted_class": "Signal (1)",
        "predicted_class_idx": 1,
        "gini": 0.482,
        "solver_mode": "mab",
        "feature_idx": 26,
        "feature_name": "m_wbb",
        "threshold": 0.8106,
        "bin_idx": 59,
        "left": {
          "node_id": 3,
          "is_leaf": false,
          "depth": 2,
          "samples": 4462,
          "class_counts": [
            2426,
            2036
          ],
          "probabilities": [
            0.5437,
            0.4563
          ],
          "predicted_class": "Background (0)",
          "predicted_class_idx": 0,
          "gini": 0.4962,
          "solver_mode": "mab",
          "feature_idx": 5,
          "feature_name": "jet_1_pt",
          "threshold": 0.817,
          "bin_idx": 105,
          "left": {
            "node_id": 7,
            "is_leaf": false,
            "depth": 3,
            "samples": 2919,
            "class_counts": [
              1745,
              1174
            ],
            "probabilities": [
              0.5978,
              0.4022
            ],
            "predicted_class": "Background (0)",
            "predicted_class_idx": 0,
            "gini": 0.4809,
            "solver_mode": "mab",
            "feature_idx": 27,
            "feature_name": "m_wwbb",
            "threshold": 0.6865,
            "bin_idx": 23,
            "left": {
              "node_id": 15,
              "is_leaf": false,
              "depth": 4,
              "samples": 1220,
              "class_counts": [
                678,
                542
              ],
              "probabilities": [
                0.5557,
                0.4443
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4938,
              "solver_mode": "mab",
              "feature_idx": 22,
              "feature_name": "m_jjj",
              "threshold": 0.9528,
              "bin_idx": 129,
              "left": {
                "node_id": 31,
                "is_leaf": true,
                "depth": 5,
                "samples": 936,
                "class_counts": [
                  550,
                  386
                ],
                "probabilities": [
                  0.5876,
                  0.4124
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4847,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 32,
                "is_leaf": true,
                "depth": 5,
                "samples": 284,
                "class_counts": [
                  128,
                  156
                ],
                "probabilities": [
                  0.4507,
                  0.5493
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4951,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0067
            },
            "right": {
              "node_id": 16,
              "is_leaf": false,
              "depth": 4,
              "samples": 1699,
              "class_counts": [
                1067,
                632
              ],
              "probabilities": [
                0.628,
                0.372
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4672,
              "solver_mode": "mab",
              "feature_idx": 27,
              "feature_name": "m_wwbb",
              "threshold": 0.7485,
              "bin_idx": 50,
              "left": {
                "node_id": 33,
                "is_leaf": true,
                "depth": 5,
                "samples": 854,
                "class_counts": [
                  480,
                  374
                ],
                "probabilities": [
                  0.5621,
                  0.4379
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4923,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 34,
                "is_leaf": true,
                "depth": 5,
                "samples": 845,
                "class_counts": [
                  587,
                  258
                ],
                "probabilities": [
                  0.6947,
                  0.3053
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4242,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0088
            },
            "gini_gain": 0.0026
          },
          "right": {
            "node_id": 8,
            "is_leaf": false,
            "depth": 3,
            "samples": 1543,
            "class_counts": [
              681,
              862
            ],
            "probabilities": [
              0.4413,
              0.5587
            ],
            "predicted_class": "Signal (1)",
            "predicted_class_idx": 1,
            "gini": 0.4931,
            "solver_mode": "mab",
            "feature_idx": 27,
            "feature_name": "m_wwbb",
            "threshold": 0.7892,
            "bin_idx": 76,
            "left": {
              "node_id": 17,
              "is_leaf": false,
              "depth": 4,
              "samples": 1143,
              "class_counts": [
                418,
                725
              ],
              "probabilities": [
                0.3657,
                0.6343
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4639,
              "solver_mode": "mab",
              "feature_idx": 4,
              "feature_name": "missing_energy_phi",
              "threshold": 1.1694,
              "bin_idx": 213,
              "left": {
                "node_id": 35,
                "is_leaf": true,
                "depth": 5,
                "samples": 954,
                "class_counts": [
                  349,
                  605
                ],
                "probabilities": [
                  0.3658,
                  0.6342
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.464,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 36,
                "is_leaf": true,
                "depth": 5,
                "samples": 189,
                "class_counts": [
                  69,
                  120
                ],
                "probabilities": [
                  0.3651,
                  0.6349
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4636,
                "solver_mode": "leaf"
              },
              "gini_gain": -0.0
            },
            "right": {
              "node_id": 18,
              "is_leaf": false,
              "depth": 4,
              "samples": 400,
              "class_counts": [
                263,
                137
              ],
              "probabilities": [
                0.6575,
                0.3425
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4504,
              "solver_mode": "exact",
              "feature_idx": 27,
              "feature_name": "m_wwbb",
              "threshold": 0.8182,
              "bin_idx": 96,
              "left": {
                "node_id": 37,
                "is_leaf": true,
                "depth": 5,
                "samples": 90,
                "class_counts": [
                  40,
                  50
                ],
                "probabilities": [
                  0.4444,
                  0.5556
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4938,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 38,
                "is_leaf": true,
                "depth": 5,
                "samples": 310,
                "class_counts": [
                  223,
                  87
                ],
                "probabilities": [
                  0.7194,
                  0.2806
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4038,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0263
            },
            "gini_gain": 0.0327
          },
          "gini_gain": 0.0111
        },
        "right": {
          "node_id": 4,
          "is_leaf": false,
          "depth": 2,
          "samples": 9600,
          "class_counts": [
            3272,
            6328
          ],
          "probabilities": [
            0.3408,
            0.6592
          ],
          "predicted_class": "Signal (1)",
          "predicted_class_idx": 1,
          "gini": 0.4493,
          "solver_mode": "mab",
          "feature_idx": 25,
          "feature_name": "m_bb",
          "threshold": 0.689,
          "bin_idx": 67,
          "left": {
            "node_id": 9,
            "is_leaf": false,
            "depth": 3,
            "samples": 2513,
            "class_counts": [
              1309,
              1204
            ],
            "probabilities": [
              0.5209,
              0.4791
            ],
            "predicted_class": "Background (0)",
            "predicted_class_idx": 0,
            "gini": 0.4991,
            "solver_mode": "mab",
            "feature_idx": 27,
            "feature_name": "m_wwbb",
            "threshold": 0.881,
            "bin_idx": 133,
            "left": {
              "node_id": 19,
              "is_leaf": false,
              "depth": 4,
              "samples": 1081,
              "class_counts": [
                405,
                676
              ],
              "probabilities": [
                0.3747,
                0.6253
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4686,
              "solver_mode": "mab",
              "feature_idx": 5,
              "feature_name": "jet_1_pt",
              "threshold": 0.7182,
              "bin_idx": 76,
              "left": {
                "node_id": 39,
                "is_leaf": true,
                "depth": 5,
                "samples": 383,
                "class_counts": [
                  168,
                  215
                ],
                "probabilities": [
                  0.4386,
                  0.5614
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4925,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 40,
                "is_leaf": true,
                "depth": 5,
                "samples": 698,
                "class_counts": [
                  237,
                  461
                ],
                "probabilities": [
                  0.3395,
                  0.6605
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4485,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0045
            },
            "right": {
              "node_id": 20,
              "is_leaf": false,
              "depth": 4,
              "samples": 1432,
              "class_counts": [
                904,
                528
              ],
              "probabilities": [
                0.6313,
                0.3687
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4655,
              "solver_mode": "mab",
              "feature_idx": 27,
              "feature_name": "m_wwbb",
              "threshold": 1.0913,
              "bin_idx": 198,
              "left": {
                "node_id": 41,
                "is_leaf": true,
                "depth": 5,
                "samples": 813,
                "class_counts": [
                  491,
                  322
                ],
                "probabilities": [
                  0.6039,
                  0.3961
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4784,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 42,
                "is_leaf": true,
                "depth": 5,
                "samples": 619,
                "class_counts": [
                  413,
                  206
                ],
                "probabilities": [
                  0.6672,
                  0.3328
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4441,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0019
            },
            "gini_gain": 0.0323
          },
          "right": {
            "node_id": 10,
            "is_leaf": false,
            "depth": 3,
            "samples": 7087,
            "class_counts": [
              1963,
              5124
            ],
            "probabilities": [
              0.277,
              0.723
            ],
            "predicted_class": "Signal (1)",
            "predicted_class_idx": 1,
            "gini": 0.4005,
            "solver_mode": "mab",
            "feature_idx": 27,
            "feature_name": "m_wwbb",
            "threshold": 1.1417,
            "bin_idx": 207,
            "left": {
              "node_id": 21,
              "is_leaf": false,
              "depth": 4,
              "samples": 5817,
              "class_counts": [
                1423,
                4394
              ],
              "probabilities": [
                0.2446,
                0.7554
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.3696,
              "solver_mode": "mab",
              "feature_idx": 27,
              "feature_name": "m_wwbb",
              "threshold": 0.9331,
              "bin_idx": 155,
              "left": {
                "node_id": 43,
                "is_leaf": true,
                "depth": 5,
                "samples": 4290,
                "class_counts": [
                  859,
                  3431
                ],
                "probabilities": [
                  0.2002,
                  0.7998
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.3203,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 44,
                "is_leaf": true,
                "depth": 5,
                "samples": 1527,
                "class_counts": [
                  564,
                  963
                ],
                "probabilities": [
                  0.3694,
                  0.6306
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4659,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0111
            },
            "right": {
              "node_id": 22,
              "is_leaf": false,
              "depth": 4,
              "samples": 1270,
              "class_counts": [
                540,
                730
              ],
              "probabilities": [
                0.4252,
                0.5748
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4888,
              "solver_mode": "mab",
              "feature_idx": 22,
              "feature_name": "m_jjj",
              "threshold": 1.1763,
              "bin_idx": 213,
              "left": {
                "node_id": 45,
                "is_leaf": true,
                "depth": 5,
                "samples": 653,
                "class_counts": [
                  351,
                  302
                ],
                "probabilities": [
                  0.5375,
                  0.4625
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4972,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 46,
                "is_leaf": true,
                "depth": 5,
                "samples": 617,
                "class_counts": [
                  189,
                  428
                ],
                "probabilities": [
                  0.3063,
                  0.6937
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.425,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0267
            },
            "gini_gain": 0.0095
          },
          "gini_gain": 0.023
        },
        "gini_gain": 0.0178
      },
      "right": {
        "node_id": 2,
        "is_leaf": false,
        "depth": 1,
        "samples": 5938,
        "class_counts": [
          3754,
          2184
        ],
        "probabilities": [
          0.6322,
          0.3678
        ],
        "predicted_class": "Background (0)",
        "predicted_class_idx": 0,
        "gini": 0.465,
        "solver_mode": "mab",
        "feature_idx": 22,
        "feature_name": "m_jjj",
        "threshold": 1.0633,
        "bin_idx": 184,
        "left": {
          "node_id": 5,
          "is_leaf": false,
          "depth": 2,
          "samples": 4028,
          "class_counts": [
            2742,
            1286
          ],
          "probabilities": [
            0.6807,
            0.3193
          ],
          "predicted_class": "Background (0)",
          "predicted_class_idx": 0,
          "gini": 0.4347,
          "solver_mode": "mab",
          "feature_idx": 27,
          "feature_name": "m_wwbb",
          "threshold": 0.8511,
          "bin_idx": 117,
          "left": {
            "node_id": 11,
            "is_leaf": false,
            "depth": 3,
            "samples": 1170,
            "class_counts": [
              697,
              473
            ],
            "probabilities": [
              0.5957,
              0.4043
            ],
            "predicted_class": "Background (0)",
            "predicted_class_idx": 0,
            "gini": 0.4817,
            "solver_mode": "mab",
            "feature_idx": 5,
            "feature_name": "jet_1_pt",
            "threshold": 0.9189,
            "bin_idx": 135,
            "left": {
              "node_id": 23,
              "is_leaf": false,
              "depth": 4,
              "samples": 731,
              "class_counts": [
                491,
                240
              ],
              "probabilities": [
                0.6717,
                0.3283
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4411,
              "solver_mode": "mab",
              "feature_idx": 22,
              "feature_name": "m_jjj",
              "threshold": 0.9922,
              "bin_idx": 153,
              "left": {
                "node_id": 47,
                "is_leaf": true,
                "depth": 5,
                "samples": 617,
                "class_counts": [
                  428,
                  189
                ],
                "probabilities": [
                  0.6937,
                  0.3063
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.425,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 48,
                "is_leaf": true,
                "depth": 5,
                "samples": 114,
                "class_counts": [
                  63,
                  51
                ],
                "probabilities": [
                  0.5526,
                  0.4474
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4945,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0053
            },
            "right": {
              "node_id": 24,
              "is_leaf": false,
              "depth": 4,
              "samples": 439,
              "class_counts": [
                206,
                233
              ],
              "probabilities": [
                0.4692,
                0.5308
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4981,
              "solver_mode": "exact",
              "feature_idx": 5,
              "feature_name": "jet_1_pt",
              "threshold": 1.4677,
              "bin_idx": 225,
              "left": {
                "node_id": 49,
                "is_leaf": true,
                "depth": 5,
                "samples": 405,
                "class_counts": [
                  200,
                  205
                ],
                "probabilities": [
                  0.4938,
                  0.5062
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4999,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 50,
                "is_leaf": true,
                "depth": 5,
                "samples": 34,
                "class_counts": [
                  6,
                  28
                ],
                "probabilities": [
                  0.1765,
                  0.8235
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.2907,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0144
            },
            "gini_gain": 0.0192
          },
          "right": {
            "node_id": 12,
            "is_leaf": false,
            "depth": 3,
            "samples": 2858,
            "class_counts": [
              2045,
              813
            ],
            "probabilities": [
              0.7155,
              0.2845
            ],
            "predicted_class": "Background (0)",
            "predicted_class_idx": 0,
            "gini": 0.4071,
            "solver_mode": "mab",
            "feature_idx": 24,
            "feature_name": "m_jlv",
            "threshold": 1.2515,
            "bin_idx": 209,
            "left": {
              "node_id": 25,
              "is_leaf": false,
              "depth": 4,
              "samples": 1941,
              "class_counts": [
                1504,
                437
              ],
              "probabilities": [
                0.7749,
                0.2251
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.3489,
              "solver_mode": "mab",
              "feature_idx": 24,
              "feature_name": "m_jlv",
              "threshold": 1.036,
              "bin_idx": 168,
              "left": {
                "node_id": 51,
                "is_leaf": true,
                "depth": 5,
                "samples": 1403,
                "class_counts": [
                  1152,
                  251
                ],
                "probabilities": [
                  0.8211,
                  0.1789
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.2938,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 52,
                "is_leaf": true,
                "depth": 5,
                "samples": 538,
                "class_counts": [
                  352,
                  186
                ],
                "probabilities": [
                  0.6543,
                  0.3457
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4524,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0111
            },
            "right": {
              "node_id": 26,
              "is_leaf": false,
              "depth": 4,
              "samples": 917,
              "class_counts": [
                541,
                376
              ],
              "probabilities": [
                0.59,
                0.41
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.4838,
              "solver_mode": "mab",
              "feature_idx": 17,
              "feature_name": "jet_4_pt",
              "threshold": 1.301,
              "bin_idx": 201,
              "left": {
                "node_id": 53,
                "is_leaf": true,
                "depth": 5,
                "samples": 691,
                "class_counts": [
                  409,
                  282
                ],
                "probabilities": [
                  0.5919,
                  0.4081
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4831,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 54,
                "is_leaf": true,
                "depth": 5,
                "samples": 226,
                "class_counts": [
                  132,
                  94
                ],
                "probabilities": [
                  0.5841,
                  0.4159
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4859,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0
            },
            "gini_gain": 0.0149
          },
          "gini_gain": 0.0059
        },
        "right": {
          "node_id": 6,
          "is_leaf": false,
          "depth": 2,
          "samples": 1910,
          "class_counts": [
            1012,
            898
          ],
          "probabilities": [
            0.5298,
            0.4702
          ],
          "predicted_class": "Background (0)",
          "predicted_class_idx": 0,
          "gini": 0.4982,
          "solver_mode": "mab",
          "feature_idx": 25,
          "feature_name": "m_bb",
          "threshold": 1.6539,
          "bin_idx": 233,
          "left": {
            "node_id": 13,
            "is_leaf": false,
            "depth": 3,
            "samples": 1253,
            "class_counts": [
              573,
              680
            ],
            "probabilities": [
              0.4573,
              0.5427
            ],
            "predicted_class": "Signal (1)",
            "predicted_class_idx": 1,
            "gini": 0.4964,
            "solver_mode": "mab",
            "feature_idx": 21,
            "feature_name": "m_jj",
            "threshold": 1.4155,
            "bin_idx": 227,
            "left": {
              "node_id": 27,
              "is_leaf": false,
              "depth": 4,
              "samples": 802,
              "class_counts": [
                356,
                446
              ],
              "probabilities": [
                0.4439,
                0.5561
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4937,
              "solver_mode": "mab",
              "feature_idx": 9,
              "feature_name": "jet_2_pt",
              "threshold": 1.2785,
              "bin_idx": 202,
              "left": {
                "node_id": 55,
                "is_leaf": true,
                "depth": 5,
                "samples": 543,
                "class_counts": [
                  272,
                  271
                ],
                "probabilities": [
                  0.5009,
                  0.4991
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.5,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 56,
                "is_leaf": true,
                "depth": 5,
                "samples": 259,
                "class_counts": [
                  84,
                  175
                ],
                "probabilities": [
                  0.3243,
                  0.6757
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4383,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0136
            },
            "right": {
              "node_id": 28,
              "is_leaf": false,
              "depth": 4,
              "samples": 451,
              "class_counts": [
                217,
                234
              ],
              "probabilities": [
                0.4812,
                0.5188
              ],
              "predicted_class": "Signal (1)",
              "predicted_class_idx": 1,
              "gini": 0.4993,
              "solver_mode": "exact",
              "feature_idx": 0,
              "feature_name": "lepton_pT",
              "threshold": 2.0818,
              "bin_idx": 243,
              "left": {
                "node_id": 57,
                "is_leaf": true,
                "depth": 5,
                "samples": 433,
                "class_counts": [
                  201,
                  232
                ],
                "probabilities": [
                  0.4642,
                  0.5358
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4974,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 58,
                "is_leaf": true,
                "depth": 5,
                "samples": 18,
                "class_counts": [
                  16,
                  2
                ],
                "probabilities": [
                  0.8889,
                  0.1111
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.1975,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0139
            },
            "gini_gain": 0.0007
          },
          "right": {
            "node_id": 14,
            "is_leaf": false,
            "depth": 3,
            "samples": 657,
            "class_counts": [
              439,
              218
            ],
            "probabilities": [
              0.6682,
              0.3318
            ],
            "predicted_class": "Background (0)",
            "predicted_class_idx": 0,
            "gini": 0.4434,
            "solver_mode": "mab",
            "feature_idx": 0,
            "feature_name": "lepton_pT",
            "threshold": 1.1687,
            "bin_idx": 183,
            "left": {
              "node_id": 29,
              "is_leaf": false,
              "depth": 4,
              "samples": 445,
              "class_counts": [
                261,
                184
              ],
              "probabilities": [
                0.5865,
                0.4135
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.485,
              "solver_mode": "exact",
              "feature_idx": 6,
              "feature_name": "jet_1_eta",
              "threshold": -1.1477,
              "bin_idx": 31,
              "left": {
                "node_id": 59,
                "is_leaf": true,
                "depth": 5,
                "samples": 47,
                "class_counts": [
                  16,
                  31
                ],
                "probabilities": [
                  0.3404,
                  0.6596
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4491,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 60,
                "is_leaf": true,
                "depth": 5,
                "samples": 398,
                "class_counts": [
                  245,
                  153
                ],
                "probabilities": [
                  0.6156,
                  0.3844
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.4733,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0143
            },
            "right": {
              "node_id": 30,
              "is_leaf": false,
              "depth": 4,
              "samples": 212,
              "class_counts": [
                178,
                34
              ],
              "probabilities": [
                0.8396,
                0.1604
              ],
              "predicted_class": "Background (0)",
              "predicted_class_idx": 0,
              "gini": 0.2693,
              "solver_mode": "exact",
              "feature_idx": 27,
              "feature_name": "m_wwbb",
              "threshold": 0.9949,
              "bin_idx": 175,
              "left": {
                "node_id": 61,
                "is_leaf": true,
                "depth": 5,
                "samples": 7,
                "class_counts": [
                  2,
                  5
                ],
                "probabilities": [
                  0.2857,
                  0.7143
                ],
                "predicted_class": "Signal (1)",
                "predicted_class_idx": 1,
                "gini": 0.4082,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 62,
                "is_leaf": true,
                "depth": 5,
                "samples": 205,
                "class_counts": [
                  176,
                  29
                ],
                "probabilities": [
                  0.8585,
                  0.1415
                ],
                "predicted_class": "Background (0)",
                "predicted_class_idx": 0,
                "gini": 0.2429,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0209
            },
            "gini_gain": 0.028
          },
          "gini_gain": 0.02
        },
        "gini_gain": 0.0099
      },
      "gini_gain": 0.0215
    },
    "feature_contributions": [
      {
        "rank": 1,
        "feature_idx": 25,
        "feature_name": "m_bb",
        "mab_importance_pct": 9.68,
        "rf_importance_pct": 16.11,
        "mutual_info_pct": 29.84,
        "mutual_info_raw": 0.0503,
        "split_count": 3,
        "stats": {
          "feature_idx": 25,
          "feature_name": "m_bb",
          "min": 0.06289999932050705,
          "max": 8.25510025024414,
          "mean": 0.9732000231742859,
          "std": 0.5206000208854675,
          "unique_values": 997
        },
        "composite_score": 16.97,
        "cumulative_pct": 16.97
      },
      {
        "rank": 2,
        "feature_idx": 27,
        "feature_name": "m_wwbb",
        "mab_importance_pct": 32.26,
        "rf_importance_pct": 8.01,
        "mutual_info_pct": 4.62,
        "mutual_info_raw": 0.0078,
        "split_count": 10,
        "stats": {
          "feature_idx": 27,
          "feature_name": "m_wwbb",
          "min": 0.4032000005245209,
          "max": 6.015600204467773,
          "mean": 0.9581999778747559,
          "std": 0.310699999332428,
          "unique_values": 999
        },
        "composite_score": 16.86,
        "cumulative_pct": 33.84
      },
      {
        "rank": 3,
        "feature_idx": 22,
        "feature_name": "m_jjj",
        "mab_importance_pct": 12.9,
        "rf_importance_pct": 6.63,
        "mutual_info_pct": 11.93,
        "mutual_info_raw": 0.0201,
        "split_count": 4,
        "stats": {
          "feature_idx": 22,
          "feature_name": "m_jjj",
          "min": 0.37720000743865967,
          "max": 7.701600074768066,
          "mean": 1.0233999490737915,
          "std": 0.36820000410079956,
          "unique_values": 997
        },
        "composite_score": 10.46,
        "cumulative_pct": 44.3
      },
      {
        "rank": 4,
        "feature_idx": 5,
        "feature_name": "jet_1_pt",
        "mab_importance_pct": 12.9,
        "rf_importance_pct": 6.27,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 4,
        "stats": {
          "feature_idx": 5,
          "feature_name": "jet_1_pt",
          "min": 0.18359999358654022,
          "max": 7.064700126647949,
          "mean": 0.9861999750137329,
          "std": 0.47920000553131104,
          "unique_values": 967
        },
        "composite_score": 7.35,
        "cumulative_pct": 51.65
      },
      {
        "rank": 5,
        "feature_idx": 24,
        "feature_name": "m_jlv",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 7.61,
        "mutual_info_pct": 6.51,
        "mutual_info_raw": 0.011,
        "split_count": 2,
        "stats": {
          "feature_idx": 24,
          "feature_name": "m_jlv",
          "min": 0.3709000051021576,
          "max": 5.819499969482422,
          "mean": 1.0077999830245972,
          "std": 0.39959999918937683,
          "unique_values": 999
        },
        "composite_score": 6.87,
        "cumulative_pct": 58.52
      },
      {
        "rank": 6,
        "feature_idx": 26,
        "feature_name": "m_wbb",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 8.39,
        "mutual_info_pct": 7.76,
        "mutual_info_raw": 0.0131,
        "split_count": 1,
        "stats": {
          "feature_idx": 26,
          "feature_name": "m_wbb",
          "min": 0.3625999987125397,
          "max": 7.31820011138916,
          "mean": 1.0325000286102295,
          "std": 0.3637999892234802,
          "unique_values": 1000
        },
        "composite_score": 6.17,
        "cumulative_pct": 64.69
      },
      {
        "rank": 7,
        "feature_idx": 0,
        "feature_name": "lepton_pT",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 3.15,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 2,
        "stats": {
          "feature_idx": 0,
          "feature_name": "lepton_pT",
          "min": 0.27469998598098755,
          "max": 7.00029993057251,
          "mean": 0.9898999929428101,
          "std": 0.5583999752998352,
          "unique_values": 949
        },
        "composite_score": 3.68,
        "cumulative_pct": 68.37
      },
      {
        "rank": 8,
        "feature_idx": 4,
        "feature_name": "missing_energy_phi",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 1.84,
        "mutual_info_pct": 4.75,
        "mutual_info_raw": 0.008,
        "split_count": 1,
        "stats": {
          "feature_idx": 4,
          "feature_name": "missing_energy_phi",
          "min": -1.743899941444397,
          "max": 1.7431999444961548,
          "mean": -0.008700000122189522,
          "std": 1.0068999528884888,
          "unique_values": 999
        },
        "composite_score": 3.12,
        "cumulative_pct": 71.49
      },
      {
        "rank": 9,
        "feature_idx": 17,
        "feature_name": "jet_4_pt",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 2.2,
        "mutual_info_pct": 3.93,
        "mutual_info_raw": 0.0066,
        "split_count": 1,
        "stats": {
          "feature_idx": 17,
          "feature_name": "jet_4_pt",
          "min": 0.3653999865055084,
          "max": 6.067699909210205,
          "mean": 0.9878000020980835,
          "std": 0.505299985408783,
          "unique_values": 918
        },
        "composite_score": 3.04,
        "cumulative_pct": 74.53
      },
      {
        "rank": 10,
        "feature_idx": 3,
        "feature_name": "missing_energy_magnitude",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 4.46,
        "mutual_info_pct": 5.16,
        "mutual_info_raw": 0.0087,
        "split_count": 0,
        "stats": {
          "feature_idx": 3,
          "feature_name": "missing_energy_magnitude",
          "min": 0.009999999776482582,
          "max": 7.998700141906738,
          "mean": 0.9908999800682068,
          "std": 0.6031000018119812,
          "unique_values": 1000
        },
        "composite_score": 2.85,
        "cumulative_pct": 77.39
      },
      {
        "rank": 11,
        "feature_idx": 21,
        "feature_name": "m_jj",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 2.85,
        "mutual_info_pct": 1.93,
        "mutual_info_raw": 0.0032,
        "split_count": 1,
        "stats": {
          "feature_idx": 21,
          "feature_name": "m_jj",
          "min": 0.11089999973773956,
          "max": 15.01159954071045,
          "mean": 1.0328999757766724,
          "std": 0.6406000256538391,
          "unique_values": 1000
        },
        "composite_score": 2.77,
        "cumulative_pct": 80.16
      },
      {
        "rank": 12,
        "feature_idx": 9,
        "feature_name": "jet_2_pt",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 3.52,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 1,
        "stats": {
          "feature_idx": 9,
          "feature_name": "jet_2_pt",
          "min": 0.1899999976158142,
          "max": 7.577099800109863,
          "mean": 0.9932000041007996,
          "std": 0.49939998984336853,
          "unique_values": 953
        },
        "composite_score": 2.52,
        "cumulative_pct": 82.68
      },
      {
        "rank": 13,
        "feature_idx": 6,
        "feature_name": "jet_1_eta",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 2.24,
        "mutual_info_pct": 1.36,
        "mutual_info_raw": 0.0023,
        "split_count": 1,
        "stats": {
          "feature_idx": 6,
          "feature_name": "jet_1_eta",
          "min": -2.9628000259399414,
          "max": 2.9686999320983887,
          "mean": 0.004399999976158142,
          "std": 1.013800024986267,
          "unique_values": 854
        },
        "composite_score": 2.42,
        "cumulative_pct": 85.1
      },
      {
        "rank": 14,
        "feature_idx": 2,
        "feature_name": "lepton_phi",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.0,
        "mutual_info_pct": 4.42,
        "mutual_info_raw": 0.0075,
        "split_count": 0,
        "stats": {
          "feature_idx": 2,
          "feature_name": "lepton_phi",
          "min": -1.7424999475479126,
          "max": 1.7426999807357788,
          "mean": -0.0032999999821186066,
          "std": 1.006700038909912,
          "unique_values": 935
        },
        "composite_score": 1.8,
        "cumulative_pct": 86.9
      },
      {
        "rank": 15,
        "feature_idx": 18,
        "feature_name": "jet_4_eta",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.37,
        "mutual_info_pct": 3.3,
        "mutual_info_raw": 0.0056,
        "split_count": 0,
        "stats": {
          "feature_idx": 18,
          "feature_name": "jet_4_eta",
          "min": -2.497299909591675,
          "max": 2.497999906539917,
          "mean": -0.009800000116229057,
          "std": 1.010599970817566,
          "unique_values": 887
        },
        "composite_score": 1.65,
        "cumulative_pct": 88.55
      },
      {
        "rank": 16,
        "feature_idx": 16,
        "feature_name": "jet_3_b-tag",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.3,
        "mutual_info_pct": 5.13,
        "mutual_info_raw": 0.0087,
        "split_count": 0,
        "stats": {
          "feature_idx": 16,
          "feature_name": "jet_3_b-tag",
          "min": 0.0,
          "max": 2.5481998920440674,
          "mean": 1.0048999786376953,
          "std": 1.194599986076355,
          "unique_values": 3
        },
        "composite_score": 1.39,
        "cumulative_pct": 89.94
      },
      {
        "rank": 17,
        "feature_idx": 12,
        "feature_name": "jet_2_b-tag",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.3,
        "mutual_info_pct": 4.36,
        "mutual_info_raw": 0.0074,
        "split_count": 0,
        "stats": {
          "feature_idx": 12,
          "feature_name": "jet_2_b-tag",
          "min": 0.0,
          "max": 2.214900016784668,
          "mean": 1.0008000135421753,
          "std": 1.048699975013733,
          "unique_values": 3
        },
        "composite_score": 1.2,
        "cumulative_pct": 91.14
      },
      {
        "rank": 18,
        "feature_idx": 11,
        "feature_name": "jet_2_phi",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.27,
        "mutual_info_pct": 0.83,
        "mutual_info_raw": 0.0014,
        "split_count": 0,
        "stats": {
          "feature_idx": 11,
          "feature_name": "jet_2_phi",
          "min": -1.742400050163269,
          "max": 1.7431999444961548,
          "mean": 0.007400000002235174,
          "std": 1.013100028038025,
          "unique_values": 929
        },
        "composite_score": 1.0,
        "cumulative_pct": 92.14
      },
      {
        "rank": 19,
        "feature_idx": 1,
        "feature_name": "lepton_eta",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.08,
        "mutual_info_pct": 1.01,
        "mutual_info_raw": 0.0017,
        "split_count": 0,
        "stats": {
          "feature_idx": 1,
          "feature_name": "lepton_eta",
          "min": -2.4282000064849854,
          "max": 2.430999994277954,
          "mean": -0.006800000090152025,
          "std": 1.0053000450134277,
          "unique_values": 883
        },
        "composite_score": 0.98,
        "cumulative_pct": 93.12
      },
      {
        "rank": 20,
        "feature_idx": 23,
        "feature_name": "m_lv",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.76,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 23,
          "feature_name": "m_lv",
          "min": 0.41440001130104065,
          "max": 3.863300085067749,
          "mean": 1.048699975013733,
          "std": 0.1598999947309494,
          "unique_values": 976
        },
        "composite_score": 0.97,
        "cumulative_pct": 94.09
      },
      {
        "rank": 21,
        "feature_idx": 8,
        "feature_name": "jet_1_b-tag",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.7,
        "mutual_info_pct": 2.78,
        "mutual_info_raw": 0.0047,
        "split_count": 0,
        "stats": {
          "feature_idx": 8,
          "feature_name": "jet_1_b-tag",
          "min": 0.0,
          "max": 2.173099994659424,
          "mean": 0.9915000200271606,
          "std": 1.027400016784668,
          "unique_values": 3
        },
        "composite_score": 0.94,
        "cumulative_pct": 95.03
      },
      {
        "rank": 22,
        "feature_idx": 13,
        "feature_name": "jet_3_pt",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.61,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 13,
          "feature_name": "jet_3_pt",
          "min": 0.2639999985694885,
          "max": 6.5233001708984375,
          "mean": 0.9954000115394592,
          "std": 0.48989999294281006,
          "unique_values": 943
        },
        "composite_score": 0.91,
        "cumulative_pct": 95.94
      },
      {
        "rank": 23,
        "feature_idx": 7,
        "feature_name": "jet_1_phi",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.47,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 7,
          "feature_name": "jet_1_phi",
          "min": -1.7411999702453613,
          "max": 1.7415000200271606,
          "mean": 0.010999999940395355,
          "std": 1.002500057220459,
          "unique_values": 915
        },
        "composite_score": 0.86,
        "cumulative_pct": 96.8
      },
      {
        "rank": 24,
        "feature_idx": 14,
        "feature_name": "jet_3_eta",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.31,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 14,
          "feature_name": "jet_3_eta",
          "min": -2.728800058364868,
          "max": 2.727299928665161,
          "mean": 0.005400000140070915,
          "std": 1.0115000009536743,
          "unique_values": 887
        },
        "composite_score": 0.81,
        "cumulative_pct": 97.61
      },
      {
        "rank": 25,
        "feature_idx": 10,
        "feature_name": "jet_2_eta",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.0,
        "mutual_info_pct": 0.39,
        "mutual_info_raw": 0.0007,
        "split_count": 0,
        "stats": {
          "feature_idx": 10,
          "feature_name": "jet_2_eta",
          "min": -2.913100004196167,
          "max": 2.91129994392395,
          "mean": 0.004699999932199717,
          "std": 1.0099999904632568,
          "unique_values": 864
        },
        "composite_score": 0.8,
        "cumulative_pct": 98.41
      },
      {
        "rank": 26,
        "feature_idx": 15,
        "feature_name": "jet_3_phi",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.15,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 15,
          "feature_name": "jet_3_phi",
          "min": -1.7421000003814697,
          "max": 1.742900013923645,
          "mean": -0.009600000455975533,
          "std": 1.0038000345230103,
          "unique_values": 922
        },
        "composite_score": 0.75,
        "cumulative_pct": 99.16
      },
      {
        "rank": 27,
        "feature_idx": 19,
        "feature_name": "jet_4_phi",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.08,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 19,
          "feature_name": "jet_4_phi",
          "min": -1.7421000003814697,
          "max": 1.743399977684021,
          "mean": 0.006899999920278788,
          "std": 1.0083999633789062,
          "unique_values": 928
        },
        "composite_score": 0.73,
        "cumulative_pct": 99.89
      },
      {
        "rank": 28,
        "feature_idx": 20,
        "feature_name": "jet_4_b-tag",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.31,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 20,
          "feature_name": "jet_4_b-tag",
          "min": 0.0,
          "max": 3.1019999980926514,
          "mean": 0.9894999861717224,
          "std": 1.3947999477386475,
          "unique_values": 3
        },
        "composite_score": 0.11,
        "cumulative_pct": 100.0
      }
    ]
  },
  "synthetic": {
    "dataset_name": "Synthetic Tabular Benchmark",
    "n_samples": 15000,
    "n_features": 20,
    "n_classes": 2,
    "class_names": [
      "Class 0",
      "Class 1"
    ],
    "feature_names": [
      "Feature_00",
      "Feature_01",
      "Feature_02",
      "Feature_03",
      "Feature_04",
      "Feature_05",
      "Feature_06",
      "Feature_07",
      "Feature_08",
      "Feature_09",
      "Feature_10",
      "Feature_11",
      "Feature_12",
      "Feature_13",
      "Feature_14",
      "Feature_15",
      "Feature_16",
      "Feature_17",
      "Feature_18",
      "Feature_19"
    ],
    "performance": {
      "mab_fit_time_sec": 0.3502,
      "std_dt_fit_time_sec": 0.6439,
      "speedup_ratio": 1.84,
      "total_nodes": 63,
      "tree_depth": 5,
      "splits_by_mode": {
        "exact": 8,
        "mab": 23
      },
      "samples_evaluated": 74645,
      "theoretical_full_scan_samples": 465000,
      "sample_evaluation_reduction_pct": 83.9
    },
    "top_features": {
      "top_3": [
        "Feature_14",
        "Feature_16",
        "Feature_19"
      ],
      "top_5": [
        "Feature_14",
        "Feature_16",
        "Feature_19",
        "Feature_02",
        "Feature_11"
      ],
      "top_5_cumulative_pct": 49.48
    },
    "root_split": {
      "node_id": 0,
      "depth": 0,
      "feature_name": "Feature_14",
      "threshold": -0.1747,
      "samples": 15000,
      "solver_mode": "mab",
      "gini": 0.5,
      "gini_gain": 0.0993,
      "left_samples": 6914,
      "right_samples": 8086,
      "left_pred": "Class 1",
      "right_pred": "Class 0"
    },
    "final_splits_count": 16,
    "final_splits": [
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "Feature_11",
        "threshold": -0.5412,
        "samples": 4797,
        "solver_mode": "mab",
        "gini": 0.1693,
        "gini_gain": 0.01,
        "left_samples": 1876,
        "right_samples": 2921,
        "left_pred": "Class 0",
        "right_pred": "Class 0"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "Feature_14",
        "threshold": -1.2667,
        "samples": 3285,
        "solver_mode": "mab",
        "gini": 0.1271,
        "gini_gain": 0.0038,
        "left_samples": 2702,
        "right_samples": 583,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "Feature_00",
        "threshold": -0.8409,
        "samples": 1098,
        "solver_mode": "mab",
        "gini": 0.3182,
        "gini_gain": 0.0409,
        "left_samples": 148,
        "right_samples": 950,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "Feature_18",
        "threshold": 4.6398,
        "samples": 913,
        "solver_mode": "mab",
        "gini": 0.4702,
        "gini_gain": 0.0421,
        "left_samples": 534,
        "right_samples": 379,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "Feature_09",
        "threshold": 3.4319,
        "samples": 767,
        "solver_mode": "mab",
        "gini": 0.2287,
        "gini_gain": 0.0401,
        "left_samples": 718,
        "right_samples": 49,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "Feature_17",
        "threshold": 0.1068,
        "samples": 753,
        "solver_mode": "mab",
        "gini": 0.0365,
        "gini_gain": 0.0069,
        "left_samples": 740,
        "right_samples": 13,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 28,
        "depth": 4,
        "feature_name": "Feature_01",
        "threshold": -1.1354,
        "samples": 674,
        "solver_mode": "mab",
        "gini": 0.4611,
        "gini_gain": 0.0989,
        "left_samples": 244,
        "right_samples": 430,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "Feature_17",
        "threshold": -0.7008,
        "samples": 582,
        "solver_mode": "mab",
        "gini": 0.3654,
        "gini_gain": 0.0379,
        "left_samples": 156,
        "right_samples": 426,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "Feature_02",
        "threshold": 4.5627,
        "samples": 469,
        "solver_mode": "exact",
        "gini": 0.4222,
        "gini_gain": 0.1205,
        "left_samples": 334,
        "right_samples": 135,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": -2.3905,
        "samples": 355,
        "solver_mode": "exact",
        "gini": 0.4457,
        "gini_gain": 0.0858,
        "left_samples": 130,
        "right_samples": 225,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "Feature_12",
        "threshold": -0.7702,
        "samples": 310,
        "solver_mode": "exact",
        "gini": 0.2248,
        "gini_gain": 0.022,
        "left_samples": 62,
        "right_samples": 248,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": -0.6381,
        "samples": 290,
        "solver_mode": "exact",
        "gini": 0.3282,
        "gini_gain": 0.0964,
        "left_samples": 225,
        "right_samples": 65,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": 0.5029,
        "samples": 270,
        "solver_mode": "exact",
        "gini": 0.4815,
        "gini_gain": 0.0707,
        "left_samples": 122,
        "right_samples": 148,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "Feature_00",
        "threshold": -3.9403,
        "samples": 266,
        "solver_mode": "exact",
        "gini": 0.3452,
        "gini_gain": 0.0859,
        "left_samples": 41,
        "right_samples": 225,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "Feature_12",
        "threshold": 0.8124,
        "samples": 133,
        "solver_mode": "exact",
        "gini": 0.4986,
        "gini_gain": 0.2139,
        "left_samples": 56,
        "right_samples": 77,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "Feature_06",
        "threshold": 1.0034,
        "samples": 38,
        "solver_mode": "exact",
        "gini": 0.3878,
        "gini_gain": 0.2452,
        "left_samples": 31,
        "right_samples": 7,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      }
    ],
    "all_splits": [
      {
        "node_id": 0,
        "depth": 0,
        "feature_name": "Feature_14",
        "threshold": -0.1747,
        "samples": 15000,
        "solver_mode": "mab",
        "gini": 0.5,
        "gini_gain": 0.0993,
        "left_samples": 6914,
        "right_samples": 8086,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 2,
        "depth": 1,
        "feature_name": "Feature_02",
        "threshold": -3.0862,
        "samples": 8086,
        "solver_mode": "mab",
        "gini": 0.4155,
        "gini_gain": 0.0858,
        "left_samples": 1436,
        "right_samples": 6650,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 1,
        "depth": 1,
        "feature_name": "Feature_16",
        "threshold": -0.8688,
        "samples": 6914,
        "solver_mode": "mab",
        "gini": 0.3833,
        "gini_gain": 0.061,
        "left_samples": 1480,
        "right_samples": 5434,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 6,
        "depth": 2,
        "feature_name": "Feature_18",
        "threshold": 2.924,
        "samples": 6650,
        "solver_mode": "mab",
        "gini": 0.3178,
        "gini_gain": 0.0479,
        "left_samples": 5471,
        "right_samples": 1179,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 4,
        "depth": 2,
        "feature_name": "Feature_00",
        "threshold": -1.5993,
        "samples": 5434,
        "solver_mode": "mab",
        "gini": 0.2786,
        "gini_gain": 0.0369,
        "left_samples": 1051,
        "right_samples": 4383,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 3,
        "depth": 2,
        "feature_name": "Feature_11",
        "threshold": -0.6411,
        "samples": 1480,
        "solver_mode": "mab",
        "gini": 0.4826,
        "gini_gain": 0.1458,
        "left_samples": 580,
        "right_samples": 900,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 5,
        "depth": 2,
        "feature_name": "Feature_19",
        "threshold": 0.3791,
        "samples": 1436,
        "solver_mode": "mab",
        "gini": 0.3846,
        "gini_gain": 0.1292,
        "left_samples": 645,
        "right_samples": 791,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 13,
        "depth": 3,
        "feature_name": "Feature_16",
        "threshold": 2.8304,
        "samples": 5471,
        "solver_mode": "mab",
        "gini": 0.2207,
        "gini_gain": 0.0155,
        "left_samples": 4797,
        "right_samples": 674,
        "left_pred": "Class 0",
        "right_pred": "Class 0"
      },
      {
        "node_id": 10,
        "depth": 3,
        "feature_name": "Feature_14",
        "threshold": -0.8783,
        "samples": 4383,
        "solver_mode": "mab",
        "gini": 0.1813,
        "gini_gain": 0.0063,
        "left_samples": 3285,
        "right_samples": 1098,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 14,
        "depth": 3,
        "feature_name": "Feature_19",
        "threshold": 0.1547,
        "samples": 1179,
        "solver_mode": "mab",
        "gini": 0.498,
        "gini_gain": 0.056,
        "left_samples": 913,
        "right_samples": 266,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 9,
        "depth": 3,
        "feature_name": "Feature_08",
        "threshold": 0.3867,
        "samples": 1051,
        "solver_mode": "mab",
        "gini": 0.4938,
        "gini_gain": 0.1031,
        "left_samples": 469,
        "right_samples": 582,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 8,
        "depth": 3,
        "feature_name": "Feature_06",
        "threshold": -0.3397,
        "samples": 900,
        "solver_mode": "mab",
        "gini": 0.3078,
        "gini_gain": 0.0392,
        "left_samples": 133,
        "right_samples": 767,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 12,
        "depth": 3,
        "feature_name": "Feature_16",
        "threshold": -1.347,
        "samples": 791,
        "solver_mode": "mab",
        "gini": 0.0588,
        "gini_gain": 0.0054,
        "left_samples": 38,
        "right_samples": 753,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 11,
        "depth": 3,
        "feature_name": "Feature_10",
        "threshold": 1.9685,
        "samples": 645,
        "solver_mode": "mab",
        "gini": 0.4966,
        "gini_gain": 0.1037,
        "left_samples": 290,
        "right_samples": 355,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 7,
        "depth": 3,
        "feature_name": "Feature_11",
        "threshold": -1.8064,
        "samples": 580,
        "solver_mode": "mab",
        "gini": 0.3818,
        "gini_gain": 0.0375,
        "left_samples": 310,
        "right_samples": 270,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 27,
        "depth": 4,
        "feature_name": "Feature_11",
        "threshold": -0.5412,
        "samples": 4797,
        "solver_mode": "mab",
        "gini": 0.1693,
        "gini_gain": 0.01,
        "left_samples": 1876,
        "right_samples": 2921,
        "left_pred": "Class 0",
        "right_pred": "Class 0"
      },
      {
        "node_id": 21,
        "depth": 4,
        "feature_name": "Feature_14",
        "threshold": -1.2667,
        "samples": 3285,
        "solver_mode": "mab",
        "gini": 0.1271,
        "gini_gain": 0.0038,
        "left_samples": 2702,
        "right_samples": 583,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 22,
        "depth": 4,
        "feature_name": "Feature_00",
        "threshold": -0.8409,
        "samples": 1098,
        "solver_mode": "mab",
        "gini": 0.3182,
        "gini_gain": 0.0409,
        "left_samples": 148,
        "right_samples": 950,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 29,
        "depth": 4,
        "feature_name": "Feature_18",
        "threshold": 4.6398,
        "samples": 913,
        "solver_mode": "mab",
        "gini": 0.4702,
        "gini_gain": 0.0421,
        "left_samples": 534,
        "right_samples": 379,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 18,
        "depth": 4,
        "feature_name": "Feature_09",
        "threshold": 3.4319,
        "samples": 767,
        "solver_mode": "mab",
        "gini": 0.2287,
        "gini_gain": 0.0401,
        "left_samples": 718,
        "right_samples": 49,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 26,
        "depth": 4,
        "feature_name": "Feature_17",
        "threshold": 0.1068,
        "samples": 753,
        "solver_mode": "mab",
        "gini": 0.0365,
        "gini_gain": 0.0069,
        "left_samples": 740,
        "right_samples": 13,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 28,
        "depth": 4,
        "feature_name": "Feature_01",
        "threshold": -1.1354,
        "samples": 674,
        "solver_mode": "mab",
        "gini": 0.4611,
        "gini_gain": 0.0989,
        "left_samples": 244,
        "right_samples": 430,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 20,
        "depth": 4,
        "feature_name": "Feature_17",
        "threshold": -0.7008,
        "samples": 582,
        "solver_mode": "mab",
        "gini": 0.3654,
        "gini_gain": 0.0379,
        "left_samples": 156,
        "right_samples": 426,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 19,
        "depth": 4,
        "feature_name": "Feature_02",
        "threshold": 4.5627,
        "samples": 469,
        "solver_mode": "exact",
        "gini": 0.4222,
        "gini_gain": 0.1205,
        "left_samples": 334,
        "right_samples": 135,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 24,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": -2.3905,
        "samples": 355,
        "solver_mode": "exact",
        "gini": 0.4457,
        "gini_gain": 0.0858,
        "left_samples": 130,
        "right_samples": 225,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 15,
        "depth": 4,
        "feature_name": "Feature_12",
        "threshold": -0.7702,
        "samples": 310,
        "solver_mode": "exact",
        "gini": 0.2248,
        "gini_gain": 0.022,
        "left_samples": 62,
        "right_samples": 248,
        "left_pred": "Class 1",
        "right_pred": "Class 1"
      },
      {
        "node_id": 23,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": -0.6381,
        "samples": 290,
        "solver_mode": "exact",
        "gini": 0.3282,
        "gini_gain": 0.0964,
        "left_samples": 225,
        "right_samples": 65,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 16,
        "depth": 4,
        "feature_name": "Feature_19",
        "threshold": 0.5029,
        "samples": 270,
        "solver_mode": "exact",
        "gini": 0.4815,
        "gini_gain": 0.0707,
        "left_samples": 122,
        "right_samples": 148,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 30,
        "depth": 4,
        "feature_name": "Feature_00",
        "threshold": -3.9403,
        "samples": 266,
        "solver_mode": "exact",
        "gini": 0.3452,
        "gini_gain": 0.0859,
        "left_samples": 41,
        "right_samples": 225,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      {
        "node_id": 17,
        "depth": 4,
        "feature_name": "Feature_12",
        "threshold": 0.8124,
        "samples": 133,
        "solver_mode": "exact",
        "gini": 0.4986,
        "gini_gain": 0.2139,
        "left_samples": 56,
        "right_samples": 77,
        "left_pred": "Class 0",
        "right_pred": "Class 1"
      },
      {
        "node_id": 25,
        "depth": 4,
        "feature_name": "Feature_06",
        "threshold": 1.0034,
        "samples": 38,
        "solver_mode": "exact",
        "gini": 0.3878,
        "gini_gain": 0.2452,
        "left_samples": 31,
        "right_samples": 7,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      }
    ],
    "tree_hierarchy": {
      "node_id": 0,
      "is_leaf": false,
      "depth": 0,
      "samples": 15000,
      "class_counts": [
        7492,
        7508
      ],
      "probabilities": [
        0.4995,
        0.5005
      ],
      "predicted_class": "Class 1",
      "predicted_class_idx": 1,
      "gini": 0.5,
      "solver_mode": "mab",
      "feature_idx": 14,
      "feature_name": "Feature_14",
      "threshold": -0.1747,
      "bin_idx": 117,
      "left": {
        "node_id": 1,
        "is_leaf": false,
        "depth": 1,
        "samples": 6914,
        "class_counts": [
          1787,
          5127
        ],
        "probabilities": [
          0.2585,
          0.7415
        ],
        "predicted_class": "Class 1",
        "predicted_class_idx": 1,
        "gini": 0.3833,
        "solver_mode": "mab",
        "feature_idx": 16,
        "feature_name": "Feature_16",
        "threshold": -0.8688,
        "bin_idx": 80,
        "left": {
          "node_id": 3,
          "is_leaf": false,
          "depth": 2,
          "samples": 1480,
          "class_counts": [
            878,
            602
          ],
          "probabilities": [
            0.5932,
            0.4068
          ],
          "predicted_class": "Class 0",
          "predicted_class_idx": 0,
          "gini": 0.4826,
          "solver_mode": "mab",
          "feature_idx": 11,
          "feature_name": "Feature_11",
          "threshold": -0.6411,
          "bin_idx": 120,
          "left": {
            "node_id": 7,
            "is_leaf": false,
            "depth": 3,
            "samples": 580,
            "class_counts": [
              149,
              431
            ],
            "probabilities": [
              0.2569,
              0.7431
            ],
            "predicted_class": "Class 1",
            "predicted_class_idx": 1,
            "gini": 0.3818,
            "solver_mode": "mab",
            "feature_idx": 11,
            "feature_name": "Feature_11",
            "threshold": -1.8064,
            "bin_idx": 68,
            "left": {
              "node_id": 15,
              "is_leaf": false,
              "depth": 4,
              "samples": 310,
              "class_counts": [
                40,
                270
              ],
              "probabilities": [
                0.129,
                0.871
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.2248,
              "solver_mode": "exact",
              "feature_idx": 12,
              "feature_name": "Feature_12",
              "threshold": -0.7702,
              "bin_idx": 114,
              "left": {
                "node_id": 31,
                "is_leaf": true,
                "depth": 5,
                "samples": 62,
                "class_counts": [
                  21,
                  41
                ],
                "probabilities": [
                  0.3387,
                  0.6613
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.448,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 32,
                "is_leaf": true,
                "depth": 5,
                "samples": 248,
                "class_counts": [
                  19,
                  229
                ],
                "probabilities": [
                  0.0766,
                  0.9234
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.1415,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.022
            },
            "right": {
              "node_id": 16,
              "is_leaf": false,
              "depth": 4,
              "samples": 270,
              "class_counts": [
                109,
                161
              ],
              "probabilities": [
                0.4037,
                0.5963
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.4815,
              "solver_mode": "exact",
              "feature_idx": 19,
              "feature_name": "Feature_19",
              "threshold": 0.5029,
              "bin_idx": 148,
              "left": {
                "node_id": 33,
                "is_leaf": true,
                "depth": 5,
                "samples": 122,
                "class_counts": [
                  24,
                  98
                ],
                "probabilities": [
                  0.1967,
                  0.8033
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.316,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 34,
                "is_leaf": true,
                "depth": 5,
                "samples": 148,
                "class_counts": [
                  85,
                  63
                ],
                "probabilities": [
                  0.5743,
                  0.4257
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.489,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0707
            },
            "gini_gain": 0.0375
          },
          "right": {
            "node_id": 8,
            "is_leaf": false,
            "depth": 3,
            "samples": 900,
            "class_counts": [
              729,
              171
            ],
            "probabilities": [
              0.81,
              0.19
            ],
            "predicted_class": "Class 0",
            "predicted_class_idx": 0,
            "gini": 0.3078,
            "solver_mode": "mab",
            "feature_idx": 6,
            "feature_name": "Feature_06",
            "threshold": -0.3397,
            "bin_idx": 86,
            "left": {
              "node_id": 17,
              "is_leaf": false,
              "depth": 4,
              "samples": 133,
              "class_counts": [
                63,
                70
              ],
              "probabilities": [
                0.4737,
                0.5263
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.4986,
              "solver_mode": "exact",
              "feature_idx": 12,
              "feature_name": "Feature_12",
              "threshold": 0.8124,
              "bin_idx": 187,
              "left": {
                "node_id": 35,
                "is_leaf": true,
                "depth": 5,
                "samples": 56,
                "class_counts": [
                  48,
                  8
                ],
                "probabilities": [
                  0.8571,
                  0.1429
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.2449,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 36,
                "is_leaf": true,
                "depth": 5,
                "samples": 77,
                "class_counts": [
                  15,
                  62
                ],
                "probabilities": [
                  0.1948,
                  0.8052
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.3137,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.2139
            },
            "right": {
              "node_id": 18,
              "is_leaf": false,
              "depth": 4,
              "samples": 767,
              "class_counts": [
                666,
                101
              ],
              "probabilities": [
                0.8683,
                0.1317
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.2287,
              "solver_mode": "mab",
              "feature_idx": 9,
              "feature_name": "Feature_09",
              "threshold": 3.4319,
              "bin_idx": 194,
              "left": {
                "node_id": 37,
                "is_leaf": true,
                "depth": 5,
                "samples": 718,
                "class_counts": [
                  650,
                  68
                ],
                "probabilities": [
                  0.9053,
                  0.0947
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.1715,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 38,
                "is_leaf": true,
                "depth": 5,
                "samples": 49,
                "class_counts": [
                  16,
                  33
                ],
                "probabilities": [
                  0.3265,
                  0.6735
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.4398,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0401
            },
            "gini_gain": 0.0392
          },
          "gini_gain": 0.1458
        },
        "right": {
          "node_id": 4,
          "is_leaf": false,
          "depth": 2,
          "samples": 5434,
          "class_counts": [
            909,
            4525
          ],
          "probabilities": [
            0.1673,
            0.8327
          ],
          "predicted_class": "Class 1",
          "predicted_class_idx": 1,
          "gini": 0.2786,
          "solver_mode": "mab",
          "feature_idx": 0,
          "feature_name": "Feature_00",
          "threshold": -1.5993,
          "bin_idx": 74,
          "left": {
            "node_id": 9,
            "is_leaf": false,
            "depth": 3,
            "samples": 1051,
            "class_counts": [
              467,
              584
            ],
            "probabilities": [
              0.4443,
              0.5557
            ],
            "predicted_class": "Class 1",
            "predicted_class_idx": 1,
            "gini": 0.4938,
            "solver_mode": "mab",
            "feature_idx": 8,
            "feature_name": "Feature_08",
            "threshold": 0.3867,
            "bin_idx": 130,
            "left": {
              "node_id": 19,
              "is_leaf": false,
              "depth": 4,
              "samples": 469,
              "class_counts": [
                327,
                142
              ],
              "probabilities": [
                0.6972,
                0.3028
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.4222,
              "solver_mode": "exact",
              "feature_idx": 2,
              "feature_name": "Feature_02",
              "threshold": 4.5627,
              "bin_idx": 204,
              "left": {
                "node_id": 39,
                "is_leaf": true,
                "depth": 5,
                "samples": 334,
                "class_counts": [
                  285,
                  49
                ],
                "probabilities": [
                  0.8533,
                  0.1467
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.2504,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 40,
                "is_leaf": true,
                "depth": 5,
                "samples": 135,
                "class_counts": [
                  42,
                  93
                ],
                "probabilities": [
                  0.3111,
                  0.6889
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.4286,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.1205
            },
            "right": {
              "node_id": 20,
              "is_leaf": false,
              "depth": 4,
              "samples": 582,
              "class_counts": [
                140,
                442
              ],
              "probabilities": [
                0.2405,
                0.7595
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.3654,
              "solver_mode": "mab",
              "feature_idx": 17,
              "feature_name": "Feature_17",
              "threshold": -0.7008,
              "bin_idx": 96,
              "left": {
                "node_id": 41,
                "is_leaf": true,
                "depth": 5,
                "samples": 156,
                "class_counts": [
                  73,
                  83
                ],
                "probabilities": [
                  0.4679,
                  0.5321
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.4979,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 42,
                "is_leaf": true,
                "depth": 5,
                "samples": 426,
                "class_counts": [
                  67,
                  359
                ],
                "probabilities": [
                  0.1573,
                  0.8427
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.2651,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0379
            },
            "gini_gain": 0.1031
          },
          "right": {
            "node_id": 10,
            "is_leaf": false,
            "depth": 3,
            "samples": 4383,
            "class_counts": [
              442,
              3941
            ],
            "probabilities": [
              0.1008,
              0.8992
            ],
            "predicted_class": "Class 1",
            "predicted_class_idx": 1,
            "gini": 0.1813,
            "solver_mode": "mab",
            "feature_idx": 14,
            "feature_name": "Feature_14",
            "threshold": -0.8783,
            "bin_idx": 84,
            "left": {
              "node_id": 21,
              "is_leaf": false,
              "depth": 4,
              "samples": 3285,
              "class_counts": [
                224,
                3061
              ],
              "probabilities": [
                0.0682,
                0.9318
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.1271,
              "solver_mode": "mab",
              "feature_idx": 14,
              "feature_name": "Feature_14",
              "threshold": -1.2667,
              "bin_idx": 68,
              "left": {
                "node_id": 43,
                "is_leaf": true,
                "depth": 5,
                "samples": 2702,
                "class_counts": [
                  130,
                  2572
                ],
                "probabilities": [
                  0.0481,
                  0.9519
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.0916,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 44,
                "is_leaf": true,
                "depth": 5,
                "samples": 583,
                "class_counts": [
                  94,
                  489
                ],
                "probabilities": [
                  0.1612,
                  0.8388
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.2705,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0038
            },
            "right": {
              "node_id": 22,
              "is_leaf": false,
              "depth": 4,
              "samples": 1098,
              "class_counts": [
                218,
                880
              ],
              "probabilities": [
                0.1985,
                0.8015
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.3182,
              "solver_mode": "mab",
              "feature_idx": 0,
              "feature_name": "Feature_00",
              "threshold": -0.8409,
              "bin_idx": 108,
              "left": {
                "node_id": 45,
                "is_leaf": true,
                "depth": 5,
                "samples": 148,
                "class_counts": [
                  83,
                  65
                ],
                "probabilities": [
                  0.5608,
                  0.4392
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.4926,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 46,
                "is_leaf": true,
                "depth": 5,
                "samples": 950,
                "class_counts": [
                  135,
                  815
                ],
                "probabilities": [
                  0.1421,
                  0.8579
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.2438,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0409
            },
            "gini_gain": 0.0063
          },
          "gini_gain": 0.0369
        },
        "gini_gain": 0.061
      },
      "right": {
        "node_id": 2,
        "is_leaf": false,
        "depth": 1,
        "samples": 8086,
        "class_counts": [
          5705,
          2381
        ],
        "probabilities": [
          0.7055,
          0.2945
        ],
        "predicted_class": "Class 0",
        "predicted_class_idx": 0,
        "gini": 0.4155,
        "solver_mode": "mab",
        "feature_idx": 2,
        "feature_name": "Feature_02",
        "threshold": -3.0862,
        "bin_idx": 56,
        "left": {
          "node_id": 5,
          "is_leaf": false,
          "depth": 2,
          "samples": 1436,
          "class_counts": [
            373,
            1063
          ],
          "probabilities": [
            0.2597,
            0.7403
          ],
          "predicted_class": "Class 1",
          "predicted_class_idx": 1,
          "gini": 0.3846,
          "solver_mode": "mab",
          "feature_idx": 19,
          "feature_name": "Feature_19",
          "threshold": 0.3791,
          "bin_idx": 142,
          "left": {
            "node_id": 11,
            "is_leaf": false,
            "depth": 3,
            "samples": 645,
            "class_counts": [
              349,
              296
            ],
            "probabilities": [
              0.5411,
              0.4589
            ],
            "predicted_class": "Class 0",
            "predicted_class_idx": 0,
            "gini": 0.4966,
            "solver_mode": "mab",
            "feature_idx": 10,
            "feature_name": "Feature_10",
            "threshold": 1.9685,
            "bin_idx": 190,
            "left": {
              "node_id": 23,
              "is_leaf": false,
              "depth": 4,
              "samples": 290,
              "class_counts": [
                230,
                60
              ],
              "probabilities": [
                0.7931,
                0.2069
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.3282,
              "solver_mode": "exact",
              "feature_idx": 19,
              "feature_name": "Feature_19",
              "threshold": -0.6381,
              "bin_idx": 93,
              "left": {
                "node_id": 47,
                "is_leaf": true,
                "depth": 5,
                "samples": 225,
                "class_counts": [
                  205,
                  20
                ],
                "probabilities": [
                  0.9111,
                  0.0889
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.162,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 48,
                "is_leaf": true,
                "depth": 5,
                "samples": 65,
                "class_counts": [
                  25,
                  40
                ],
                "probabilities": [
                  0.3846,
                  0.6154
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.4734,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0964
            },
            "right": {
              "node_id": 24,
              "is_leaf": false,
              "depth": 4,
              "samples": 355,
              "class_counts": [
                119,
                236
              ],
              "probabilities": [
                0.3352,
                0.6648
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.4457,
              "solver_mode": "exact",
              "feature_idx": 19,
              "feature_name": "Feature_19",
              "threshold": -2.3905,
              "bin_idx": 33,
              "left": {
                "node_id": 49,
                "is_leaf": true,
                "depth": 5,
                "samples": 130,
                "class_counts": [
                  79,
                  51
                ],
                "probabilities": [
                  0.6077,
                  0.3923
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.4768,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 50,
                "is_leaf": true,
                "depth": 5,
                "samples": 225,
                "class_counts": [
                  40,
                  185
                ],
                "probabilities": [
                  0.1778,
                  0.8222
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.2923,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0858
            },
            "gini_gain": 0.1037
          },
          "right": {
            "node_id": 12,
            "is_leaf": false,
            "depth": 3,
            "samples": 791,
            "class_counts": [
              24,
              767
            ],
            "probabilities": [
              0.0303,
              0.9697
            ],
            "predicted_class": "Class 1",
            "predicted_class_idx": 1,
            "gini": 0.0588,
            "solver_mode": "mab",
            "feature_idx": 16,
            "feature_name": "Feature_16",
            "threshold": -1.347,
            "bin_idx": 68,
            "left": {
              "node_id": 25,
              "is_leaf": false,
              "depth": 4,
              "samples": 38,
              "class_counts": [
                10,
                28
              ],
              "probabilities": [
                0.2632,
                0.7368
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.3878,
              "solver_mode": "exact",
              "feature_idx": 6,
              "feature_name": "Feature_06",
              "threshold": 1.0034,
              "bin_idx": 154,
              "left": {
                "node_id": 51,
                "is_leaf": true,
                "depth": 5,
                "samples": 31,
                "class_counts": [
                  3,
                  28
                ],
                "probabilities": [
                  0.0968,
                  0.9032
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.1748,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 52,
                "is_leaf": true,
                "depth": 5,
                "samples": 7,
                "class_counts": [
                  7,
                  0
                ],
                "probabilities": [
                  1.0,
                  0.0
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.0,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.2452
            },
            "right": {
              "node_id": 26,
              "is_leaf": false,
              "depth": 4,
              "samples": 753,
              "class_counts": [
                14,
                739
              ],
              "probabilities": [
                0.0186,
                0.9814
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.0365,
              "solver_mode": "mab",
              "feature_idx": 17,
              "feature_name": "Feature_17",
              "threshold": 0.1068,
              "bin_idx": 134,
              "left": {
                "node_id": 53,
                "is_leaf": true,
                "depth": 5,
                "samples": 740,
                "class_counts": [
                  8,
                  732
                ],
                "probabilities": [
                  0.0108,
                  0.9892
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.0214,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 54,
                "is_leaf": true,
                "depth": 5,
                "samples": 13,
                "class_counts": [
                  6,
                  7
                ],
                "probabilities": [
                  0.4615,
                  0.5385
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.497,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0069
            },
            "gini_gain": 0.0054
          },
          "gini_gain": 0.1292
        },
        "right": {
          "node_id": 6,
          "is_leaf": false,
          "depth": 2,
          "samples": 6650,
          "class_counts": [
            5332,
            1318
          ],
          "probabilities": [
            0.8018,
            0.1982
          ],
          "predicted_class": "Class 0",
          "predicted_class_idx": 0,
          "gini": 0.3178,
          "solver_mode": "mab",
          "feature_idx": 18,
          "feature_name": "Feature_18",
          "threshold": 2.924,
          "bin_idx": 176,
          "left": {
            "node_id": 13,
            "is_leaf": false,
            "depth": 3,
            "samples": 5471,
            "class_counts": [
              4780,
              691
            ],
            "probabilities": [
              0.8737,
              0.1263
            ],
            "predicted_class": "Class 0",
            "predicted_class_idx": 0,
            "gini": 0.2207,
            "solver_mode": "mab",
            "feature_idx": 16,
            "feature_name": "Feature_16",
            "threshold": 2.8304,
            "bin_idx": 200,
            "left": {
              "node_id": 27,
              "is_leaf": false,
              "depth": 4,
              "samples": 4797,
              "class_counts": [
                4349,
                448
              ],
              "probabilities": [
                0.9066,
                0.0934
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.1693,
              "solver_mode": "mab",
              "feature_idx": 11,
              "feature_name": "Feature_11",
              "threshold": -0.5412,
              "bin_idx": 125,
              "left": {
                "node_id": 55,
                "is_leaf": true,
                "depth": 5,
                "samples": 1876,
                "class_counts": [
                  1535,
                  341
                ],
                "probabilities": [
                  0.8182,
                  0.1818
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.2975,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 56,
                "is_leaf": true,
                "depth": 5,
                "samples": 2921,
                "class_counts": [
                  2814,
                  107
                ],
                "probabilities": [
                  0.9634,
                  0.0366
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.0706,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.01
            },
            "right": {
              "node_id": 28,
              "is_leaf": false,
              "depth": 4,
              "samples": 674,
              "class_counts": [
                431,
                243
              ],
              "probabilities": [
                0.6395,
                0.3605
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.4611,
              "solver_mode": "mab",
              "feature_idx": 1,
              "feature_name": "Feature_01",
              "threshold": -1.1354,
              "bin_idx": 66,
              "left": {
                "node_id": 57,
                "is_leaf": true,
                "depth": 5,
                "samples": 244,
                "class_counts": [
                  84,
                  160
                ],
                "probabilities": [
                  0.3443,
                  0.6557
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.4515,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 58,
                "is_leaf": true,
                "depth": 5,
                "samples": 430,
                "class_counts": [
                  347,
                  83
                ],
                "probabilities": [
                  0.807,
                  0.193
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.3115,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0989
            },
            "gini_gain": 0.0155
          },
          "right": {
            "node_id": 14,
            "is_leaf": false,
            "depth": 3,
            "samples": 1179,
            "class_counts": [
              552,
              627
            ],
            "probabilities": [
              0.4682,
              0.5318
            ],
            "predicted_class": "Class 1",
            "predicted_class_idx": 1,
            "gini": 0.498,
            "solver_mode": "mab",
            "feature_idx": 19,
            "feature_name": "Feature_19",
            "threshold": 0.1547,
            "bin_idx": 131,
            "left": {
              "node_id": 29,
              "is_leaf": false,
              "depth": 4,
              "samples": 913,
              "class_counts": [
                345,
                568
              ],
              "probabilities": [
                0.3779,
                0.6221
              ],
              "predicted_class": "Class 1",
              "predicted_class_idx": 1,
              "gini": 0.4702,
              "solver_mode": "mab",
              "feature_idx": 18,
              "feature_name": "Feature_18",
              "threshold": 4.6398,
              "bin_idx": 216,
              "left": {
                "node_id": 59,
                "is_leaf": true,
                "depth": 5,
                "samples": 534,
                "class_counts": [
                  267,
                  267
                ],
                "probabilities": [
                  0.5,
                  0.5
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.5,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 60,
                "is_leaf": true,
                "depth": 5,
                "samples": 379,
                "class_counts": [
                  78,
                  301
                ],
                "probabilities": [
                  0.2058,
                  0.7942
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.3269,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0421
            },
            "right": {
              "node_id": 30,
              "is_leaf": false,
              "depth": 4,
              "samples": 266,
              "class_counts": [
                207,
                59
              ],
              "probabilities": [
                0.7782,
                0.2218
              ],
              "predicted_class": "Class 0",
              "predicted_class_idx": 0,
              "gini": 0.3452,
              "solver_mode": "exact",
              "feature_idx": 0,
              "feature_name": "Feature_00",
              "threshold": -3.9403,
              "bin_idx": 12,
              "left": {
                "node_id": 61,
                "is_leaf": true,
                "depth": 5,
                "samples": 41,
                "class_counts": [
                  12,
                  29
                ],
                "probabilities": [
                  0.2927,
                  0.7073
                ],
                "predicted_class": "Class 1",
                "predicted_class_idx": 1,
                "gini": 0.414,
                "solver_mode": "leaf"
              },
              "right": {
                "node_id": 62,
                "is_leaf": true,
                "depth": 5,
                "samples": 225,
                "class_counts": [
                  195,
                  30
                ],
                "probabilities": [
                  0.8667,
                  0.1333
                ],
                "predicted_class": "Class 0",
                "predicted_class_idx": 0,
                "gini": 0.2311,
                "solver_mode": "leaf"
              },
              "gini_gain": 0.0859
            },
            "gini_gain": 0.056
          },
          "gini_gain": 0.0479
        },
        "gini_gain": 0.0858
      },
      "gini_gain": 0.0993
    },
    "feature_contributions": [
      {
        "rank": 1,
        "feature_idx": 14,
        "feature_name": "Feature_14",
        "mab_importance_pct": 9.68,
        "rf_importance_pct": 15.49,
        "mutual_info_pct": 19.88,
        "mutual_info_raw": 0.1288,
        "split_count": 3,
        "stats": {
          "feature_idx": 14,
          "feature_name": "Feature_14",
          "min": -9.323800086975098,
          "max": 7.413599967956543,
          "mean": 0.004600000102072954,
          "std": 2.0622000694274902,
          "unique_values": 1000
        },
        "composite_score": 14.26,
        "cumulative_pct": 14.26
      },
      {
        "rank": 2,
        "feature_idx": 16,
        "feature_name": "Feature_16",
        "mab_importance_pct": 9.68,
        "rf_importance_pct": 10.63,
        "mutual_info_pct": 13.06,
        "mutual_info_raw": 0.0847,
        "split_count": 3,
        "stats": {
          "feature_idx": 16,
          "feature_name": "Feature_16",
          "min": -12.018400192260742,
          "max": 14.888899803161621,
          "mean": 0.4422999918460846,
          "std": 3.222399950027466,
          "unique_values": 1000
        },
        "composite_score": 10.86,
        "cumulative_pct": 25.12
      },
      {
        "rank": 3,
        "feature_idx": 19,
        "feature_name": "Feature_19",
        "mab_importance_pct": 16.13,
        "rf_importance_pct": 5.68,
        "mutual_info_pct": 0.5,
        "mutual_info_raw": 0.0032,
        "split_count": 5,
        "stats": {
          "feature_idx": 19,
          "feature_name": "Feature_19",
          "min": -7.702600002288818,
          "max": 7.162899971008301,
          "mean": 0.003599999938160181,
          "std": 2.0947000980377197,
          "unique_values": 1000
        },
        "composite_score": 8.56,
        "cumulative_pct": 33.68
      },
      {
        "rank": 4,
        "feature_idx": 2,
        "feature_name": "Feature_02",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 7.91,
        "mutual_info_pct": 11.54,
        "mutual_info_raw": 0.0748,
        "split_count": 2,
        "stats": {
          "feature_idx": 2,
          "feature_name": "Feature_02",
          "min": -13.826600074768066,
          "max": 16.290199279785156,
          "mean": 0.6800000071525574,
          "std": 4.452899932861328,
          "unique_values": 1000
        },
        "composite_score": 8.23,
        "cumulative_pct": 41.91
      },
      {
        "rank": 5,
        "feature_idx": 11,
        "feature_name": "Feature_11",
        "mab_importance_pct": 9.68,
        "rf_importance_pct": 6.49,
        "mutual_info_pct": 5.7,
        "mutual_info_raw": 0.0369,
        "split_count": 3,
        "stats": {
          "feature_idx": 11,
          "feature_name": "Feature_11",
          "min": -8.980899810791016,
          "max": 8.501199722290039,
          "mean": -0.49559998512268066,
          "std": 2.124500036239624,
          "unique_values": 1000
        },
        "composite_score": 7.57,
        "cumulative_pct": 49.48
      },
      {
        "rank": 6,
        "feature_idx": 0,
        "feature_name": "Feature_00",
        "mab_importance_pct": 9.68,
        "rf_importance_pct": 6.13,
        "mutual_info_pct": 5.92,
        "mutual_info_raw": 0.0384,
        "split_count": 3,
        "stats": {
          "feature_idx": 0,
          "feature_name": "Feature_00",
          "min": -8.407299995422363,
          "max": 7.110300064086914,
          "mean": -0.5040000081062317,
          "std": 2.0578999519348145,
          "unique_values": 1000
        },
        "composite_score": 7.5,
        "cumulative_pct": 56.98
      },
      {
        "rank": 7,
        "feature_idx": 9,
        "feature_name": "Feature_09",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 6.96,
        "mutual_info_pct": 13.86,
        "mutual_info_raw": 0.0898,
        "split_count": 1,
        "stats": {
          "feature_idx": 9,
          "feature_name": "Feature_09",
          "min": -12.91819953918457,
          "max": 15.163399696350098,
          "mean": 0.684499979019165,
          "std": 3.7844998836517334,
          "unique_values": 1000
        },
        "composite_score": 7.19,
        "cumulative_pct": 64.17
      },
      {
        "rank": 8,
        "feature_idx": 6,
        "feature_name": "Feature_06",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 6.98,
        "mutual_info_pct": 7.93,
        "mutual_info_raw": 0.0514,
        "split_count": 2,
        "stats": {
          "feature_idx": 6,
          "feature_name": "Feature_06",
          "min": -6.567399978637695,
          "max": 9.718199729919434,
          "mean": 0.5206999778747559,
          "std": 1.9645999670028687,
          "unique_values": 1000
        },
        "composite_score": 7.01,
        "cumulative_pct": 71.18
      },
      {
        "rank": 9,
        "feature_idx": 18,
        "feature_name": "Feature_18",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 9.6,
        "mutual_info_pct": 4.03,
        "mutual_info_raw": 0.0261,
        "split_count": 2,
        "stats": {
          "feature_idx": 18,
          "feature_name": "Feature_18",
          "min": -12.40470027923584,
          "max": 14.720999717712402,
          "mean": 1.2865999937057495,
          "std": 3.2576000690460205,
          "unique_values": 1000
        },
        "composite_score": 6.95,
        "cumulative_pct": 78.13
      },
      {
        "rank": 10,
        "feature_idx": 12,
        "feature_name": "Feature_12",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 3.66,
        "mutual_info_pct": 4.04,
        "mutual_info_raw": 0.0262,
        "split_count": 2,
        "stats": {
          "feature_idx": 12,
          "feature_name": "Feature_12",
          "min": -9.896300315856934,
          "max": 6.685699939727783,
          "mean": -0.5077000260353088,
          "std": 2.06030011177063,
          "unique_values": 1000
        },
        "composite_score": 4.87,
        "cumulative_pct": 83.0
      },
      {
        "rank": 11,
        "feature_idx": 8,
        "feature_name": "Feature_08",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 4.87,
        "mutual_info_pct": 5.59,
        "mutual_info_raw": 0.0362,
        "split_count": 1,
        "stats": {
          "feature_idx": 8,
          "feature_name": "Feature_08",
          "min": -7.638700008392334,
          "max": 8.165399551391602,
          "mean": 0.49869999289512634,
          "std": 1.9922000169754028,
          "unique_values": 1000
        },
        "composite_score": 4.39,
        "cumulative_pct": 87.39
      },
      {
        "rank": 12,
        "feature_idx": 17,
        "feature_name": "Feature_17",
        "mab_importance_pct": 6.45,
        "rf_importance_pct": 2.67,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 2,
        "stats": {
          "feature_idx": 17,
          "feature_name": "Feature_17",
          "min": -8.160200119018555,
          "max": 8.38029956817627,
          "mean": 0.01899999938905239,
          "std": 2.144399881362915,
          "unique_values": 1000
        },
        "composite_score": 3.51,
        "cumulative_pct": 90.9
      },
      {
        "rank": 13,
        "feature_idx": 10,
        "feature_name": "Feature_10",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 3.18,
        "mutual_info_pct": 3.14,
        "mutual_info_raw": 0.0203,
        "split_count": 1,
        "stats": {
          "feature_idx": 10,
          "feature_name": "Feature_10",
          "min": -8.376999855041504,
          "max": 8.684900283813477,
          "mean": 0.48980000615119934,
          "std": 2.2725000381469727,
          "unique_values": 1000
        },
        "composite_score": 3.19,
        "cumulative_pct": 94.09
      },
      {
        "rank": 14,
        "feature_idx": 1,
        "feature_name": "Feature_01",
        "mab_importance_pct": 3.23,
        "rf_importance_pct": 4.06,
        "mutual_info_pct": 1.04,
        "mutual_info_raw": 0.0067,
        "split_count": 1,
        "stats": {
          "feature_idx": 1,
          "feature_name": "Feature_01",
          "min": -7.827300071716309,
          "max": 6.520599842071533,
          "mean": -0.0015999999595806003,
          "std": 1.8309999704360962,
          "unique_values": 1000
        },
        "composite_score": 2.97,
        "cumulative_pct": 97.06
      },
      {
        "rank": 15,
        "feature_idx": 15,
        "feature_name": "Feature_15",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 2.86,
        "mutual_info_pct": 2.94,
        "mutual_info_raw": 0.019,
        "split_count": 0,
        "stats": {
          "feature_idx": 15,
          "feature_name": "Feature_15",
          "min": -20.027799606323242,
          "max": 12.707500457763672,
          "mean": -1.201200008392334,
          "std": 4.373799800872803,
          "unique_values": 1000
        },
        "composite_score": 1.74,
        "cumulative_pct": 98.8
      },
      {
        "rank": 16,
        "feature_idx": 3,
        "feature_name": "Feature_03",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.64,
        "mutual_info_pct": 0.84,
        "mutual_info_raw": 0.0054,
        "split_count": 0,
        "stats": {
          "feature_idx": 3,
          "feature_name": "Feature_03",
          "min": -3.719899892807007,
          "max": 3.564500093460083,
          "mean": 0.000699999975040555,
          "std": 0.9973999857902527,
          "unique_values": 1000
        },
        "composite_score": 0.43,
        "cumulative_pct": 99.23
      },
      {
        "rank": 17,
        "feature_idx": 7,
        "feature_name": "Feature_07",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.67,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 7,
          "feature_name": "Feature_07",
          "min": -3.636699914932251,
          "max": 3.6442999839782715,
          "mean": -0.004100000020116568,
          "std": 0.9979000091552734,
          "unique_values": 1000
        },
        "composite_score": 0.23,
        "cumulative_pct": 99.46
      },
      {
        "rank": 18,
        "feature_idx": 4,
        "feature_name": "Feature_04",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.54,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 4,
          "feature_name": "Feature_04",
          "min": -4.374000072479248,
          "max": 3.7822000980377197,
          "mean": 0.001500000013038516,
          "std": 1.0003999471664429,
          "unique_values": 1000
        },
        "composite_score": 0.19,
        "cumulative_pct": 99.65
      },
      {
        "rank": 19,
        "feature_idx": 5,
        "feature_name": "Feature_05",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.53,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 5,
          "feature_name": "Feature_05",
          "min": -4.003600120544434,
          "max": 3.732100009918213,
          "mean": -0.005200000014156103,
          "std": 0.9983999729156494,
          "unique_values": 1000
        },
        "composite_score": 0.19,
        "cumulative_pct": 99.84
      },
      {
        "rank": 20,
        "feature_idx": 13,
        "feature_name": "Feature_13",
        "mab_importance_pct": 0.0,
        "rf_importance_pct": 0.46,
        "mutual_info_pct": 0.0,
        "mutual_info_raw": 0.0,
        "split_count": 0,
        "stats": {
          "feature_idx": 13,
          "feature_name": "Feature_13",
          "min": -4.413899898529053,
          "max": 3.976900100708008,
          "mean": -0.0012000000569969416,
          "std": 0.9980000257492065,
          "unique_values": 1000
        },
        "composite_score": 0.16,
        "cumulative_pct": 100.0
      }
    ]
  },
  "benchmark_summary": {
    "adult": {
      "dataset_name": "Adult Census Income",
      "n_samples": 15000,
      "n_features": 14,
      "n_classes": 2,
      "class_names": [
        "<=50K",
        ">50K"
      ],
      "performance": {
        "mab_fit_time_sec": 1.866,
        "std_dt_fit_time_sec": 0.0152,
        "speedup_ratio": 0.01,
        "total_nodes": 57,
        "tree_depth": 5,
        "splits_by_mode": {
          "exact": 15,
          "mab": 15
        },
        "samples_evaluated": 53428,
        "theoretical_full_scan_samples": 420000,
        "sample_evaluation_reduction_pct": 87.3
      },
      "top_features": {
        "top_3": [
          "capital.gain",
          "education.num",
          "relationship"
        ],
        "top_5": [
          "capital.gain",
          "education.num",
          "relationship",
          "age",
          "hours.per.week"
        ],
        "top_5_cumulative_pct": 74.25
      },
      "root_split": {
        "node_id": 0,
        "depth": 0,
        "feature_name": "relationship",
        "threshold": 0.5,
        "samples": 15000,
        "solver_mode": "mab",
        "gini": 0.3658,
        "gini_gain": 0.0565,
        "left_samples": 6052,
        "right_samples": 8948,
        "left_pred": "<=50K",
        "right_pred": "<=50K"
      },
      "final_splits_count": 13,
      "feature_contributions": [
        {
          "rank": 1,
          "feature_idx": 10,
          "feature_name": "capital.gain",
          "mab_importance_pct": 35.71,
          "rf_importance_pct": 20.45,
          "mutual_info_pct": 11.28,
          "mutual_info_raw": 0.0749,
          "split_count": 10,
          "stats": {
            "feature_idx": 10,
            "feature_name": "capital.gain",
            "min": 0.0,
            "max": 99999.0,
            "mean": 1094.7919921875,
            "std": 7458.58056640625,
            "unique_values": 35
          },
          "composite_score": 24.26,
          "cumulative_pct": 24.26
        },
        {
          "rank": 2,
          "feature_idx": 4,
          "feature_name": "education.num",
          "mab_importance_pct": 17.86,
          "rf_importance_pct": 17.02,
          "mutual_info_pct": 9.46,
          "mutual_info_raw": 0.0628,
          "split_count": 5,
          "stats": {
            "feature_idx": 4,
            "feature_name": "education.num",
            "min": 1.0,
            "max": 16.0,
            "mean": 10.064800262451172,
            "std": 2.5673000812530518,
            "unique_values": 15
          },
          "composite_score": 15.47,
          "cumulative_pct": 39.72
        },
        {
          "rank": 3,
          "feature_idx": 7,
          "feature_name": "relationship",
          "mab_importance_pct": 7.14,
          "rf_importance_pct": 18.32,
          "mutual_info_pct": 15.6,
          "mutual_info_raw": 0.1036,
          "split_count": 2,
          "stats": {
            "feature_idx": 7,
            "feature_name": "relationship",
            "min": 0.0,
            "max": 5.0,
            "mean": 1.4472999572753906,
            "std": 1.6032999753952026,
            "unique_values": 6
          },
          "composite_score": 13.17,
          "cumulative_pct": 52.89
        },
        {
          "rank": 4,
          "feature_idx": 0,
          "feature_name": "age",
          "mab_importance_pct": 14.29,
          "rf_importance_pct": 11.65,
          "mutual_info_pct": 10.39,
          "mutual_info_raw": 0.069,
          "split_count": 4,
          "stats": {
            "feature_idx": 0,
            "feature_name": "age",
            "min": 17.0,
            "max": 90.0,
            "mean": 38.59239959716797,
            "std": 13.668399810791016,
            "unique_values": 64
          },
          "composite_score": 12.39,
          "cumulative_pct": 65.28
        },
        {
          "rank": 5,
          "feature_idx": 12,
          "feature_name": "hours.per.week",
          "mab_importance_pct": 14.29,
          "rf_importance_pct": 5.17,
          "mutual_info_pct": 5.77,
          "mutual_info_raw": 0.0383,
          "split_count": 4,
          "stats": {
            "feature_idx": 12,
            "feature_name": "hours.per.week",
            "min": 1.0,
            "max": 99.0,
            "mean": 40.3473014831543,
            "std": 12.255000114440918,
            "unique_values": 56
          },
          "composite_score": 8.97,
          "cumulative_pct": 74.25
        },
        {
          "rank": 6,
          "feature_idx": 5,
          "feature_name": "marital.status",
          "mab_importance_pct": 0.0,
          "rf_importance_pct": 8.69,
          "mutual_info_pct": 13.54,
          "mutual_info_raw": 0.0899,
          "split_count": 0,
          "stats": {
            "feature_idx": 5,
            "feature_name": "marital.status",
            "min": 0.0,
            "max": 6.0,
            "mean": 2.628200054168701,
            "std": 1.5049999952316284,
            "unique_values": 7
          },
          "composite_score": 6.43,
          "cumulative_pct": 80.67
        },
        {
          "rank": 7,
          "feature_idx": 6,
          "feature_name": "occupation",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 3.84,
          "mutual_info_pct": 11.51,
          "mutual_info_raw": 0.0764,
          "split_count": 1,
          "stats": {
            "feature_idx": 6,
            "feature_name": "occupation",
            "min": 0.0,
            "max": 14.0,
            "mean": 6.564199924468994,
            "std": 4.225599765777588,
            "unique_values": 14
          },
          "composite_score": 5.65,
          "cumulative_pct": 86.32
        },
        {
          "rank": 8,
          "feature_idx": 3,
          "feature_name": "education",
          "mab_importance_pct": 0.0,
          "rf_importance_pct": 2.92,
          "mutual_info_pct": 8.48,
          "mutual_info_raw": 0.0563,
          "split_count": 0,
          "stats": {
            "feature_idx": 3,
            "feature_name": "education",
            "min": 0.0,
            "max": 15.0,
            "mean": 10.323100090026855,
            "std": 3.8757998943328857,
            "unique_values": 15
          },
          "composite_score": 3.14,
          "cumulative_pct": 89.46
        },
        {
          "rank": 9,
          "feature_idx": 2,
          "feature_name": "fnlwgt",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 3.01,
          "mutual_info_pct": 1.32,
          "mutual_info_raw": 0.0088,
          "split_count": 1,
          "stats": {
            "feature_idx": 2,
            "feature_name": "fnlwgt",
            "min": 19214.0,
            "max": 1484705.0,
            "mean": 190287.25,
            "std": 105597.6171875,
            "unique_values": 982
          },
          "composite_score": 2.81,
          "cumulative_pct": 92.27
        },
        {
          "rank": 10,
          "feature_idx": 1,
          "feature_name": "workclass",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 1.5,
          "mutual_info_pct": 3.1,
          "mutual_info_raw": 0.0206,
          "split_count": 1,
          "stats": {
            "feature_idx": 1,
            "feature_name": "workclass",
            "min": 0.0,
            "max": 8.0,
            "mean": 3.8596999645233154,
            "std": 1.454800009727478,
            "unique_values": 7
          },
          "composite_score": 2.73,
          "cumulative_pct": 95.0
        }
      ]
    },
    "covertype": {
      "dataset_name": "Forest Covertype",
      "n_samples": 20000,
      "n_features": 54,
      "n_classes": 7,
      "class_names": [
        "Spruce/Fir",
        "Lodgepole Pine",
        "Ponderosa Pine",
        "Cottonwood/Willow",
        "Aspen",
        "Douglas-fir",
        "Krummholz"
      ],
      "performance": {
        "mab_fit_time_sec": 0.0726,
        "std_dt_fit_time_sec": 0.0461,
        "speedup_ratio": 0.63,
        "total_nodes": 57,
        "tree_depth": 5,
        "splits_by_mode": {
          "exact": 7,
          "mab": 23
        },
        "samples_evaluated": 99456,
        "theoretical_full_scan_samples": 560000,
        "sample_evaluation_reduction_pct": 82.2
      },
      "top_features": {
        "top_3": [
          "Elevation",
          "Horizontal_Distance_To_Fire_Points",
          "Horizontal_Distance_To_Roadways"
        ],
        "top_5": [
          "Elevation",
          "Horizontal_Distance_To_Fire_Points",
          "Horizontal_Distance_To_Roadways",
          "Hillshade_9am",
          "Wilderness_Area_1"
        ],
        "top_5_cumulative_pct": 60.19
      },
      "root_split": {
        "node_id": 0,
        "depth": 0,
        "feature_name": "Horizontal_Distance_To_Fire_Points",
        "threshold": 2573.1992,
        "samples": 20000,
        "solver_mode": "mab",
        "gini": 0.6615,
        "gini_gain": 0.1199,
        "left_samples": 8516,
        "right_samples": 11484,
        "left_pred": "Spruce/Fir",
        "right_pred": "Lodgepole Pine"
      },
      "final_splits_count": 13,
      "feature_contributions": [
        {
          "rank": 1,
          "feature_idx": 0,
          "feature_name": "Elevation",
          "mab_importance_pct": 32.14,
          "rf_importance_pct": 15.07,
          "mutual_info_pct": 19.03,
          "mutual_info_raw": 0.6626,
          "split_count": 9,
          "stats": {
            "feature_idx": 0,
            "feature_name": "Elevation",
            "min": 1874.0,
            "max": 3846.0,
            "mean": 2812.884033203125,
            "std": 299.50738525390625,
            "unique_values": 549
          },
          "composite_score": 22.89,
          "cumulative_pct": 22.88
        },
        {
          "rank": 2,
          "feature_idx": 9,
          "feature_name": "Horizontal_Distance_To_Fire_Points",
          "mab_importance_pct": 10.71,
          "rf_importance_pct": 19.28,
          "mutual_info_pct": 10.97,
          "mutual_info_raw": 0.3818,
          "split_count": 3,
          "stats": {
            "feature_idx": 9,
            "feature_name": "Horizontal_Distance_To_Fire_Points",
            "min": 0.0,
            "max": 7172.0,
            "mean": 3382.9951171875,
            "std": 2036.2098388671875,
            "unique_values": 888
          },
          "composite_score": 13.77,
          "cumulative_pct": 36.65
        },
        {
          "rank": 3,
          "feature_idx": 5,
          "feature_name": "Horizontal_Distance_To_Roadways",
          "mab_importance_pct": 10.71,
          "rf_importance_pct": 8.02,
          "mutual_info_pct": 8.39,
          "mutual_info_raw": 0.2921,
          "split_count": 3,
          "stats": {
            "feature_idx": 5,
            "feature_name": "Horizontal_Distance_To_Roadways",
            "min": 0.0,
            "max": 7117.0,
            "mean": 3047.738037109375,
            "std": 1987.9814453125,
            "unique_values": 883
          },
          "composite_score": 9.19,
          "cumulative_pct": 45.83
        },
        {
          "rank": 4,
          "feature_idx": 6,
          "feature_name": "Hillshade_9am",
          "mab_importance_pct": 14.29,
          "rf_importance_pct": 2.44,
          "mutual_info_pct": 2.55,
          "mutual_info_raw": 0.0889,
          "split_count": 4,
          "stats": {
            "feature_idx": 6,
            "feature_name": "Hillshade_9am",
            "min": 65.0,
            "max": 254.0,
            "mean": 216.63059997558594,
            "std": 25.462099075317383,
            "unique_values": 119
          },
          "composite_score": 7.21,
          "cumulative_pct": 53.04
        },
        {
          "rank": 5,
          "feature_idx": 10,
          "feature_name": "Wilderness_Area_1",
          "mab_importance_pct": 0.0,
          "rf_importance_pct": 13.16,
          "mutual_info_pct": 10.16,
          "mutual_info_raw": 0.3536,
          "split_count": 0,
          "stats": {
            "feature_idx": 10,
            "feature_name": "Wilderness_Area_1",
            "min": 0.0,
            "max": 1.0,
            "mean": 0.7085999846458435,
            "std": 0.4544000029563904,
            "unique_values": 2
          },
          "composite_score": 7.15,
          "cumulative_pct": 60.19
        },
        {
          "rank": 6,
          "feature_idx": 13,
          "feature_name": "Wilderness_Area_4",
          "mab_importance_pct": 0.0,
          "rf_importance_pct": 6.68,
          "mutual_info_pct": 8.11,
          "mutual_info_raw": 0.2822,
          "split_count": 0,
          "stats": {
            "feature_idx": 13,
            "feature_name": "Wilderness_Area_4",
            "min": 0.0,
            "max": 1.0,
            "mean": 0.11699999868869781,
            "std": 0.321399986743927,
            "unique_values": 2
          },
          "composite_score": 4.37,
          "cumulative_pct": 64.55
        },
        {
          "rank": 7,
          "feature_idx": 4,
          "feature_name": "Vertical_Distance_To_Hydrology",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 4.47,
          "mutual_info_pct": 3.16,
          "mutual_info_raw": 0.1101,
          "split_count": 1,
          "stats": {
            "feature_idx": 4,
            "feature_name": "Vertical_Distance_To_Hydrology",
            "min": -123.0,
            "max": 411.0,
            "mean": 36.9900016784668,
            "std": 49.10139846801758,
            "unique_values": 196
          },
          "composite_score": 3.78,
          "cumulative_pct": 68.33
        },
        {
          "rank": 8,
          "feature_idx": 3,
          "feature_name": "Horizontal_Distance_To_Hydrology",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 2.85,
          "mutual_info_pct": 1.74,
          "mutual_info_raw": 0.0605,
          "split_count": 1,
          "stats": {
            "feature_idx": 3,
            "feature_name": "Horizontal_Distance_To_Hydrology",
            "min": 0.0,
            "max": 1343.0,
            "mean": 223.27920532226562,
            "std": 187.5225067138672,
            "unique_values": 160
          },
          "composite_score": 2.86,
          "cumulative_pct": 71.19
        },
        {
          "rank": 9,
          "feature_idx": 2,
          "feature_name": "Slope",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 2.09,
          "mutual_info_pct": 2.73,
          "mutual_info_raw": 0.0949,
          "split_count": 1,
          "stats": {
            "feature_idx": 2,
            "feature_name": "Slope",
            "min": 0.0,
            "max": 61.0,
            "mean": 13.511799812316895,
            "std": 7.792200088500977,
            "unique_values": 40
          },
          "composite_score": 2.84,
          "cumulative_pct": 74.03
        },
        {
          "rank": 10,
          "feature_idx": 8,
          "feature_name": "Hillshade_3pm",
          "mab_importance_pct": 3.57,
          "rf_importance_pct": 2.08,
          "mutual_info_pct": 2.52,
          "mutual_info_raw": 0.0879,
          "split_count": 1,
          "stats": {
            "feature_idx": 8,
            "feature_name": "Hillshade_3pm",
            "min": 0.0,
            "max": 248.0,
            "mean": 137.29739379882812,
            "std": 36.142398834228516,
            "unique_values": 179
          },
          "composite_score": 2.79,
          "cumulative_pct": 76.82
        }
      ]
    },
    "higgs": {
      "dataset_name": "HIGGS Boson Kinematics",
      "n_samples": 20000,
      "n_features": 28,
      "n_classes": 2,
      "class_names": [
        "Background (0)",
        "Signal (1)"
      ],
      "performance": {
        "mab_fit_time_sec": 0.3258,
        "std_dt_fit_time_sec": 0.8304,
        "speedup_ratio": 2.55,
        "total_nodes": 63,
        "tree_depth": 5,
        "splits_by_mode": {
          "exact": 5,
          "mab": 26
        },
        "samples_evaluated": 98847,
        "theoretical_full_scan_samples": 620000,
        "sample_evaluation_reduction_pct": 84.1
      },
      "top_features": {
        "top_3": [
          "m_bb",
          "m_wwbb",
          "m_jjj"
        ],
        "top_5": [
          "m_bb",
          "m_wwbb",
          "m_jjj",
          "jet_1_pt",
          "m_jlv"
        ],
        "top_5_cumulative_pct": 58.52
      },
      "root_split": {
        "node_id": 0,
        "depth": 0,
        "feature_name": "m_bb",
        "threshold": 1.0613,
        "samples": 20000,
        "solver_mode": "mab",
        "gini": 0.4985,
        "gini_gain": 0.0215,
        "left_samples": 14062,
        "right_samples": 5938,
        "left_pred": "Signal (1)",
        "right_pred": "Background (0)"
      },
      "final_splits_count": 16,
      "feature_contributions": [
        {
          "rank": 1,
          "feature_idx": 25,
          "feature_name": "m_bb",
          "mab_importance_pct": 9.68,
          "rf_importance_pct": 16.11,
          "mutual_info_pct": 29.84,
          "mutual_info_raw": 0.0503,
          "split_count": 3,
          "stats": {
            "feature_idx": 25,
            "feature_name": "m_bb",
            "min": 0.06289999932050705,
            "max": 8.25510025024414,
            "mean": 0.9732000231742859,
            "std": 0.5206000208854675,
            "unique_values": 997
          },
          "composite_score": 16.97,
          "cumulative_pct": 16.97
        },
        {
          "rank": 2,
          "feature_idx": 27,
          "feature_name": "m_wwbb",
          "mab_importance_pct": 32.26,
          "rf_importance_pct": 8.01,
          "mutual_info_pct": 4.62,
          "mutual_info_raw": 0.0078,
          "split_count": 10,
          "stats": {
            "feature_idx": 27,
            "feature_name": "m_wwbb",
            "min": 0.4032000005245209,
            "max": 6.015600204467773,
            "mean": 0.9581999778747559,
            "std": 0.310699999332428,
            "unique_values": 999
          },
          "composite_score": 16.86,
          "cumulative_pct": 33.84
        },
        {
          "rank": 3,
          "feature_idx": 22,
          "feature_name": "m_jjj",
          "mab_importance_pct": 12.9,
          "rf_importance_pct": 6.63,
          "mutual_info_pct": 11.93,
          "mutual_info_raw": 0.0201,
          "split_count": 4,
          "stats": {
            "feature_idx": 22,
            "feature_name": "m_jjj",
            "min": 0.37720000743865967,
            "max": 7.701600074768066,
            "mean": 1.0233999490737915,
            "std": 0.36820000410079956,
            "unique_values": 997
          },
          "composite_score": 10.46,
          "cumulative_pct": 44.3
        },
        {
          "rank": 4,
          "feature_idx": 5,
          "feature_name": "jet_1_pt",
          "mab_importance_pct": 12.9,
          "rf_importance_pct": 6.27,
          "mutual_info_pct": 0.0,
          "mutual_info_raw": 0.0,
          "split_count": 4,
          "stats": {
            "feature_idx": 5,
            "feature_name": "jet_1_pt",
            "min": 0.18359999358654022,
            "max": 7.064700126647949,
            "mean": 0.9861999750137329,
            "std": 0.47920000553131104,
            "unique_values": 967
          },
          "composite_score": 7.35,
          "cumulative_pct": 51.65
        },
        {
          "rank": 5,
          "feature_idx": 24,
          "feature_name": "m_jlv",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 7.61,
          "mutual_info_pct": 6.51,
          "mutual_info_raw": 0.011,
          "split_count": 2,
          "stats": {
            "feature_idx": 24,
            "feature_name": "m_jlv",
            "min": 0.3709000051021576,
            "max": 5.819499969482422,
            "mean": 1.0077999830245972,
            "std": 0.39959999918937683,
            "unique_values": 999
          },
          "composite_score": 6.87,
          "cumulative_pct": 58.52
        },
        {
          "rank": 6,
          "feature_idx": 26,
          "feature_name": "m_wbb",
          "mab_importance_pct": 3.23,
          "rf_importance_pct": 8.39,
          "mutual_info_pct": 7.76,
          "mutual_info_raw": 0.0131,
          "split_count": 1,
          "stats": {
            "feature_idx": 26,
            "feature_name": "m_wbb",
            "min": 0.3625999987125397,
            "max": 7.31820011138916,
            "mean": 1.0325000286102295,
            "std": 0.3637999892234802,
            "unique_values": 1000
          },
          "composite_score": 6.17,
          "cumulative_pct": 64.69
        },
        {
          "rank": 7,
          "feature_idx": 0,
          "feature_name": "lepton_pT",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 3.15,
          "mutual_info_pct": 0.0,
          "mutual_info_raw": 0.0,
          "split_count": 2,
          "stats": {
            "feature_idx": 0,
            "feature_name": "lepton_pT",
            "min": 0.27469998598098755,
            "max": 7.00029993057251,
            "mean": 0.9898999929428101,
            "std": 0.5583999752998352,
            "unique_values": 949
          },
          "composite_score": 3.68,
          "cumulative_pct": 68.37
        },
        {
          "rank": 8,
          "feature_idx": 4,
          "feature_name": "missing_energy_phi",
          "mab_importance_pct": 3.23,
          "rf_importance_pct": 1.84,
          "mutual_info_pct": 4.75,
          "mutual_info_raw": 0.008,
          "split_count": 1,
          "stats": {
            "feature_idx": 4,
            "feature_name": "missing_energy_phi",
            "min": -1.743899941444397,
            "max": 1.7431999444961548,
            "mean": -0.008700000122189522,
            "std": 1.0068999528884888,
            "unique_values": 999
          },
          "composite_score": 3.12,
          "cumulative_pct": 71.49
        },
        {
          "rank": 9,
          "feature_idx": 17,
          "feature_name": "jet_4_pt",
          "mab_importance_pct": 3.23,
          "rf_importance_pct": 2.2,
          "mutual_info_pct": 3.93,
          "mutual_info_raw": 0.0066,
          "split_count": 1,
          "stats": {
            "feature_idx": 17,
            "feature_name": "jet_4_pt",
            "min": 0.3653999865055084,
            "max": 6.067699909210205,
            "mean": 0.9878000020980835,
            "std": 0.505299985408783,
            "unique_values": 918
          },
          "composite_score": 3.04,
          "cumulative_pct": 74.53
        },
        {
          "rank": 10,
          "feature_idx": 3,
          "feature_name": "missing_energy_magnitude",
          "mab_importance_pct": 0.0,
          "rf_importance_pct": 4.46,
          "mutual_info_pct": 5.16,
          "mutual_info_raw": 0.0087,
          "split_count": 0,
          "stats": {
            "feature_idx": 3,
            "feature_name": "missing_energy_magnitude",
            "min": 0.009999999776482582,
            "max": 7.998700141906738,
            "mean": 0.9908999800682068,
            "std": 0.6031000018119812,
            "unique_values": 1000
          },
          "composite_score": 2.85,
          "cumulative_pct": 77.39
        }
      ]
    },
    "synthetic": {
      "dataset_name": "Synthetic Tabular Benchmark",
      "n_samples": 15000,
      "n_features": 20,
      "n_classes": 2,
      "class_names": [
        "Class 0",
        "Class 1"
      ],
      "performance": {
        "mab_fit_time_sec": 0.3502,
        "std_dt_fit_time_sec": 0.6439,
        "speedup_ratio": 1.84,
        "total_nodes": 63,
        "tree_depth": 5,
        "splits_by_mode": {
          "exact": 8,
          "mab": 23
        },
        "samples_evaluated": 74645,
        "theoretical_full_scan_samples": 465000,
        "sample_evaluation_reduction_pct": 83.9
      },
      "top_features": {
        "top_3": [
          "Feature_14",
          "Feature_16",
          "Feature_19"
        ],
        "top_5": [
          "Feature_14",
          "Feature_16",
          "Feature_19",
          "Feature_02",
          "Feature_11"
        ],
        "top_5_cumulative_pct": 49.48
      },
      "root_split": {
        "node_id": 0,
        "depth": 0,
        "feature_name": "Feature_14",
        "threshold": -0.1747,
        "samples": 15000,
        "solver_mode": "mab",
        "gini": 0.5,
        "gini_gain": 0.0993,
        "left_samples": 6914,
        "right_samples": 8086,
        "left_pred": "Class 1",
        "right_pred": "Class 0"
      },
      "final_splits_count": 16,
      "feature_contributions": [
        {
          "rank": 1,
          "feature_idx": 14,
          "feature_name": "Feature_14",
          "mab_importance_pct": 9.68,
          "rf_importance_pct": 15.49,
          "mutual_info_pct": 19.88,
          "mutual_info_raw": 0.1288,
          "split_count": 3,
          "stats": {
            "feature_idx": 14,
            "feature_name": "Feature_14",
            "min": -9.323800086975098,
            "max": 7.413599967956543,
            "mean": 0.004600000102072954,
            "std": 2.0622000694274902,
            "unique_values": 1000
          },
          "composite_score": 14.26,
          "cumulative_pct": 14.26
        },
        {
          "rank": 2,
          "feature_idx": 16,
          "feature_name": "Feature_16",
          "mab_importance_pct": 9.68,
          "rf_importance_pct": 10.63,
          "mutual_info_pct": 13.06,
          "mutual_info_raw": 0.0847,
          "split_count": 3,
          "stats": {
            "feature_idx": 16,
            "feature_name": "Feature_16",
            "min": -12.018400192260742,
            "max": 14.888899803161621,
            "mean": 0.4422999918460846,
            "std": 3.222399950027466,
            "unique_values": 1000
          },
          "composite_score": 10.86,
          "cumulative_pct": 25.12
        },
        {
          "rank": 3,
          "feature_idx": 19,
          "feature_name": "Feature_19",
          "mab_importance_pct": 16.13,
          "rf_importance_pct": 5.68,
          "mutual_info_pct": 0.5,
          "mutual_info_raw": 0.0032,
          "split_count": 5,
          "stats": {
            "feature_idx": 19,
            "feature_name": "Feature_19",
            "min": -7.702600002288818,
            "max": 7.162899971008301,
            "mean": 0.003599999938160181,
            "std": 2.0947000980377197,
            "unique_values": 1000
          },
          "composite_score": 8.56,
          "cumulative_pct": 33.68
        },
        {
          "rank": 4,
          "feature_idx": 2,
          "feature_name": "Feature_02",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 7.91,
          "mutual_info_pct": 11.54,
          "mutual_info_raw": 0.0748,
          "split_count": 2,
          "stats": {
            "feature_idx": 2,
            "feature_name": "Feature_02",
            "min": -13.826600074768066,
            "max": 16.290199279785156,
            "mean": 0.6800000071525574,
            "std": 4.452899932861328,
            "unique_values": 1000
          },
          "composite_score": 8.23,
          "cumulative_pct": 41.91
        },
        {
          "rank": 5,
          "feature_idx": 11,
          "feature_name": "Feature_11",
          "mab_importance_pct": 9.68,
          "rf_importance_pct": 6.49,
          "mutual_info_pct": 5.7,
          "mutual_info_raw": 0.0369,
          "split_count": 3,
          "stats": {
            "feature_idx": 11,
            "feature_name": "Feature_11",
            "min": -8.980899810791016,
            "max": 8.501199722290039,
            "mean": -0.49559998512268066,
            "std": 2.124500036239624,
            "unique_values": 1000
          },
          "composite_score": 7.57,
          "cumulative_pct": 49.48
        },
        {
          "rank": 6,
          "feature_idx": 0,
          "feature_name": "Feature_00",
          "mab_importance_pct": 9.68,
          "rf_importance_pct": 6.13,
          "mutual_info_pct": 5.92,
          "mutual_info_raw": 0.0384,
          "split_count": 3,
          "stats": {
            "feature_idx": 0,
            "feature_name": "Feature_00",
            "min": -8.407299995422363,
            "max": 7.110300064086914,
            "mean": -0.5040000081062317,
            "std": 2.0578999519348145,
            "unique_values": 1000
          },
          "composite_score": 7.5,
          "cumulative_pct": 56.98
        },
        {
          "rank": 7,
          "feature_idx": 9,
          "feature_name": "Feature_09",
          "mab_importance_pct": 3.23,
          "rf_importance_pct": 6.96,
          "mutual_info_pct": 13.86,
          "mutual_info_raw": 0.0898,
          "split_count": 1,
          "stats": {
            "feature_idx": 9,
            "feature_name": "Feature_09",
            "min": -12.91819953918457,
            "max": 15.163399696350098,
            "mean": 0.684499979019165,
            "std": 3.7844998836517334,
            "unique_values": 1000
          },
          "composite_score": 7.19,
          "cumulative_pct": 64.17
        },
        {
          "rank": 8,
          "feature_idx": 6,
          "feature_name": "Feature_06",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 6.98,
          "mutual_info_pct": 7.93,
          "mutual_info_raw": 0.0514,
          "split_count": 2,
          "stats": {
            "feature_idx": 6,
            "feature_name": "Feature_06",
            "min": -6.567399978637695,
            "max": 9.718199729919434,
            "mean": 0.5206999778747559,
            "std": 1.9645999670028687,
            "unique_values": 1000
          },
          "composite_score": 7.01,
          "cumulative_pct": 71.18
        },
        {
          "rank": 9,
          "feature_idx": 18,
          "feature_name": "Feature_18",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 9.6,
          "mutual_info_pct": 4.03,
          "mutual_info_raw": 0.0261,
          "split_count": 2,
          "stats": {
            "feature_idx": 18,
            "feature_name": "Feature_18",
            "min": -12.40470027923584,
            "max": 14.720999717712402,
            "mean": 1.2865999937057495,
            "std": 3.2576000690460205,
            "unique_values": 1000
          },
          "composite_score": 6.95,
          "cumulative_pct": 78.13
        },
        {
          "rank": 10,
          "feature_idx": 12,
          "feature_name": "Feature_12",
          "mab_importance_pct": 6.45,
          "rf_importance_pct": 3.66,
          "mutual_info_pct": 4.04,
          "mutual_info_raw": 0.0262,
          "split_count": 2,
          "stats": {
            "feature_idx": 12,
            "feature_name": "Feature_12",
            "min": -9.896300315856934,
            "max": 6.685699939727783,
            "mean": -0.5077000260353088,
            "std": 2.06030011177063,
            "unique_values": 1000
          },
          "composite_score": 4.87,
          "cumulative_pct": 83.0
        }
      ]
    }
  }
};
