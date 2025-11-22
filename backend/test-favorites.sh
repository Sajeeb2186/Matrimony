#!/bin/bash

# Login first
echo "1. Logging in..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@matrimony.com","password":"Admin@123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi

echo "✅ Login successful"
echo ""

# Test add to favorites
echo "2. Adding profile to favorites..."
FAVORITE_RESPONSE=$(curl -s -X POST http://localhost:5000/api/interaction/favorite/MAT010001 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json')

echo "Response: $FAVORITE_RESPONSE"
echo ""

# Test get favorites
echo "3. Getting favorites list..."
FAVORITES=$(curl -s http://localhost:5000/api/interaction/favorites \
  -H "Authorization: Bearer $TOKEN")

echo "Favorites: $FAVORITES"
echo ""

# Test add to shortlist
echo "4. Adding profile to shortlist..."
SHORTLIST_RESPONSE=$(curl -s -X POST http://localhost:5000/api/interaction/shortlist/MAT010001 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json')

echo "Response: $SHORTLIST_RESPONSE"
echo ""

# Test get shortlists
echo "5. Getting shortlists..."
SHORTLISTS=$(curl -s http://localhost:5000/api/interaction/shortlists \
  -H "Authorization: Bearer $TOKEN")

echo "Shortlists: $SHORTLISTS"
