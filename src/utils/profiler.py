"""Memory, Latency, and Sample Efficiency Profiler for MABSplit."""

import time
import tracemalloc
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional
import numpy as np


@dataclass
class ProfileSnapshot:
    """Snapshot recording performance metrics of a single training execution."""
    algorithm_name: str
    wall_time_sec: float
    peak_memory_mb: float
    sample_queries: int
    total_samples: int
    query_reduction_pct: float
    additional_metadata: Dict[str, Any] = field(default_factory=dict)


class MABProfiler:
    """Profiles memory usage, latency, and sample efficiency of tree learning algorithms."""

    def __init__(self):
        self.history: List[ProfileSnapshot] = []

    def profile_training(
        self,
        name: str,
        fit_fn: Callable[[], Any],
        total_samples: int,
        get_sample_queries_fn: Optional[Callable[[], int]] = None,
        **metadata
    ) -> ProfileSnapshot:
        """Profile execution of a fitting routine with memory and latency instrumentation.

        Args:
            name: Identifier for the model/configuration.
            fit_fn: Zero-argument callable running model.fit().
            total_samples: Total number of samples N in training split.
            get_sample_queries_fn: Optional callable returning number of evaluated samples.
            **metadata: Additional attributes to attach to snapshot.

        Returns:
            ProfileSnapshot object with execution metrics.
        """
        tracemalloc.start()
        start_time = time.perf_counter()

        fit_fn()

        elapsed_sec = time.perf_counter() - start_time
        current_mem, peak_mem = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        peak_mb = peak_mem / (1024.0 * 1024.0)

        queries = get_sample_queries_fn() if get_sample_queries_fn else total_samples
        reduction_pct = max(0.0, 100.0 * (1.0 - queries / max(total_samples, 1)))

        snapshot = ProfileSnapshot(
            algorithm_name=name,
            wall_time_sec=elapsed_sec,
            peak_memory_mb=peak_mb,
            sample_queries=queries,
            total_samples=total_samples,
            query_reduction_pct=reduction_pct,
            additional_metadata=metadata
        )
        self.history.append(snapshot)
        return snapshot

    def format_summary_table(self) -> str:
        """Format profiling history into markdown table."""
        if not self.history:
            return "No profiling snapshots recorded."

        lines = [
            "| Algorithm / Config | Wall Time (s) | Peak RAM (MB) | Samples Queried | Query Reduction (%) |",
            "|---|---|---|---|---|"
        ]
        for s in self.history:
            lines.append(
                f"| {s.algorithm_name} | {s.wall_time_sec:.4f}s | {s.peak_memory_mb:.2f} MB | "
                f"{s.sample_queries:,} / {s.total_samples:,} | {s.query_reduction_pct:.1f}% |"
            )
        return "\n".join(lines)
