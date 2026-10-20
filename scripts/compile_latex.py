"""
Automated LaTeX compilation script for MABSplit research paper.
Uses local portable Tectonic TeX engine or system pdflatex/latexmk.
"""

import os
import sys
import subprocess

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PAPER_DIR = os.path.join(PROJECT_ROOT, "research_paper")
TECTONIC_BIN = os.path.join(PROJECT_ROOT, "tools", "bin", "tectonic.exe")

def compile_paper():
    print(f"[*] Compiling LaTeX manuscript in: {PAPER_DIR}")
    
    # Check if local tectonic binary exists
    if os.path.isfile(TECTONIC_BIN):
        cmd = [TECTONIC_BIN, "main.tex"]
        print(f"[*] Running Tectonic engine: {' '.join(cmd)}")
        result = subprocess.run(cmd, cwd=PAPER_DIR)
        if result.returncode == 0:
            pdf_path = os.path.join(PAPER_DIR, "main.pdf")
            print(f"[SUCCESS] Successfully compiled manuscript to:\n  -> {pdf_path}")
            return 0
        else:
            print(f"[ERROR] Tectonic compilation failed with code {result.returncode}")
            return result.returncode

    # Fallback to system pdflatex
    print("[*] Tectonic not found; checking for system pdflatex...")
    try:
        subprocess.run(["pdflatex", "-interaction=nonstopmode", "main.tex"], cwd=PAPER_DIR, check=True)
        subprocess.run(["bibtex", "main"], cwd=PAPER_DIR, check=True)
        subprocess.run(["pdflatex", "-interaction=nonstopmode", "main.tex"], cwd=PAPER_DIR, check=True)
        subprocess.run(["pdflatex", "-interaction=nonstopmode", "main.tex"], cwd=PAPER_DIR, check=True)
        print(f"[SUCCESS] Successfully compiled manuscript using pdflatex.")
        return 0
    except (FileNotFoundError, subprocess.CalledProcessError) as e:
        print(f"[ERROR] Compilation error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(compile_paper())
