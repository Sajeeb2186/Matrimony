# Quick Deployment Guide - Environment Setup Required

## ⚠️ IMPORTANT: You Must Configure Environment Variables Before Deploying

The code has been updated and pushed to GitHub, but **production won't work** until you add the required environment variables.

---

## Step 1: Get Cloudinary Credentials (5 minutes)

### Create Free Account:
1. Go to: https://cloudinary.com/users/register_free
2. Sign up with email
3. Verify your email address
4. Login to dashboard: https://console.cloudinary.com/

### Get Your Credentials:
On the Cloudinary dashboard homepage, you'll see:
- **Cloud name**: (e.g., `dxyz123abc`)
- **API Key**: (e.g., `123456789012345`)
- **API Secret**: Click "Show" to reveal (e.g., `abcdefghijklmnopqrstuvwxyz123`)

**Write these down - you'll need them in the next steps!**

---

## Step 2: Get MongoDB Atlas Connection String (3 minutes)

### If You Already Have an Atlas Cluster:
1. Login to MongoDB Atlas: https://cloud.mongodb.com/
2. Click your cluster name
3. Click **Connect**
4. Choose **Connect your application**
5. Copy the connection string (looks like below)
6. Replace `<password>` with your actual database user password

```
mongodb+srv://username:password@cluster.mongodb.net/matrimony?retryWrites=true&w=majority
```

### If You Don't Have Atlas Yet:
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account (M0 tier - free forever)
3. Create a cluster (takes ~5 minutes)
4. Create database user (username + password)
5. Go to Network Access > Add IP Address > Allow Access from Anywhere (`0.0.0.0/0`)
6. Get connection string (see above)

**Write this down!**

---

## Step 3: Update Local Environment (1 minute)

Edit `backend/.env` and update these values:

```env
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/matrimony?retryWrites=true&w=majority

# Add your Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Save the file!**

---

## Step 4: Update Vercel Environment Variables (3 minutes)

### Backend Project:
1. Go to: https://vercel.com/dashboard
2. Click your **backend** project
3. Go to **Settings** > **Environment Variables**
4. Add/Update these variables:

```
MONGODB_URI = mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/matrimony?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
JWT_SECRET = your_jwt_secret_key_here
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = sajeeb2186@gmail.com
EMAIL_PASSWORD = xzoc iuyv buoi mhda
FRONTEND_URL = https://your-frontend-url.vercel.app
NODE_ENV = production
```

5. Click **Save** for each variable

### Frontend Project:
1. Click your **frontend** project in Vercel
2. Go to **Settings** > **Environment Variables**
3. Verify `REACT_APP_API_URL` is set correctly:

```
REACT_APP_API_URL = https://your-backend-url.vercel.app/api
```

---

## Step 5: Deploy to Production (2 minutes)

### Deploy Backend:
```bash
cd backend
vercel --prod
```

Wait for deployment to complete. Note the production URL.

### Deploy Frontend:
```bash
cd ../frontend
vercel --prod
```

Wait for deployment to complete.

---

## Step 6: Verify Everything Works (2 minutes)

### Test Production:
1. Open your production frontend URL
2. Register a new account
3. Create a profile
4. Upload a profile photo
5. Check Cloudinary dashboard - you should see the image in **Media Library** > **matrimony-uploads** folder
6. Verify the image displays correctly in your profile card
7. Check dashboard statistics are showing correctly

### Test Local (Optional):
```bash
# Start backend
cd backend
npm start

# In another terminal, start frontend
cd frontend
npm start
```

- Upload a photo locally
- Check Cloudinary dashboard for the upload
- Verify it displays correctly

---

## Troubleshooting

### "Cannot connect to database"
- ✅ Check MongoDB Atlas connection string is correct
- ✅ Verify database user password has no special characters (or URL-encode them)
- ✅ Ensure Network Access in Atlas allows `0.0.0.0/0`
- ✅ Check environment variable is set in Vercel

### "Upload failed" or images not showing
- ✅ Verify Cloudinary credentials are correct
- ✅ Check credentials are set in Vercel environment variables
- ✅ Ensure you redeployed after adding env vars
- ✅ Check Cloudinary dashboard > Account Details to confirm credentials

### Different data between environments
- ✅ Ensure both local and Vercel use the same `MONGODB_URI`
- ✅ If you want separate databases, that's fine - but data won't sync

### Vercel deployment fails
- ✅ Check build logs in Vercel dashboard
- ✅ Ensure all required environment variables are set
- ✅ Try `vercel --prod --force` to force rebuild

---

## Summary Checklist

- [ ] Created Cloudinary account and got credentials
- [ ] Got MongoDB Atlas connection string
- [ ] Updated `backend/.env` with Cloudinary and Atlas credentials
- [ ] Added all environment variables to Vercel backend project
- [ ] Verified `REACT_APP_API_URL` in Vercel frontend project
- [ ] Deployed backend to Vercel
- [ ] Deployed frontend to Vercel
- [ ] Tested photo upload in production
- [ ] Verified image shows in Cloudinary dashboard
- [ ] Confirmed profiles and data are consistent

---

## Quick Commands Reference

```bash
# Test locally
cd backend && npm start
cd frontend && npm start

# Deploy to production
cd backend && vercel --prod
cd frontend && vercel --prod

# Check logs
vercel logs <deployment-url>

# Force redeploy
vercel --prod --force
```

---

**Estimated total time: 15-20 minutes**

Once you complete these steps, all your production issues will be fixed! 🎉
