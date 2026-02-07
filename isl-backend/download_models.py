"""
Model Download Script for Deployment
Downloads ML models from cloud storage on server startup
"""

import os
import sys
import requests
from pathlib import Path

def download_file(url, destination):
    """Download file from URL to destination"""
    print(f"Downloading {destination}...")
    
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(destination), exist_ok=True)
        
        # Download with progress
        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        
        with open(destination, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        progress = (downloaded / total_size) * 100
                        print(f"\rProgress: {progress:.1f}%", end='')
        
        print(f"\n✅ Downloaded {destination}")
        return True
        
    except Exception as e:
        print(f"\n❌ Failed to download {destination}: {e}")
        return False

def download_models():
    """Download all required ML models"""
    
    models_dir = Path("ml_models")
    models_dir.mkdir(exist_ok=True)
    
    # Define your model URLs here
    # Replace these with your actual model URLs
    models = {
        "gesture_model.pkl": {
            "url": "YOUR_GOOGLE_DRIVE_LINK_OR_DROPBOX_LINK",
            "required": True
        },
        "label_encoder.pkl": {
            "url": "YOUR_GOOGLE_DRIVE_LINK_OR_DROPBOX_LINK",
            "required": True
        }
    }
    
    print("=" * 60)
    print("🤖 ML Model Download Script")
    print("=" * 60)
    
    for model_name, config in models.items():
        model_path = models_dir / model_name
        
        # Skip if already exists
        if model_path.exists():
            print(f"✅ {model_name} already exists, skipping...")
            continue
        
        # Check if URL is configured
        if config["url"] == "YOUR_GOOGLE_DRIVE_LINK_OR_DROPBOX_LINK":
            print(f"⚠️  {model_name} URL not configured")
            if config["required"]:
                print(f"   This model is required. Please update the URL in download_models.py")
            continue
        
        # Download the model
        success = download_file(config["url"], str(model_path))
        
        if not success and config["required"]:
            print(f"❌ Failed to download required model: {model_name}")
            sys.exit(1)
    
    print("\n" + "=" * 60)
    print("✅ Model download complete!")
    print("=" * 60)

if __name__ == "__main__":
    download_models()
