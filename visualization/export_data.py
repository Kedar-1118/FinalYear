"""Prepares and packages dataset analysis data for the visualization frontend.
Generates visualization/data.js and copies individual JSON files into visualization/data/.
"""

import os
import json
import shutil

VIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATASETS_RESULTS_DIR = os.path.abspath(os.path.join(VIS_DIR, "..", "datasets", "analysis", "results"))
OUTPUT_DATA_DIR = os.path.join(VIS_DIR, "data")
os.makedirs(OUTPUT_DATA_DIR, exist_ok=True)

files = ["adult_analysis.json", "covertype_analysis.json", "higgs_analysis.json", "synthetic_analysis.json", "benchmark_summary.json"]

combined_data = {}

for f in files:
    src_path = os.path.join(DATASETS_RESULTS_DIR, f)
    dst_path = os.path.join(OUTPUT_DATA_DIR, f)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        key = f.replace("_analysis.json", "").replace(".json", "")
        with open(src_path, "r", encoding="utf-8") as json_file:
            combined_data[key] = json.load(json_file)

# Write to data.js for zero-CORS direct file:/// loading
data_js_path = os.path.join(VIS_DIR, "data.js")
with open(data_js_path, "w", encoding="utf-8") as js_file:
    js_file.write("// Pre-packaged Benchmark Dataset Analysis and Tree Split Hierarchies\n")
    js_file.write("window.MAB_ANALYSIS_DATA = ")
    json.dump(combined_data, js_file, indent=2)
    js_file.write(";\n")

print(f"Data successfully exported to {data_js_path} and {OUTPUT_DATA_DIR}")
