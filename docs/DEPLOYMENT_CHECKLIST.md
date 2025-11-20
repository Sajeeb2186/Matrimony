# Vercel Deployment - Quick Start Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Create database user with password
- [ ] Whitelist IP: 0.0.0.0/0 (Allow from anywhere)
- [ ] Get connection string
- [ ] Test connection string

### 2. Vercel Account
- [ ] Create Vercel account at https://vercel.com
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`

### 3. Email Setup (Optional but recommended)
- [ ] Gmail account for sending emails
- [ ] Enable 2-Factor Authentication
- [ ] Generate App Password (Google Account → Security → App Passwords)

---

## 🚀 Deployment Steps

### Method 1: Automated Script (Easiest)
```bash
cd /home/sajeeb/web/projects/Matrimony
./deploy-vercel.sh
```

### Method 2: Manual Deployment

#### Step 1: Deploy Backend
```bash
cd backend
vercel --prod
```
**Note the backend URL!** (e.g., https://matrimony-backend-xyz.vercel.app)

#### Step 2: Configure Backend Environment Variables
Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables

Add these:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/matrimony?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key-here-change-this
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
OTP_EXPIRE_MINUTES=10
NODE_ENV=production
```

Then redeploy backend.

#### Step 3: Deploy Frontend
```bash
cd ../frontend
vercel --prod
```
**Note the frontend URL!** (e.g., https://matrimony-frontend-xyz.vercel.app)

#### Step 4: Update Backend CORS
Go to Backend Project → Settings → Environment Variables

Add:
```
CORS_ORIGIN=https://your-frontend-url.vercel.app
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Redeploy backend.

#### Step 5: Configure Frontend Environment Variables
Go to Frontend Project → Settings → Environment Variables

Add:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

Redeploy frontend.

#### Step 6: Create Admin Account
```bash
curl -X POST https://your-backend-url.vercel.app/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@matrimony.com","phone":"+919999999999","password":"Admin@123"}'
```

---

## 🧪 Testing

1. Visit your frontend URL
2. Try registering a new user
3. Check email for OTP (or backend logs)
4. Verify OTP and login
5. Create a profile
6. Test messaging
7. Login as admin and test admin features

---

## 📝 Important URLs

**Backend URL:** https://matrimony-backend-________.vercel.app
**Frontend URL:** https://matrimony-frontend-________.vercel.app
**Admin Login:** https://matrimony-frontend-________.vercel.app/login

**Admin Credentials:**
- Email: admin@matrimony.com
- Password: Admin@123

---

## ⚠️ Common Issues & Solutions

### Issue: CORS Error
**Solution:** Make sure CORS_ORIGIN in backend matches frontend URL exactly (including https://)

### Issue: MongoDB Connection Failed
**Solution:** 
- Verify connection string is correct
- Check IP whitelist includes 0.0.0.0/0
- Ensure database user has read/write permissions

### Issue: Email Not Sending
**Solution:**
- Use Gmail App Password, not regular password
- Check EMAIL_* variables are set correctly
- OTP will be logged in Vercel backend logs if email fails

### Issue: Build Failed
**Solution:**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Run `npm install` and `npm run build` locally first

### Issue: Environment Variables Not Working
**Solution:**
- Redeploy after adding environment variables
- Variables are only available after redeployment
- Check variable names match exactly (case-sensitive)

---

## 🔧 Vercel CLI Commands

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View logs
vercel logs

# List projects
vercel ls

# Remove deployment
vercel rm <deployment-name>

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Detailed Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)

---

## 🎉 Post-Deployment

After successful deployment:
1. Share your app URL
2. Test all features
3. Monitor Vercel analytics
4. Check error logs regularly
5. Set up custom domain (optional)

---

**Need Help?**
Check the detailed guide: `VERCEL_DEPLOYMENT_GUIDE.md`
