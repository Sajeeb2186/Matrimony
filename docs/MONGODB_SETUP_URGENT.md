# ⚠️ URGENT: Update MongoDB Connection String

## Current Status

✅ Backend deployed: https://backend-p66aox59s-sajeeb2186s-projects.vercel.app
✅ Frontend deployed: https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app
✅ All environment variables added
❌ **MongoDB connection is WRONG** - needs to be updated

## Problem

The current MONGODB_URI is set to `mongodb://localhost:27017/matrimony` which doesn't work on Vercel.

**You MUST use MongoDB Atlas (cloud database)**

---

## QUICK FIX (5 Minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google or Email (FREE)
3. Choose: **FREE tier (M0 Sandbox)**

### Step 2: Create Cluster

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select cloud provider: **AWS**
4. Region: Choose one close to you (e.g., US East, Europe, Asia)
5. Cluster Name: Leave default or name it "Matrimony"
6. Click **"Create Cluster"** (takes 1-3 minutes)

### Step 3: Create Database User

1. You'll see a security quickstart
2. **Authentication Method:** Password
3. **Username:** `matrimony_user` (or your choice)
4. **Password:** Click "Autogenerate Secure Password" 
5. **IMPORTANT:** Copy and save this password!
6. Click **"Create User"**

### Step 4: Add IP Whitelist

1. **Where would you like to connect from?** Choose "My Local Environment"
2. **IP Address:** Click "Add My Current IP Address"
3. **IMPORTANT:** Also click "Add IP Address" and enter: `0.0.0.0/0`
   - Description: "Allow from anywhere (Vercel)"
4. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Click **"Connect"** button
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: 4.1 or later
5. Copy the connection string (looks like):
   ```
   mongodb+srv://matrimony_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Format Connection String

Replace `<password>` with your actual password and add database name:

**Original:**
```
mongodb+srv://matrimony_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<password>` → your database password
- Add `/matrimony` before `?`

**Final (example):**
```
mongodb+srv://matrimony_user:YourPassword123@cluster0.abc123.mongodb.net/matrimony?retryWrites=true&w=majority
```

### Step 7: Update Vercel Environment Variable

1. Go to: https://vercel.com/sajeeb2186s-projects/backend/settings/environment-variables

2. Find `MONGODB_URI` and click **"Edit"**

3. Replace with your MongoDB Atlas connection string

4. Click **"Save"**

### Step 8: Redeploy Backend

Run this command:
```bash
cd /home/sajeeb/web/projects/Matrimony/backend
vercel --prod
```

Or go to Vercel Dashboard → Backend → Deployments → "..." → Redeploy

---

## After MongoDB is Connected

### Create Admin Account

```bash
curl -X POST https://backend-p66aox59s-sajeeb2186s-projects.vercel.app/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@matrimony.com","phone":"+919999999999","password":"Admin@123"}'
```

**Expected Response:**
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

### Test Your App

1. Visit: https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app
2. Register a new user
3. Check backend logs for OTP: `vercel logs --prod`
4. Verify OTP and login
5. Create profile
6. Test features!

---

## Visual Guide

**MongoDB Atlas Dashboard:**
```
1. Database Access (sidebar)
   → Add New Database User
   → Username: matrimony_user
   → Autogenerate Password (SAVE IT!)
   → Add User

2. Network Access (sidebar)  
   → Add IP Address
   → 0.0.0.0/0 (Allow from anywhere)
   → Confirm

3. Database (sidebar)
   → Connect
   → Connect your application
   → Copy connection string
   → Replace <password>
   → Add /matrimony before ?
```

---

## Troubleshooting

### Can't create cluster?
- Use different email if you've used MongoDB Atlas before
- Try incognito window
- Make sure you select FREE M0 tier

### Connection string doesn't work?
- Make sure you replaced `<password>` with actual password
- Check you added `/matrimony` before `?`
- Verify IP whitelist includes 0.0.0.0/0

### Admin creation fails?
- Check backend logs: `vercel logs https://backend-p66aox59s-sajeeb2186s-projects.vercel.app`
- Verify MongoDB connection string is correct
- Make sure you redeployed after updating MONGODB_URI

---

## Complete URLs

**Backend:** https://backend-p66aox59s-sajeeb2186s-projects.vercel.app
**Frontend:** https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app
**Backend Settings:** https://vercel.com/sajeeb2186s-projects/backend/settings/environment-variables
**MongoDB Atlas:** https://cloud.mongodb.com

---

**This is the ONLY thing left to do!** Once MongoDB is connected, your app will work perfectly! 🚀
