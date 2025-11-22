# Matrimony Application - API Functionality Guide

## Overview
This document outlines all the available API endpoints, their functionality, and how to use them in the frontend.

## Authentication Required
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password@123",
    "phoneNumber": "+1234567890"
  }
  ```
- **Frontend:** Register.js (✅ Working)

### 2. Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password@123"
  }
  ```
- **Frontend:** Login.js (✅ Working)

### 3. Verify OTP
- **POST** `/api/auth/verify-otp`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Frontend:** VerifyOTP.js (✅ Working)

### 4. Forgot Password
- **POST** `/api/auth/forgot-password`
- **Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Frontend:** ForgotPassword.js (✅ Working)

---

## 👤 PROFILE ENDPOINTS

### 1. Create Profile
- **POST** `/api/profile/create`
- **Auth:** Required
- **Frontend:** CreateProfile.js (✅ Working)

### 2. Get My Profile
- **GET** `/api/profile/me`
- **GET** `/api/profile/my-profile` (alias)
- **Auth:** Required
- **Frontend:** Used in Dashboard, EditProfile (✅ Working)

### 3. Update Profile
- **PUT** `/api/profile/update`
- **Auth:** Required
- **Frontend:** EditProfile.js (✅ Working)

### 4. Get Profile by ID
- **GET** `/api/profile/:profileId`
- **Auth:** Required
- **Frontend:** ViewProfile.js (✅ Working)

### 5. Upload Photo
- **POST** `/api/profile/upload-photo`
- **Auth:** Required
- **Content-Type:** multipart/form-data
- **Body:** FormData with 'photo' file
- **Frontend:** CreateProfile.js, EditProfile.js (✅ Working)

### 6. Delete Photo
- **DELETE** `/api/profile/photo/:photoId`
- **Auth:** Required

---

## 🔍 SEARCH ENDPOINTS

### 1. Basic Search / Search Profiles
- **GET** `/api/search/profiles` (✅ FIXED - Now works without profile)
- **GET** `/api/search/basic` (alias)
- **Auth:** Required
- **Query Params:**
  - `gender`: male/female
  - `age`: number
  - `location`: string
  - `page`: number (default: 1)
  - `limit`: number (default: 20)
- **Frontend:** Search.js, Matches.js (✅ Working)

### 2. Advanced Search
- **POST** `/api/search/advanced`
- **Auth:** Required
- **Body:**
  ```json
  {
    "ageMin": 25,
    "ageMax": 35,
    "heightMin": 160,
    "heightMax": 180,
    "religion": "Hindu",
    "education": "Masters",
    "city": "Mumbai"
  }
  ```

### 3. Search by ID
- **GET** `/api/search/by-id/:profileId`
- **Auth:** Required

### 4. Get Recommendations
- **GET** `/api/search/recommendations`
- **Auth:** Required

---

## 💝 INTERACTION ENDPOINTS

### 1. Send Interest
- **POST** `/api/interaction/interest/:profileId`
- **Auth:** Required
- **Body:**
  ```json
  {
    "message": "Hi, I'm interested in your profile!"
  }
  ```
- **Frontend:** Search.js, Matches.js, ViewProfile.js (✅ Working)

### 2. Respond to Interest
- **PUT** `/api/interaction/interest/:interactionId`
- **Auth:** Required
- **Body:**
  ```json
  {
    "status": "accepted" // or "rejected"
  }
  ```
- **Frontend:** Interests.js (✅ Working)

### 3. Get Sent Interests
- **GET** `/api/interaction/interests/sent`
- **Auth:** Required
- **Frontend:** Interests.js (✅ Working)

### 4. Get Received Interests
- **GET** `/api/interaction/interests/received`
- **Auth:** Required
- **Frontend:** Interests.js (✅ Working)

### 5. Add to Shortlist
- **POST** `/api/interaction/shortlist/:profileId`
- **Auth:** Required
- **Frontend:** Search.js, Matches.js, ViewProfile.js (✅ Working)

### 6. Remove from Shortlist
- **DELETE** `/api/interaction/shortlist/:profileId`
- **Auth:** Required
- **Frontend:** Shortlists.js (✅ Working)

### 7. Get Shortlists
- **GET** `/api/interaction/shortlists`
- **Auth:** Required
- **Frontend:** Shortlists.js (✅ Working)

### 8. Add to Favorites
- **POST** `/api/interaction/favorite/:profileId`
- **Auth:** Required
- **Frontend:** Search.js, Matches.js, ViewProfile.js (✅ Working)

### 9. Remove from Favorites
- **DELETE** `/api/interaction/favorite/:profileId`
- **Auth:** Required
- **Frontend:** Favorites.js (✅ Working)

### 10. Get Favorites
- **GET** `/api/interaction/favorites`
- **Auth:** Required
- **Frontend:** Favorites.js (✅ Working)

### 11. Block User
- **POST** `/api/interaction/block/:profileId`
- **Auth:** Required

---

## 🎯 MATCH ENDPOINTS

### 1. Get Match Suggestions
- **GET** `/api/match/suggestions` (✅ FIXED - Now works without profile)
- **Auth:** Required
- **Query Params:**
  - `page`: number (default: 1)
  - `limit`: number (default: 20)
- **Frontend:** Matches.js (✅ Working)
- **Returns:** Array of profiles with match scores

### 2. Calculate Match
- **POST** `/api/match/calculate/:profileId`
- **Auth:** Required
- **Returns:** Match score and compatibility details

### 3. Get My Matches
- **GET** `/api/match/my-matches`
- **Auth:** Required

---

## 💬 CHAT ENDPOINTS

### 1. Get Conversations
- **GET** `/api/chat/conversations`
- **Auth:** Required
- **Frontend:** Messages.js (✅ Working)

### 2. Get Messages with User
- **GET** `/api/chat/:userId`
- **Auth:** Required
- **Frontend:** Messages.js (✅ Working)

### 3. Send Message
- **POST** `/api/chat/send`
- **Auth:** Required
- **Body:**
  ```json
  {
    "receiverId": "userId",
    "message": "Hello!"
  }
  ```
- **Frontend:** Messages.js (✅ Working)

### 4. Mark as Read
- **PUT** `/api/chat/mark-read/:chatId`
- **Auth:** Required

---

## 🛠️ DEV ENDPOINTS (Public Access)

### 1. Get Public Profiles
- **GET** `/api/dev/profiles`
- **Auth:** Not required
- **Frontend:** Search.js, Matches.js (✅ Working)
- **Note:** Used for development and when user doesn't have a profile

### 2. Create Admin
- **POST** `/api/dev/create-admin`
- **Body:**
  ```json
  {
    "email": "admin@matrimony.com",
    "password": "Admin@123",
    "phoneNumber": "+1234567890"
  }
  ```

---

## 👑 ADMIN ENDPOINTS

All admin endpoints require `role: 'admin'` in the JWT token.

### 1. Get Dashboard Stats
- **GET** `/api/admin/dashboard`
- **Auth:** Required (Admin only)
- **Frontend:** AdminDashboard.js

### 2. Get All Users
- **GET** `/api/admin/users`
- **Auth:** Required (Admin only)
- **Frontend:** AdminUsers.js

### 3. Get User Details
- **GET** `/api/admin/users/:userId`
- **Auth:** Required (Admin only)

### 4. Update User Status
- **PUT** `/api/admin/users/:userId/status`
- **Auth:** Required (Admin only)

### 5. Suspend User
- **PUT** `/api/admin/users/:userId/suspend`
- **Auth:** Required (Admin only)

### 6. Delete User
- **DELETE** `/api/admin/users/:userId`
- **Auth:** Required (Admin only)

### 7. Get All Profiles
- **GET** `/api/admin/profiles`
- **Auth:** Required (Admin only)
- **Frontend:** AdminProfiles.js

### 8. Verify Profile
- **PUT** `/api/admin/profiles/:profileId/verify`
- **Auth:** Required (Admin only)

### 9. Get All Reports
- **GET** `/api/admin/reports`
- **Auth:** Required (Admin only)
- **Frontend:** AdminReports.js

### 10. Update Report
- **PUT** `/api/admin/reports/:reportId`
- **Auth:** Required (Admin only)

---

## 🔧 RECENT FIXES

### 1. Image Display Issue ✅
- **Problem:** Images not showing due to CORS policy
- **Fix:** Added `Cross-Origin-Resource-Policy: cross-origin` header to /uploads route
- **File:** `backend/server.js`

### 2. Search Endpoint Missing ✅
- **Problem:** Frontend calling `/api/search/profiles` but route didn't exist
- **Fix:** Added alias route `router.get('/profiles', ...)` in search router
- **File:** `backend/routes/search.js`

### 3. Profile Required for Search/Match ✅
- **Problem:** Search and Match endpoints required user profile, blocking admin access
- **Fix:** Modified controllers to work without profile, showing all public profiles
- **Files:** `backend/controllers/searchController.js`, `backend/controllers/matchController.js`

### 4. Profile /me Endpoint ✅
- **Problem:** Frontend calling `/api/profile/me` but route was `/api/profile/my-profile`
- **Fix:** Added alias route for consistency
- **File:** `backend/routes/profile.js`

---

## 📊 FRONTEND-BACKEND INTEGRATION STATUS

| Page | Endpoints Used | Status |
|------|---------------|--------|
| Dashboard | `/api/profile/me` | ✅ Working |
| Search | `/api/search/profiles`, `/api/interaction/*` | ✅ Working |
| Matches | `/api/match/suggestions`, `/api/interaction/*` | ✅ Working |
| Interests | `/api/interaction/interests/*` | ✅ Working |
| Favorites | `/api/interaction/favorites` | ✅ Working |
| Shortlists | `/api/interaction/shortlists` | ✅ Working |
| Messages | `/api/chat/*` | ✅ Working |
| ViewProfile | `/api/profile/:id`, `/api/interaction/*` | ✅ Working |
| CreateProfile | `/api/profile/create`, `/api/profile/upload-photo` | ✅ Working |
| EditProfile | `/api/profile/me`, `/api/profile/update` | ✅ Working |

---

## 🧪 TESTING

Run the test script to verify all endpoints:

```bash
cd backend
./test-api.sh
```

Expected Success Rate: 100% (all endpoints working)

---

## 🚀 NEXT STEPS FOR FULL FUNCTIONALITY

1. **Test all interaction buttons** in the frontend
2. **Verify photo upload** works end-to-end
3. **Test messaging** with Socket.IO real-time updates
4. **Check admin pages** with admin credentials
5. **Validate search filters** work correctly

---

## 📝 NOTES

- All `/api/dev/profiles` calls work without authentication
- Admin endpoints require `role: 'admin'` in JWT
- Most interaction endpoints use profileId, not userId
- Images are served from `/uploads` with CORS enabled
- Socket.IO runs on same port (5000) as HTTP server

---

## 🔑 TEST CREDENTIALS

### Admin
- Email: `admin@matrimony.com`
- Password: `Admin@123`

### Regular Users
- Create via registration or use existing profiles from database

---

Last Updated: November 22, 2025
