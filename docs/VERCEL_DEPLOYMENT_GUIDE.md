# Vercel Deployment Guide - Matrimony App

## Prerequisites
1. **Vercel Account**: Sign up at https://vercel.com
2. **MongoDB Atlas Account**: Sign up at https://www.mongodb.com/cloud/atlas
3. **GitHub Account**: Push your code to GitHub (recommended)

## Part 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Build a Database"
3. Choose FREE tier (M0)
4. Select cloud provider and region (closest to you)
5. Click "Create Cluster"

### 1.2 Create Database User
1. Go to "Database Access" (left menu)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.3 Whitelist IP Addresses
1. Go to "Network Access" (left menu)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Vercel)
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `myFirstDatabase` with `matrimony`
6. Save this connection string!

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/matrimony?retryWrites=true&w=majority
```

---

## Part 2: Deploy Backend to Vercel

### 2.1 Install Vercel CLI (Optional but recommended)
```bash
npm install -g vercel
```

### 2.2 Deploy Backend

#### Option A: Using Vercel CLI (Recommended)
1. Navigate to backend folder:
```bash
cd backend
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow prompts:
   - Set up and deploy? **Yes**
   - Which scope? Choose your account
   - Link to existing project? **No**
   - Project name: `matrimony-backend` (or your choice)
   - Which directory? Press Enter (current directory)
   - Override settings? **No**

5. After deployment, note the URL (e.g., `https://matrimony-backend.vercel.app`)

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Select the `backend` folder as root directory
4. Click "Deploy"

### 2.3 Configure Backend Environment Variables
1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/matrimony?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-change-this-to-random-string
JWT_EXPIRE = 7d
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-gmail-app-password
EMAIL_FROM = your-email@gmail.com
OTP_EXPIRE_MINUTES = 10
NODE_ENV = production
CORS_ORIGIN = https://your-frontend-url.vercel.app
FRONTEND_URL = https://your-frontend-url.vercel.app
```

**Important Notes:**
- Use MongoDB Atlas connection string (from Part 1)
- Generate a strong random string for JWT_SECRET (use online generator)
- For EMAIL_PASSWORD, use Gmail App Password (not regular password)
- CORS_ORIGIN and FRONTEND_URL will be updated after frontend deployment

4. Click "Save"
5. Redeploy: Go to "Deployments" → Click on latest deployment → "Redeploy"

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Deploy Frontend

#### Option A: Using Vercel CLI
1. Navigate to frontend folder:
```bash
cd ../frontend
```

2. Deploy:
```bash
vercel
```

3. Follow prompts (similar to backend)
   - Project name: `matrimony-frontend` (or your choice)

4. After deployment, note the URL (e.g., `https://matrimony-frontend.vercel.app`)

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Select the `frontend` folder as root directory
4. Framework Preset: **Create React App**
5. Click "Deploy"

### 3.2 Configure Frontend Environment Variables
1. Go to your frontend project on Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add this variable:

```
REACT_APP_API_URL = https://your-backend-url.vercel.app/api
```

Replace `your-backend-url.vercel.app` with your actual backend URL from Part 2.

4. Click "Save"
5. Redeploy: Go to "Deployments" → Click on latest deployment → "Redeploy"

---

## Part 4: Update Backend CORS Settings

Now that you have the frontend URL, update backend environment variables:

1. Go to backend project on Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Edit these variables:
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app`
   - `FRONTEND_URL` = `https://your-frontend-url.vercel.app`

4. Save and redeploy backend

---

## Part 5: Create Admin Account

After both deployments are complete:

1. Use curl or Postman to create admin:
```bash
curl -X POST https://your-backend-url.vercel.app/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@matrimony.com","phone":"+919999999999","password":"Admin@123"}'
```

Or visit this URL in your browser and use browser console:
```javascript
fetch('https://your-backend-url.vercel.app/api/dev/create-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@matrimony.com',
    phone: '+919999999999',
    password: 'Admin@123'
  })
})
.then(r => r.json())
.then(console.log)
```

---

## Part 6: Test Your Deployment

1. **Visit Frontend**: `https://your-frontend-url.vercel.app`
2. **Test Registration**: Create a new user account
3. **Test Login**: Login with admin credentials
4. **Test Features**: Try messaging, profiles, etc.

---

## Quick Deployment Commands

### Deploy Backend
```bash
cd backend
vercel --prod
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

### View Logs
```bash
vercel logs <deployment-url>
```

---

## Troubleshooting

### Issue: CORS Errors
**Solution**: Make sure CORS_ORIGIN in backend matches your frontend URL exactly

### Issue: MongoDB Connection Error
**Solution**: 
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify connection string is correct
- Ensure database user has proper permissions

### Issue: 500 Internal Server Error
**Solution**: 
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Check MongoDB connection

### Issue: Socket.IO Not Working
**Solution**: 
- Vercel serverless functions have limitations with WebSockets
- Consider using Socket.IO with polling transport
- Or use a dedicated hosting service for backend (Railway, Render, etc.)

---

## Environment Variables Checklist

### Backend (.env)
- ✅ MONGODB_URI
- ✅ JWT_SECRET
- ✅ JWT_EXPIRE
- ✅ EMAIL_HOST
- ✅ EMAIL_PORT
- ✅ EMAIL_USER
- ✅ EMAIL_PASSWORD
- ✅ EMAIL_FROM
- ✅ OTP_EXPIRE_MINUTES
- ✅ NODE_ENV
- ✅ CORS_ORIGIN
- ✅ FRONTEND_URL

### Frontend (.env)
- ✅ REACT_APP_API_URL

---

## Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Add Custom Domain to Backend
1. Go to Project Settings → Domains
2. Add your API subdomain (e.g., api.yourdomain.com)
3. Update REACT_APP_API_URL in frontend to use custom domain

---

## Important Notes

1. **Socket.IO Limitations**: Vercel serverless functions have limitations with persistent WebSocket connections. For production, consider:
   - Using polling transport for Socket.IO
   - Deploying backend to Railway/Render/Heroku for better WebSocket support

2. **File Uploads**: Vercel has file size limits. For production file uploads, use:
   - Cloudinary
   - AWS S3
   - Other cloud storage services

3. **Database**: Always use MongoDB Atlas for production (not local MongoDB)

4. **Email**: Use proper SMTP service (Gmail App Passwords or SendGrid/Mailgun)

5. **Environment Variables**: Never commit .env files to Git. Always use Vercel dashboard to set variables.

---

## Support

For issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas metrics
3. Test API endpoints individually
4. Verify environment variables

---

**Deployment URLs:**
- Backend: `https://matrimony-backend.vercel.app`
- Frontend: `https://matrimony-frontend.vercel.app`
- Admin: `https://matrimony-frontend.vercel.app/login`

**Admin Credentials:**
- Email: admin@matrimony.com
- Password: Admin@123

---

Enjoy your deployed Matrimony application! 🎉
