# 🧠 Training Environment Setup Guide

To ensure your model trains consistently on any machine, follow these steps exactly using the `training_requirements.txt` file I created.

---

## 1️⃣ Pre-requisites
- **Python Version**: Ensure you have Python **3.10.x** installed. (MediaPipe works best with 3.8 - 3.10).
  - Download: [Python 3.10.11](https://www.python.org/downloads/release/python-31011/)

## 2️⃣ Setting Up the Environment (Windows)

1. **Clone/Copy your project folder** to the new PC.
2. Open a terminal (PowerShell or Command Prompt) in the project folder.
3. **Create a virtual environment**:
   ```powershell
   python -m venv training_env
   ```
4. **Activate the environment**:
   ```powershell
   .\training_env\Scripts\Activate
   ```
   *(You should see `(training_env)` at the start of your command line)*

## 3️⃣ Installing Dependencies

Run this command to install the **exact versions** needed:

```powershell
pip install -r training_requirements.txt
```

---

## 4️⃣ Verifying Installation

Create a file named `check_env.py` and run it to confirm everything is perfect:

```python
import sys
import cv2
import mediapipe
import sklearn
import numpy

print(f"Python Version: {sys.version}")
print(f"OpenCV Version: {cv2.__version__}")
print(f"MediaPipe Version: {mediapipe.__version__}")
print(f"Scikit-Learn Version: {sklearn.__version__}")
print(f"NumPy Version: {numpy.__version__}")

# Expected Output:
# Python Version: 3.10.x ...
# OpenCV Version: 4.8.1.78
# MediaPipe Version: 0.10.8
# Scikit-Learn Version: 1.3.2
# NumPy Version: 1.24.3
```

---

## 5️⃣ Troubleshooting Common Issues

### ❌ `ERROR: No matching distribution found for mediapipe==0.10.8`
- **Cause:** You are likely using Python 3.11 or 3.12.
- **Fix:** Install Python 3.10 and recreate the venv using `py -3.10 -m venv training_env`.

### ❌ `ImportError: DLL load failed` (OpenCV)
- **Cause:** Missing Visual C++ Redistributable.
- **Fix:** Install the latest [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170).

---

## 6️⃣ Running Jupyter Notebook (Optional)

If you want to experiment with code interactively:
1. Ensure the training environment is active.
2. Run:
   ```powershell
   jupyter lab
   ```
3. This will open a browser window where you can run `.ipynb` files.
