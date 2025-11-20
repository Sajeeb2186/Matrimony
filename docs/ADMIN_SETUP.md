# Admin Setup Guide

## Overview

The matrimony application has two types of users:

### 👤 **Regular Users**
- Sign up through the registration page (`/register`)
- Role: `user`
- Can create profiles, search for matches, send interests, chat
- Access to: Dashboard, Search, Matches, Messages, Profile pages

### 👑 **Admin**
- Created through development endpoint or manually in database
- Role: `admin`
- Can manage all users, verify profiles, handle reports
- Access to: Admin Dashboard, User Management, Profile Verification, Reports

---

## Creating the First Admin Account

### Option 1: Using Development Endpoint (Recommended)

1. **Make sure the backend is running:**
   ```bash
   cd backend
   npm start
   ```

2. **Create admin account via API:**
   ```bash
   curl -X POST http://localhost:5000/api/dev/create-admin \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@matrimony.com",
       "phone": "+919999999999",
       "password": "Admin@123"
     }'
   ```

   **Response:**
   ```json
   {
     "success": true,
     "message": "Admin account created successfully",
     "data": {
       "userId": "...",
       "email": "admin@matrimony.com",
       "role": "admin"
     }
   }
   ```

3. **Login with admin credentials:**
   - Email: `admin@matrimony.com`
   - Password: `Admin@123`

### Option 2: Manually via MongoDB

```javascript
// Connect to MongoDB
use matrimony

// Create admin user
db.users.insertOne({
  email: "admin@matrimony.com",
  phone: "+919999999999",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  isVerified: true,
  emailVerified: true,
  phoneVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## User Roles Comparison

| Feature | Regular User (`user`) | Admin (`admin`) |
|---------|----------------------|-----------------|
| Registration | ✅ Public signup | ❌ Manual creation |
| Email Verification | ✅ Required | ✅ Auto-verified |
| Create Profile | ✅ Yes | ❌ No (admin manages) |
| Search Profiles | ✅ Yes | ✅ Yes |
| Send Interests | ✅ Yes | ❌ No |
| Chat/Messages | ✅ Yes | ❌ No |
| View Dashboard | ✅ User dashboard | ✅ Admin dashboard |
| Manage Users | ❌ No | ✅ Yes |
| Verify Profiles | ❌ No | ✅ Yes |
| Handle Reports | ❌ No | ✅ Yes |
| View Analytics | ❌ No | ✅ Yes |

---

## Admin Endpoints

All admin endpoints are protected and require:
- Valid JWT token
- User role = `admin`

### Dashboard Stats
```
GET /api/admin/dashboard
```
Returns: Total users, profiles, matches, recent registrations, pending reports

### User Management
```
GET /api/admin/users?page=1&limit=20
GET /api/admin/users/:userId
PUT /api/admin/users/:userId/status
```
Manage user accounts, activate/deactivate users

### Profile Verification
```
GET /api/admin/profiles
PUT /api/admin/profiles/:profileId/verify
```
Verify user profiles, documents, photos

### Reports Management
```
GET /api/admin/reports
PUT /api/admin/reports/:reportId
```
Handle abuse reports, disputes

### Analytics
```
GET /api/admin/analytics
```
View platform analytics and insights

---

## Frontend Admin Routes

Update your React app to add admin routes:

```javascript
// src/components/common/AdminRoute.js
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

export default AdminRoute;
```

```javascript
// In App.js
<Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
<Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
<Route path="/admin/profiles" element={<AdminRoute><AdminProfiles /></AdminRoute>} />
<Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
```

---

## How Users Interact with the System

### Regular User Flow:
1. **Registration** → POST `/api/auth/register`
   - Provides: email, phone, password
   - Receives: OTP via email/console
   - Role: `user` (default)

2. **Verification** → POST `/api/auth/verify-otp`
   - Provides: email, OTP
   - Account activated
   - Can login

3. **Login** → POST `/api/auth/login`
   - Provides: email, password
   - Receives: JWT token + user data (including `role: 'user'`)

4. **Use Application**
   - Create profile
   - Search matches
   - Send interests
   - Chat with matches

### Admin Flow:
1. **Admin Created** → POST `/api/dev/create-admin` (one-time setup)
   - Provides: email, phone, password
   - Role: `admin` (pre-verified)

2. **Admin Login** → POST `/api/auth/login`
   - Provides: email, password
   - Receives: JWT token + user data (including `role: 'admin'`)

3. **Manage Platform**
   - Access admin dashboard
   - Verify user profiles
   - Manage users (activate/deactivate)
   - Handle reports
   - View analytics

---

## Checking User Role in Frontend

```javascript
// Get current user
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Check if admin
if (user.role === 'admin') {
  // Show admin features
  console.log('Admin user');
} else {
  // Show regular user features
  console.log('Regular user');
}
```

---

## Security Notes

1. **Admin Account Protection**
   - Only one admin can exist (enforced by create-admin endpoint)
   - Admin cannot be created via public registration
   - Use strong password for admin account

2. **Development Endpoints**
   - `/api/dev/*` routes are only available when `NODE_ENV !== 'production'`
   - Disable in production by setting `NODE_ENV=production`

3. **Role-Based Access**
   - All admin routes use `protect` + `authorize('admin')` middleware
   - Regular users cannot access admin endpoints
   - Returns 403 Forbidden if non-admin tries to access

---

## Testing Admin Access

```bash
# 1. Create admin
curl -X POST http://localhost:5000/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","phone":"+911234567890","password":"Admin@123"}'

# 2. Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin@123"}'

# Response includes:
# "role": "admin"
# Save the token

# 3. Access admin dashboard
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Summary

✅ **Regular Users:**
- Self-register via `/register` page
- Default role: `user`
- Access user features (profile, search, matches, messages)

✅ **Admin:**
- Created via `/api/dev/create-admin` endpoint
- Role: `admin`
- Access admin panel (manage users, verify profiles, handle reports)

✅ **Identification:**
- Check `user.role` in localStorage or JWT payload
- `user` = regular user
- `admin` = administrator
