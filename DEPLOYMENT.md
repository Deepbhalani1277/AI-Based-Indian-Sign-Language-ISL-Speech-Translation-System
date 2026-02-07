# 🚀 Deployment Guide - ISL Translation System

Complete guide to deploy your ISL Translation System with ML models to free hosting platforms.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [ML Model Handling](#ml-model-handling)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Testing Deployment](#testing-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

### Required Accounts (All Free):
- ✅ GitHub account
- ✅ Vercel account (sign up with GitHub)
- ✅ Render account (sign up with GitHub)

### Required Tools:
- ✅ Git installed
- ✅ Node.js 16+ installed
- ✅ Python 3.10+ installed

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

```bash
cd isl-frontend

# Install dependencies
npm install

# Test build locally
npm run build

# Check if dist/ folder is created
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
cd ..
git init
git add .
git commit -m "Initial commit - ISL Translation System"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/isl-translation-system.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Click:** "New Project"
3. **Import:** Your GitHub repository
4. **Configure:**
   - Framework Preset: `Vite`
   - Root Directory: `isl-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_SOCKET_URL=https://your-backend.onrender.com
   ```
   (You'll update this after deploying backend)

6. **Click:** "Deploy"

### Step 4: Get Frontend URL

After deployment, you'll get a URL like:
```
https://isl-translation-system.vercel.app
```

---

## 🐍 Backend Deployment (Render)

### Step 1: Prepare ML Models

**IMPORTANT:** Optimize your models for deployment!

```bash
cd isl-backend/ml_models

# Check model sizes
# If models are > 100MB, compress them:
```

**Option A: Use Model Compression**
```python
# compress_model.py
import pickle
import gzip

# Load your model
with open('gesture_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Save compressed
with gzip.open('gesture_model.pkl.gz', 'wb') as f:
    pickle.dump(model, f, protocol=pickle.HIGHEST_PROTOCOL)
```

**Option B: Use External Storage (Recommended for large models)**
- Upload models to Google Drive
- Use Dropbox
- Use AWS S3 free tier
- Download on startup

### Step 2: Update requirements.txt

Make sure all dependencies are listed:

```bash
cd isl-backend
pip freeze > requirements.txt
```

### Step 3: Create Render Configuration

Already created in `render.yaml`! ✅

### Step 4: Deploy to Render

1. **Go to:** https://render.com
2. **Click:** "New +"
3. **Select:** "Blueprint"
4. **Connect:** Your GitHub repository
5. **Select:** `render.yaml` file
6. **Click:** "Apply"

Render will:
- ✅ Create PostgreSQL database
- ✅ Deploy backend service
- ✅ Set up environment variables
- ✅ Install dependencies

### Step 5: Get Backend URL

After deployment, you'll get a URL like:
```
https://isl-backend-xxxx.onrender.com
```

### Step 6: Update Frontend Environment

Go back to Vercel:
1. **Project Settings** → **Environment Variables**
2. **Update:**
   ```
   VITE_API_URL=https://isl-backend-xxxx.onrender.com
   VITE_SOCKET_URL=https://isl-backend-xxxx.onrender.com
   ```
3. **Redeploy** frontend

---

## 🤖 ML Model Handling

### Option 1: Include Models in Repo (< 100MB)

```bash
# Add models to git
cd isl-backend
git add ml_models/gesture_model.pkl
git add ml_models/sign_detector.h5
git commit -m "Add ML models"
git push
```

### Option 2: Download Models on Startup (> 100MB)

**1. Upload models to cloud storage:**
- Google Drive (get shareable link)
- Dropbox
- GitHub Releases

**2. Update `ml_service.py`:**

```python
import os
import requests
import gdown

class MLService:
    def __init__(self):
        self.gesture_model = None
        self.sign_detector = None
        self.hands = mp.solutions.hands.Hands(...)
        
        # Download models if not present
        self._download_models()
        self._load_models()
    
    def _download_models(self):
        """Download models from cloud storage"""
        gesture_model_path = "ml_models/gesture_model.pkl"
        
        if not os.path.exists(gesture_model_path):
            print("Downloading gesture model...")
            # Google Drive example
            url = "https://drive.google.com/uc?id=YOUR_FILE_ID"
            gdown.download(url, gesture_model_path, quiet=False)
```

**3. Add to requirements.txt:**
```
gdown==4.7.1
```

### Option 3: Use Model Registry (Advanced)

- Hugging Face Model Hub
- MLflow
- DVC (Data Version Control)

---

## 🗄️ Database Setup

### Automatic Setup (Render)

Render automatically creates PostgreSQL database! ✅

### Manual Migration (if needed)

```bash
# After deployment, run migrations
# SSH into Render shell or use Render dashboard

python -c "from app.utils.database import init_db; init_db()"
```

### Database Connection String

Render provides this automatically in `DATABASE_URL` environment variable.

Format:
```
postgresql://user:password@host:5432/database
```

---

## 🔐 Environment Variables

### Backend (Render)

Set these in Render dashboard:

```env
DATABASE_URL=<auto-generated>
SECRET_KEY=<auto-generated>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=False
HOST=0.0.0.0
PORT=10000
```

### Frontend (Vercel)

Set these in Vercel dashboard:

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SOCKET_URL=https://your-backend.onrender.com
```

---

## 🧪 Testing Deployment

### 1. Test Backend API

```bash
# Health check
curl https://your-backend.onrender.com/health

# API docs
# Visit: https://your-backend.onrender.com/docs
```

### 2. Test Frontend

```bash
# Visit your Vercel URL
# https://your-app.vercel.app

# Test features:
# - Sign up
# - Login
# - Camera access
# - Speech recognition
# - ISL conversion
```

### 3. Test Database

```bash
# Create a user via frontend
# Check if it's saved in database
# Login with that user
```

---

## 🐛 Troubleshooting

### Issue: "Module not found"

**Solution:**
```bash
# Make sure all dependencies are in requirements.txt
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Update dependencies"
git push
```

### Issue: "Database connection failed"

**Solution:**
- Check `DATABASE_URL` in Render environment variables
- Ensure PostgreSQL database is running
- Check database connection string format

### Issue: "Models not loading"

**Solution:**
```python
# Add error handling in ml_service.py
try:
    self.gesture_model = pickle.load(f)
except Exception as e:
    print(f"Model loading failed: {e}")
    self.gesture_model = None  # Use mock predictions
```

### Issue: "Camera not working"

**Solution:**
- Ensure HTTPS is enabled (Vercel provides this automatically)
- Check browser permissions
- Test on Chrome/Edge (best support)

### Issue: "Render service sleeping"

**Solution:**
- Free tier sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up
- Consider using a ping service (cron-job.org) to keep it awake

### Issue: "Build failed - Out of memory"

**Solution:**
```bash
# Reduce model size
# Use model compression
# Or upgrade to paid tier
```

---

## 📊 Monitoring

### Render Dashboard
- View logs
- Check resource usage
- Monitor database

### Vercel Dashboard
- View deployment logs
- Check analytics
- Monitor performance

---

## 💰 Cost Optimization

### Free Tier Limits:

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS

**Render:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ 1GB PostgreSQL storage
- ⚠️ Sleeps after 15 min inactivity

### Tips to Stay Free:
1. Optimize model sizes
2. Use caching
3. Compress images
4. Minimize API calls

---

## 🎯 Next Steps

After successful deployment:

1. ✅ **Custom Domain** - Add your own domain (free on Vercel)
2. ✅ **SSL Certificate** - Automatic on both platforms
3. ✅ **Monitoring** - Set up error tracking (Sentry free tier)
4. ✅ **Analytics** - Add Google Analytics
5. ✅ **CI/CD** - Automatic deployment on git push (already set up!)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs
2. Check Vercel logs
3. Test locally first
4. Check environment variables
5. Verify database connection

---

**Good luck with your deployment! 🚀**
