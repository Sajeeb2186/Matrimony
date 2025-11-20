# User Roles & Authentication Summary

## 🎯 Quick Overview

Your matrimony application has **two types of users**:

### 👤 Regular Users (role: `user`)
- **How they join:** Self-registration at `/register`
- **What they do:** Create profiles, search matches, send interests, chat
- **Access:** User dashboard, Search, Matches, Messages

### 👑 Admin (role: `admin`)
- **How created:** Via development endpoint (one-time setup)
- **What they do:** Manage platform, verify profiles, handle reports
- **Access:** Admin dashboard, User management, Analytics

---

## 🚀 Quick Setup

### Step 1: Start the Application

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm start
```

### Step 2: Create Admin Account

```bash
# Option A: Use the script
./create-admin.sh

# Option B: Manual API call
curl -X POST http://localhost:5000/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@matrimony.com",
    "phone": "+919999999999",
    "password": "Admin@123"
  }'
```

**Default Admin Credentials:**
- Email: `admin@matrimony.com`
- Password: `Admin@123`

### Step 3: Login

- Go to `http://localhost:3000/login`
- Login with admin or user credentials
- The app will automatically show admin/user features based on role

---

## 📊 Current Data

### Seeded Users (role: `user`)
1. **Asha Kumar** (MAT010001)
   - Email: demo1@example.com
   - Password: Password123!
   
2. **Rohit Sharma** (MAT010002)
   - Email: demo2@example.com
   - Password: Password123!
   
3. **Maya Patel** (MAT010003)
   - Email: demo3@example.com
   - Password: Password123!

### Admin User
- **Email:** admin@matrimony.com
- **Password:** Admin@123
- **Role:** admin

---

## 🔐 How Authentication Works

### Registration Flow (Regular Users)
1. User fills `/register` form
2. Backend creates user with `role: 'user'`
3. OTP sent to email (or shown in console)
4. User verifies OTP at `/verify-otp`
5. Account activated → can login

### Login Flow (Both Admin & Users)
1. POST `/api/auth/login` with email & password
2. Backend returns:
   ```json
   {
     "token": "JWT_TOKEN",
     "data": {
       "userId": "...",
       "email": "...",
       "role": "user" or "admin"
     }
   }
   ```
3. Frontend stores `token` and `user` in localStorage
4. Frontend checks `user.role` to show appropriate features

---

## 🎨 Frontend Role-Based Features

### Navbar Navigation

**Regular User sees:**
- Dashboard
- Search
- Matches  
- Interests
- Messages (icon)

**Admin sees:**
- Admin Dashboard
- Users
- Profiles
- Reports

### Route Protection

```javascript
// Check user role
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (user.role === 'admin') {
  // Show admin features
} else {
  // Show regular user features
}
```

---

## 🛡️ Admin Capabilities

### Admin Endpoints (Protected)

All require: `Authorization: Bearer <token>` + `role: 'admin'`

```bash
# Dashboard stats
GET /api/admin/dashboard

# User management
GET /api/admin/users
GET /api/admin/users/:userId
PUT /api/admin/users/:userId/status

# Profile verification
GET /api/admin/profiles
PUT /api/admin/profiles/:profileId/verify

# Reports management
GET /api/admin/reports
PUT /api/admin/reports/:reportId

# Analytics
GET /api/admin/analytics
```

### Example: View All Users (Admin Only)

```bash
# Login as admin first
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@matrimony.com","password":"Admin@123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# Get all users
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/users
```

---

## ✅ Testing Checklist

### As Regular User:
- [ ] Register new account at `/register`
- [ ] Verify OTP (check backend console)
- [ ] Login
- [ ] See user navigation (Dashboard, Search, Matches)
- [ ] View profiles in Search page
- [ ] Cannot access `/api/admin/*` endpoints

### As Admin:
- [ ] Login with admin credentials
- [ ] See admin navigation (Admin Dashboard, Users, Profiles)
- [ ] Access `/api/admin/dashboard` endpoint
- [ ] View all users
- [ ] Cannot create profile (admins manage, don't participate)

---

## 🔒 Security Notes

1. **Admin Protection**
   - Only ONE admin can exist (enforced by create-admin endpoint)
   - Admin cannot self-register via public signup
   
2. **Role Verification**
   - All admin routes use `authorize('admin')` middleware
   - Returns 403 if non-admin tries to access
   
3. **Development Endpoints**
   - `/api/dev/*` only available when `NODE_ENV !== 'production'`
   - Includes: create-admin, seed, public profiles

---

## 📖 Documentation Files

- `ADMIN_SETUP.md` - Detailed admin setup guide
- `create-admin.sh` - Admin creation script
- `BUGFIXES.md` - Bug fixes log
- `EMAIL_SETUP.md` - Email configuration guide

---

## 🎯 Summary

✅ **Regular users** sign up themselves → get `role: 'user'`  
✅ **Admin** created via endpoint → gets `role: 'admin'`  
✅ Login returns `role` field → frontend shows appropriate UI  
✅ Backend enforces role-based access via middleware  
✅ Admin manages platform, users interact with profiles

**Current Status:**
- ✅ Admin account created: `admin@matrimony.com`
- ✅ 3 demo users seeded
- ✅ Backend & frontend running
- ✅ Role-based navigation working
- ✅ Admin dashboard accessible
