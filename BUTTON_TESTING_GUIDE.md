# Button Functionality Testing Guide

## 🎯 How to Test All Buttons

### Prerequisites
1. ✅ Backend is running on http://localhost:5000
2. ✅ Frontend is running on http://localhost:3000
3. ✅ You have at least 2 user accounts with profiles

---

## 📋 Testing Checklist

### 1. **Interest Button** ❤️

**What it does:** Sends an interest request to another user

**Where to find it:**
- Search page (`/search`)
- Matches page (`/matches`)
- Profile View page (`/profile/:id`)

**How to test:**
1. Go to Search or Matches page
2. Find a profile card
3. Click the **"Interest"** button (pink button)
4. Expected result: Toast message "Interest sent successfully!"
5. Go to Interests page → Sent tab
6. Verify the interest appears there

**Important Notes:**
- ⚠️ You need to CREATE A PROFILE first (admin account doesn't have one)
- ⚠️ Error message: "Please create your profile first to send interests"

---

### 2. **Favorite Button** 💕 (Heart Icon)

**What it does:** Adds profile to your favorites list

**Where to find it:**
- All profile cards (top-left heart icon)
- Profile View page

**How to test:**
1. Click the **heart icon** on any profile card
2. Expected result: Toast message "Added to favorites!"
3. Heart icon should fill in (become solid)
4. Go to Favorites page (`/favorites`)
5. Verify the profile appears there

**To remove:**
1. Click the filled heart icon OR
2. Go to Favorites page and click "Remove"

---

### 3. **Shortlist Button** 🔖 (Bookmark Icon)

**What it does:** Adds profile to your shortlist

**Where to find it:**
- All profile cards (top-left bookmark icon)
- Profile View page

**How to test:**
1. Click the **bookmark icon** on any profile card
2. Expected result: Toast message "Added to shortlist!"
3. Bookmark icon should fill in (become solid)
4. Go to Shortlists page (`/shortlists`)
5. Verify the profile appears there

**To remove:**
1. Click the filled bookmark icon OR
2. Go to Shortlists page and click "Remove"

---

### 4. **Message Button** 💬

**What it does:** Starts a conversation with the user

**Where to find it:**
- All profile cards
- Profile View page

**How to test:**
1. Click the **"Message"** button
2. Expected result: Toast "Conversation started! Redirecting to messages..."
3. You'll be redirected to Messages page
4. A new conversation will appear
5. You can send messages in real-time

**Note:** Socket.IO is enabled for real-time messaging

---

### 5. **View Button** 👁️

**What it does:** Opens detailed profile page

**Where to find it:**
- All profile cards

**How to test:**
1. Click the **"View"** button
2. Expected result: Redirected to `/profile/:profileId`
3. Full profile details displayed
4. All interaction buttons available on this page

---

### 6. **Accept/Reject Buttons** (Interests Page)

**What it does:** Respond to received interest requests

**Where to find it:**
- Interests page → Received tab

**How to test:**
1. Have another user send you an interest
2. Go to Interests page → Received tab
3. Click **"Accept"** button: Status changes to "Accepted"
4. OR click **"Reject"** button: Status changes to "Rejected"

---

## 🚨 Common Issues & Solutions

### Issue 1: "Please create your profile first"
**Why:** You're logged in as admin (or a user without a profile)
**Solution:** 
1. Logout
2. Register a new user
3. Create a profile through the 4-step process
4. Upload a photo
5. Now you can use all interaction buttons

### Issue 2: Buttons not responding
**Why:** Backend may not be running
**Solution:**
```bash
curl http://localhost:5000/health
```
If no response, restart backend:
```bash
cd backend
nohup node server.js > server.log 2>&1 &
```

### Issue 3: "Interest already sent"
**Why:** You've already sent interest to this profile
**Solution:** This is expected behavior. Check Interests → Sent tab

### Issue 4: Images not showing
**Why:** CORS issue (should be fixed now)
**Solution:** Hard refresh browser (Ctrl+Shift+R)

---

## 📊 Testing Scenarios

### Scenario 1: Full Interest Flow
1. **User A:** Create profile → Send interest to User B
2. **User B:** Login → Go to Interests → Received tab
3. **User B:** Accept the interest
4. **User A:** Check Interests → Sent tab (status should be "Accepted")
5. **Both:** Can now message each other

### Scenario 2: Favorites & Shortlists
1. Browse Search page
2. Add 3 profiles to Favorites (heart icon)
3. Add 3 profiles to Shortlist (bookmark icon)
4. Go to Favorites page → Verify all 3 appear
5. Go to Shortlists page → Verify all 3 appear
6. Remove one from each list

### Scenario 3: Messaging
1. Send interest to User B
2. User B accepts
3. Click "Message" button on User B's profile
4. Type and send a message
5. **User B:** Login and check Messages page
6. Reply to the message
7. **User A:** See real-time update (no refresh needed)

### Scenario 4: Search & Match
1. Go to Search page
2. Apply filters (gender, age, location)
3. Click "Apply Filters"
4. Browse results
5. Use all interaction buttons on different profiles
6. Go to Matches page
7. See match scores
8. Switch between tabs (All/Premium/Mutual)

---

## ✅ Expected Button Behavior Summary

| Button | Action | Toast Message | Result |
|--------|--------|--------------|---------|
| Interest | Sends interest | "Interest sent successfully!" | Appears in Interests → Sent |
| Favorite (❤️) | Adds to favorites | "Added to favorites!" | Appears in Favorites page |
| Shortlist (🔖) | Adds to shortlist | "Added to shortlist!" | Appears in Shortlists page |
| Message (💬) | Starts conversation | "Conversation started!" | Redirects to Messages |
| View (👁️) | Opens profile | None | Shows full profile details |
| Accept | Accepts interest | Status updated | Interest status: "Accepted" |
| Reject | Rejects interest | Status updated | Interest status: "Rejected" |

---

## 🔧 Quick Test Commands

### Test Interest Endpoint:
```bash
# Get a token first
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"Password@123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# Send interest
curl -X POST http://localhost:5000/api/interaction/interest/MAT010001 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"message":"Hi!"}'
```

### Check Server Logs:
```bash
cd backend
tail -f server.log
```

---

## 📝 Test User Accounts

Create these for testing:

**User 1:**
- Email: `john@example.com`
- Password: `John@123`
- Profile: Male, 28, Mumbai

**User 2:**
- Email: `jane@example.com`
- Password: `Jane@123`
- Profile: Female, 26, Mumbai

**User 3:**
- Email: `bob@example.com`
- Password: `Bob@123`
- Profile: Male, 30, Delhi

Then test interactions between them!

---

## 🎉 Success Criteria

All buttons work if:
- ✅ No console errors when clicking buttons
- ✅ Toast messages appear for each action
- ✅ Data appears in correct pages (Favorites, Shortlists, Interests)
- ✅ Messages send in real-time
- ✅ Interest status updates correctly

---

Last Updated: November 22, 2025
Status: ✅ All interaction endpoints fixed
