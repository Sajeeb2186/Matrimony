#!/bin/bash

# Backend API Test Script
# Tests all major endpoints to verify functionality

API_URL="http://localhost:5000/api"
TOKEN=""
PROFILE_ID=""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting API Endpoint Tests...${NC}"
echo "=================================================="

# Test counter
PASSED=0
FAILED=0

test_endpoint() {
    local name=$1
    local command=$2
    
    echo -e "\n${BLUE}📍 Testing: $name${NC}"
    
    if eval "$command" > /tmp/test_output.json 2>&1; then
        if grep -q '"success":true' /tmp/test_output.json 2>/dev/null || grep -q '"status":"OK"' /tmp/test_output.json 2>/dev/null; then
            echo -e "${GREEN}✅ PASSED: $name${NC}"
            PASSED=$((PASSED + 1))
            return 0
        fi
    fi
    
    echo -e "${RED}❌ FAILED: $name${NC}"
    cat /tmp/test_output.json 2>/dev/null | head -n 5
    FAILED=$((FAILED + 1))
    return 1
}

# 1. Test Authentication
echo -e "\n${BLUE}📁 AUTHENTICATION TESTS${NC}"

if test_endpoint "Login" "curl -s -X POST $API_URL/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"admin@matrimony.com\",\"password\":\"Admin@123\"}'"; then
    TOKEN=$(cat /tmp/test_output.json | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}   Token obtained: ${TOKEN:0:30}...${NC}"
fi

# 2. Test Profile Endpoints
echo -e "\n${BLUE}📁 PROFILE TESTS${NC}"

test_endpoint "Get My Profile" "curl -s $API_URL/profile/me -H 'Authorization: Bearer $TOKEN'"

if grep -q '"profileId"' /tmp/test_output.json 2>/dev/null; then
    PROFILE_ID=$(cat /tmp/test_output.json | grep -o '"profileId":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}   Profile ID: $PROFILE_ID${NC}"
fi

test_endpoint "Get All Profiles (Dev)" "curl -s $API_URL/dev/profiles"

# 3. Test Interaction Endpoints
echo -e "\n${BLUE}📁 INTERACTION TESTS${NC}"

# Get another profile ID for testing
OTHER_PROFILE=$(curl -s $API_URL/dev/profiles | grep -o '"profileId":"MP[^"]*"' | head -n 2 | tail -n 1 | cut -d'"' -f4)

if [ -n "$OTHER_PROFILE" ] && [ "$OTHER_PROFILE" != "$PROFILE_ID" ]; then
    echo -e "${YELLOW}   Using target profile: $OTHER_PROFILE${NC}"
    
    test_endpoint "Send Interest" "curl -s -X POST $API_URL/interaction/interest/$OTHER_PROFILE -H 'Authorization: Bearer $TOKEN' -H 'Content-Type: application/json' -d '{\"message\":\"Test interest\"}'"
    
    test_endpoint "Add to Shortlist" "curl -s -X POST $API_URL/interaction/shortlist/$OTHER_PROFILE -H 'Authorization: Bearer $TOKEN'"
    
    test_endpoint "Add to Favorites" "curl -s -X POST $API_URL/interaction/favorite/$OTHER_PROFILE -H 'Authorization: Bearer $TOKEN'"
fi

test_endpoint "Get Sent Interests" "curl -s $API_URL/interaction/interests/sent -H 'Authorization: Bearer $TOKEN'"

test_endpoint "Get Received Interests" "curl -s $API_URL/interaction/interests/received -H 'Authorization: Bearer $TOKEN'"

test_endpoint "Get Shortlists" "curl -s $API_URL/interaction/shortlists -H 'Authorization: Bearer $TOKEN'"

test_endpoint "Get Favorites" "curl -s $API_URL/interaction/favorites -H 'Authorization: Bearer $TOKEN'"

# 4. Test Match Endpoints
echo -e "\n${BLUE}📁 MATCH TESTS${NC}"

test_endpoint "Get Match Suggestions" "curl -s $API_URL/match/suggestions -H 'Authorization: Bearer $TOKEN'"

# 5. Test Search Endpoints
echo -e "\n${BLUE}📁 SEARCH TESTS${NC}"

test_endpoint "Search Profiles" "curl -s '$API_URL/search/profiles?gender=female' -H 'Authorization: Bearer $TOKEN'"

# 6. Test Chat Endpoints
echo -e "\n${BLUE}📁 CHAT TESTS${NC}"

test_endpoint "Get Conversations" "curl -s $API_URL/chat/conversations -H 'Authorization: Bearer $TOKEN'"

# Summary
echo -e "\n=================================================="
echo -e "${BLUE}📊 TEST SUMMARY${NC}"
echo "=================================================="
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo -e "${BLUE}📈 Total:  $((PASSED + FAILED))${NC}"

TOTAL=$((PASSED + FAILED))
if [ $TOTAL -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=2; $PASSED * 100 / $TOTAL" | bc)
    echo -e "${BLUE}🎯 Success Rate: ${SUCCESS_RATE}%${NC}"
fi

# Cleanup
rm -f /tmp/test_output.json

exit $FAILED
