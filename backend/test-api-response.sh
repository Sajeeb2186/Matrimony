#!/bin/bash

# Login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"iamsajeeb2186@gmail.com","password":"Sajeeb@123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi

echo "✅ Logged in"
echo ""

# Get favorites
echo "📋 FAVORITES API RESPONSE:"
curl -s http://localhost:5000/api/interaction/favorites \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool

echo ""
echo ""

# Get shortlists
echo "📋 SHORTLISTS API RESPONSE:"
curl -s http://localhost:5000/api/interaction/shortlists \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool
