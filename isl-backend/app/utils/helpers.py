import base64
import io
from PIL import Image
import numpy as np
from typing import Optional

def decode_base64_image(base64_string: str) -> Optional[np.ndarray]:
    """
    Decode base64 string to numpy array image
    """
    try:
        # Remove data URL prefix if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        # Decode base64
        image_data = base64.b64decode(base64_string)
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to numpy array
        image_array = np.array(image)
        return image_array
    except Exception as e:
        print(f"Error decoding image: {e}")
        return None

def encode_image_to_base64(image_array: np.ndarray) -> str:
    """
    Encode numpy array image to base64 string
    """
    try:
        image = Image.fromarray(image_array)
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        print(f"Error encoding image: {e}")
        return ""

def validate_email(email: str) -> bool:
    """Simple email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None
