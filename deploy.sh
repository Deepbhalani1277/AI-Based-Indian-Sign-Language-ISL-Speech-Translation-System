#!/bin/bash

# Quick Deployment Script for ISL Translation System
# This script helps you deploy to Vercel and Render

echo "============================================================"
echo "🚀 ISL Translation System - Deployment Helper"
echo "============================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - ISL Translation System"
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "============================================================"
echo "📋 Pre-Deployment Checklist"
echo "============================================================"
echo ""

# Check frontend build
echo "🔍 Checking frontend build..."
cd isl-frontend
if npm run build; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed. Please fix errors before deploying."
    exit 1
fi
cd ..

# Check backend dependencies
echo ""
echo "🔍 Checking backend dependencies..."
cd isl-backend
if pip install -r requirements.txt --dry-run > /dev/null 2>&1; then
    echo "✅ Backend dependencies are valid"
else
    echo "⚠️  Some backend dependencies may have issues"
fi
cd ..

echo ""
echo "============================================================"
echo "📤 Deployment Options"
echo "============================================================"
echo ""
echo "1. Deploy Frontend to Vercel"
echo "2. Deploy Backend to Render"
echo "3. Deploy Both (Recommended)"
echo "4. Exit"
echo ""
read -p "Choose an option (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🎨 Deploying Frontend to Vercel..."
        echo ""
        echo "Next steps:"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'New Project'"
        echo "3. Import your GitHub repository"
        echo "4. Set Root Directory to: isl-frontend"
        echo "5. Framework: Vite"
        echo "6. Click Deploy"
        echo ""
        ;;
    2)
        echo ""
        echo "🐍 Deploying Backend to Render..."
        echo ""
        echo "Next steps:"
        echo "1. Go to https://render.com"
        echo "2. Click 'New +' → 'Blueprint'"
        echo "3. Connect your GitHub repository"
        echo "4. Select render.yaml"
        echo "5. Click Apply"
        echo ""
        ;;
    3)
        echo ""
        echo "🚀 Deploying Full Stack Application..."
        echo ""
        echo "Step 1: Deploy Backend First"
        echo "1. Go to https://render.com"
        echo "2. Click 'New +' → 'Blueprint'"
        echo "3. Connect your GitHub repository"
        echo "4. Select render.yaml"
        echo "5. Click Apply"
        echo "6. Wait for deployment to complete"
        echo "7. Copy your backend URL (e.g., https://isl-backend-xxxx.onrender.com)"
        echo ""
        echo "Step 2: Deploy Frontend"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'New Project'"
        echo "3. Import your GitHub repository"
        echo "4. Set Root Directory to: isl-frontend"
        echo "5. Framework: Vite"
        echo "6. Add Environment Variables:"
        echo "   VITE_API_URL=<your-backend-url>"
        echo "   VITE_SOCKET_URL=<your-backend-url>"
        echo "7. Click Deploy"
        echo ""
        ;;
    4)
        echo "👋 Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo "============================================================"
echo "📚 Additional Resources"
echo "============================================================"
echo ""
echo "📖 Full deployment guide: DEPLOYMENT.md"
echo "🔗 Vercel: https://vercel.com/docs"
echo "🔗 Render: https://render.com/docs"
echo ""
echo "✅ Good luck with your deployment! 🚀"
echo ""
