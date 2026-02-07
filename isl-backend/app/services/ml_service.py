import cv2
import joblib
import mediapipe as mp
import numpy as np
from typing import Optional, List, Tuple
import os

class MLService:
    """
    Machine Learning service for gesture recognition and sign language processing
    """
    
    def __init__(self):
        # Initialize MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils
        
        # Trained models from ml_models/ (gesture_model + label_encoder/sign detector)
        self.gesture_model = None
        self.label_encoder = None  # sign detector - decodes indices to sign names

        # Fallback gesture labels when label_encoder is not loaded
        self.gesture_labels = {
            0: "Hello",
            1: "Thank you",
            2: "Yes",
            3: "No",
            4: "Please",
            5: "Sorry",
            6: "Help",
            7: "Good",
            8: "Bad",
            9: "Water"
        }
    
    def load_models(
        self,
        gesture_model_path: str = None,
        label_encoder_path: str = None,
    ):
        """
        Load trained ML models from ml_models/ directory.
        label_encoder = sign detector (decodes gesture indices to sign names).
        """
        try:
            if gesture_model_path and os.path.exists(gesture_model_path):
                self.gesture_model = joblib.load(gesture_model_path)
                print(f"✅ Gesture model loaded from {gesture_model_path}")
            else:
                print("⚠️  Gesture model not found - using mock predictions")

            if label_encoder_path and os.path.exists(label_encoder_path):
                self.label_encoder = joblib.load(label_encoder_path)
                self.gesture_labels = {
                    i: label for i, label in enumerate(self.label_encoder.classes_)
                }
                print(f"✅ Sign detector (label_encoder) loaded from {label_encoder_path}")
            else:
                print("⚠️  Sign detector not found - using fallback gesture labels")
        except Exception as e:
            print(f"❌ Error loading models: {e}")
    
    def extract_hand_landmarks(self, image: np.ndarray) -> Optional[List[float]]:
        """
        Extract hand landmarks from image using MediaPipe
        """
        try:
            # Convert BGR to RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Process image
            results = self.hands.process(image_rgb)
            
            if results.multi_hand_landmarks:
                # Get first hand landmarks
                hand_landmarks = results.multi_hand_landmarks[0]
                
                # Extract landmark coordinates
                landmarks = []
                for landmark in hand_landmarks.landmark:
                    landmarks.extend([landmark.x, landmark.y, landmark.z])
                
                return landmarks
            
            return None
        except Exception as e:
            print(f"Error extracting landmarks: {e}")
            return None
    
    def process_gesture(self, image: np.ndarray) -> Tuple[Optional[str], Optional[float]]:
        """
        Process image and predict gesture
        Returns: (predicted_text, confidence_score)
        """
        try:
            # Extract hand landmarks
            landmarks = self.extract_hand_landmarks(image)
            
            if landmarks is None:
                return None, None
            
            # If model is loaded, use it for prediction
            if self.gesture_model is not None:
                landmarks_array = np.array(landmarks).reshape(1, -1)
                if hasattr(self.gesture_model, "predict_proba"):
                    pred_proba = self.gesture_model.predict_proba(landmarks_array)[0]
                    predicted_label = int(np.argmax(pred_proba))
                    confidence = float(np.max(pred_proba))
                else:
                    predicted_label = int(self.gesture_model.predict(landmarks_array)[0])
                    confidence = 0.9
                if self.label_encoder is not None:
                    predicted_text = self.label_encoder.inverse_transform([predicted_label])[0]
                else:
                    predicted_text = self.gesture_labels.get(predicted_label, "Unknown")
            else:
                # Mock prediction when model not loaded
                import random
                predicted_label = random.randint(0, 9)
                confidence = random.uniform(0.7, 0.95)
                predicted_text = self.gesture_labels.get(predicted_label, "Unknown")
            return predicted_text, confidence
            
        except Exception as e:
            print(f"Error processing gesture: {e}")
            return None, None
    
    def speech_to_sign(self, text: str) -> List[str]:
        """
        Convert text to sign language gestures
        Returns list of gesture names/animations
        """
        try:
            # Split text into words
            words = text.lower().split()
            
            # Map words to gestures (this is a simplified example)
            gestures = []
            for word in words:
                # Check if word has a direct gesture mapping
                gesture_found = False
                for label_id, label_text in self.gesture_labels.items():
                    if label_text.lower() == word:
                        gestures.append(label_text)
                        gesture_found = True
                        break
                
                if not gesture_found:
                    # Spell out word letter by letter (fingerspelling)
                    for char in word:
                        if char.isalpha():
                            gestures.append(f"letter_{char.upper()}")
            
            return gestures
        except Exception as e:
            print(f"Error converting speech to sign: {e}")
            return []

# Global ML service instance
ml_service = MLService()
