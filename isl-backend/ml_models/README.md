# ML Models Directory

Place your trained machine learning models here:

- `gesture_model.pkl` - Gesture recognition model (scikit-learn, loaded via joblib)
- `label_encoder.pkl` - Sign detector (decodes predicted indices to sign/gesture names)

The backend loads both on startup. Mock predictions are used if either file is missing.
