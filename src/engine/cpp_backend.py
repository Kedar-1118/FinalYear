"""
C++ High-Performance Engine Python Integration Wrapper.

Bridges the native C++17 bare-metal engine with Python data pipelines,
enabling automated micro-benchmarks and native throughput comparisons.
"""

import os
import subprocess
import re
from typing import Dict, Any, Optional


class CppEngineBridge:
    """Interface to the high-throughput bare-metal C++17 MABSplit engine."""

    def __init__(self, binary_path: Optional[str] = None):
        if binary_path is None:
            # Locate binary relative to repository root
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "cpp"))
            candidates = [
                os.path.join(base_dir, "mab_benchmark.exe"),
                os.path.join(base_dir, "build", "mab_cpp_benchmark.exe"),
                os.path.join(base_dir, "mab_cpp_benchmark"),
                os.path.join(base_dir, "build", "mab_cpp_benchmark")
            ]
            self.binary_path = next((c for c in candidates if os.path.exists(c)), None)
        else:
            self.binary_path = binary_path if os.path.exists(binary_path) else None

    @property
    def is_available(self) -> bool:
        """Returns True if the compiled C++ executable is present on disk."""
        return self.binary_path is not None

    def run_benchmark(self) -> Dict[str, Any]:
        """Executes the native C++ engine benchmark and parses execution telemetry.
        
        Returns
        -------
        dict with keys:
            best_feature (int), best_bin (int), best_gini_gain (float),
            samples_evaluated (int), total_samples (int), sample_read_pct (float),
            execution_time_ms (float), status (str)
        """
        if not self.is_available:
            return {
                "status": "unavailable",
                "error": "C++ binary not found. Build via CMake or check cpp/ directory."
            }

        result = subprocess.run(
            [self.binary_path],
            capture_output=True,
            text=True,
            check=True
        )

        output = result.stdout
        telemetry: Dict[str, Any] = {"status": "success", "raw_output": output}

        # Regex parsing of native engine metrics
        feat_match = re.search(r"Best Feature:\s+(\d+)", output)
        bin_match = re.search(r"Best Bin:\s+(\d+)", output)
        gini_match = re.search(r"Best Gini Gain:\s+([\d\.]+)", output)
        samples_match = re.search(r"Samples Evaluated:\s+(\d+)\s+/\s+(\d+)\s+\(([\d\.]+)%", output)
        time_match = re.search(r"Execution Time:\s+([\d\.]+)\s+ms", output)

        if feat_match:
            telemetry["best_feature"] = int(feat_match.group(1))
        if bin_match:
            telemetry["best_bin"] = int(bin_match.group(1))
        if gini_match:
            telemetry["best_gini_gain"] = float(gini_match.group(1))
        if samples_match:
            telemetry["samples_evaluated"] = int(samples_match.group(1))
            telemetry["total_samples"] = int(samples_match.group(2))
            telemetry["sample_read_pct"] = float(samples_match.group(3))
        if time_match:
            telemetry["execution_time_ms"] = float(time_match.group(1))

        return telemetry
