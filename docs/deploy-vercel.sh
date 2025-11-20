#!/bin/bash

# Matrimony App - Vercel Deployment Script
# This script helps you deploy both backend and frontend to Vercel

echo "========================================"
echo "  Matrimony App - Vercel Deployment"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        echo "Please install manually: npm install -g vercel"
        exit 1
    fi
    echo "✅ Vercel CLI installed successfully"
fi

echo "✅ Vercel CLI is installed"
echo ""

# Login to Vercel
echo "Logging in to Vercel..."
vercel login

echo ""
echo "========================================"
echo "  Step 1: Deploy Backend"
echo "========================================"
echo ""

cd backend

echo "Deploying backend to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed"
    exit 1
fi

echo ""
echo "✅ Backend deployed successfully!"
echo ""
echo "Please note your backend URL from above."
echo "You'll need it for frontend configuration."
echo ""
read -p "Enter your backend URL (e.g., https://matrimony-backend.vercel.app): " BACKEND_URL

echo ""
echo "========================================"
echo "  Step 2: Deploy Frontend"
echo "========================================"
echo ""

cd ../frontend

# Create .env.production file
echo "Creating production environment file..."
echo "REACT_APP_API_URL=${BACKEND_URL}/api" > .env.production

echo "Deploying frontend to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed"
    exit 1
fi

echo ""
echo "✅ Frontend deployed successfully!"
echo ""
echo "========================================"
echo "  Deployment Complete!"
echo "========================================"
echo ""
echo "⚠️  IMPORTANT: Next Steps"
echo ""
echo "1. Go to your backend project on Vercel Dashboard"
echo "2. Add these environment variables:"
echo "   - MONGODB_URI (MongoDB Atlas connection string)"
echo "   - JWT_SECRET (random secret key)"
echo "   - CORS_ORIGIN (your frontend URL)"
echo "   - FRONTEND_URL (your frontend URL)"
echo "   - EMAIL_* variables (for email functionality)"
echo ""
echo "3. Redeploy backend after adding env variables"
echo ""
echo "4. Create admin account:"
echo "   curl -X POST ${BACKEND_URL}/api/dev/create-admin \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"admin@matrimony.com\",\"phone\":\"+919999999999\",\"password\":\"Admin@123\"}'"
echo ""
echo "5. Visit your app and start using it!"
echo ""
echo "========================================"
echo ""
echo "📖 For detailed instructions, see VERCEL_DEPLOYMENT_GUIDE.md"
echo ""

cd ..
