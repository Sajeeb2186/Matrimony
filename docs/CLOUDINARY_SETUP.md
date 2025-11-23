# Cloudinary Setup Guide

## What Changed
The application now uses **Cloudinary** for image storage instead of local disk storage. This ensures uploaded images persist in production (Vercel) environments.

## Quick Setup (5 minutes)

### Step 1: Create Free Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up (free tier includes 25GB storage & 25GB bandwidth/month)
3. Verify your email

### Step 2: Get Your Credentials
1. Log in to Cloudinary Dashboard: https://console.cloudinary.com/
2. On the dashboard, you'll see:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Show" to reveal)

### Step 3: Update Backend Environment Variables

#### For Local Development:
Edit `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

#### For Vercel Production:
1. Go to your Vercel project dashboard
2. Click **Settings** > **Environment Variables**
3. Add these three variables:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret
4. Click **Save**
5. Redeploy your backend for changes to take effect

### Step 4: Test Upload
1. Restart your backend server (if running locally)
2. Upload a profile photo through your app
3. Check Cloudinary dashboard > Media Library - you should see the uploaded image in the `matrimony-uploads` folder

## How It Works

### Upload Flow:
1. User uploads photo via frontend
2. Backend receives file and uploads to Cloudinary
3. Cloudinary returns secure HTTPS URL
4. URL is saved in MongoDB (e.g., `https://res.cloudinary.com/your-cloud/image/upload/...`)
5. Frontend displays image using absolute Cloudinary URL

### Benefits:
- ✅ Images persist across deployments
- ✅ Automatic image optimization & transformations
- ✅ CDN delivery (fast worldwide)
- ✅ No server disk space needed
- ✅ Works seamlessly with Vercel serverless

### Fallback Behavior:
If Cloudinary credentials are **not** configured:
- Local development uses disk storage (`backend/uploads/`)
- Images stored as `/uploads/filename.jpg`
- Works locally but won't persist on Vercel

## MongoDB Atlas Connection

The app is now configured to use MongoDB Atlas for both local and production environments.

### Get Atlas Connection String:
1. Log in to MongoDB Atlas: https://cloud.mongodb.com/
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/matrimony`)
5. Replace `<password>` with your actual database user password

### Update Environment Variables:

#### Local (`backend/.env`):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/matrimony?retryWrites=true&w=majority
```

#### Vercel Production:
1. Go to Vercel project > Settings > Environment Variables
2. Add/update `MONGODB_URI` with your Atlas connection string
3. Save and redeploy

### Network Access:
Make sure MongoDB Atlas allows connections from Vercel:
1. Go to Atlas > Network Access
2. Add IP: `0.0.0.0/0` (allows all IPs - suitable for serverless)
3. Or add Vercel's IP ranges if you prefer stricter security

## Troubleshooting

### Images not showing in production?
- ✅ Verify Cloudinary credentials are set in Vercel environment variables
- ✅ Check Cloudinary dashboard Media Library for uploaded files
- ✅ Ensure backend was redeployed after adding env vars

### Upload fails with "Invalid file type"?
- Only JPEG, PNG, PDF, DOC/DOCX files are allowed
- Max file size: 5MB

### "Profile not found" when uploading?
- User must create a profile before uploading photos
- Check that user is logged in and JWT token is valid

## Next Steps
1. Set up Cloudinary credentials (follow Step 2 above)
2. Update backend/.env with credentials
3. Set Cloudinary env vars in Vercel
4. Set MongoDB Atlas URI in Vercel
5. Redeploy backend to Vercel
6. Test photo upload in production

---
**Need help?** Check Cloudinary docs: https://cloudinary.com/documentation
