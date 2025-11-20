#!/bin/bash

# Admin Account Creation Script for Matrimony App
# This script creates the first admin account for the application

echo "======================================"
echo "  Matrimony Admin Account Setup"
echo "======================================"
echo ""

# Check if backend is running
if ! curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "❌ Error: Backend server is not running!"
    echo "Please start the backend first:"
    echo "  cd backend && npm start"
    exit 1
fi

echo "✅ Backend server is running"
echo ""

# Prompt for admin details
read -p "Enter admin email (default: admin@matrimony.com): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@matrimony.com}

read -p "Enter admin phone (default: +919999999999): " ADMIN_PHONE
ADMIN_PHONE=${ADMIN_PHONE:-+919999999999}

read -sp "Enter admin password (default: Admin@123): " ADMIN_PASSWORD
echo ""
ADMIN_PASSWORD=${ADMIN_PASSWORD:-Admin@123}

echo ""
echo "Creating admin account with:"
echo "  Email: $ADMIN_EMAIL"
echo "  Phone: $ADMIN_PHONE"
echo ""

# Create admin account
RESPONSE=$(curl -s -X POST http://localhost:5000/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"phone\":\"$ADMIN_PHONE\",\"password\":\"$ADMIN_PASSWORD\"}")

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Admin account created successfully!"
    echo ""
    echo "======================================"
    echo "  Admin Credentials"
    echo "======================================"
    echo "Email: $ADMIN_EMAIL"
    echo "Password: $ADMIN_PASSWORD"
    echo "======================================"
    echo ""
    echo "You can now login at: http://localhost:3000/login"
else
    echo "❌ Failed to create admin account"
    echo "Response: $RESPONSE"
    exit 1
fi
