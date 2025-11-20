# 🎉 YOUR MATRIMONY APP IS DEPLOYED!

## Deployment URLs

### ✅ Frontend (User Interface)
**URL:** https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app

**What to do:**
- Visit this URL to see your matrimony app
- Users can register, login, create profiles, search, and message here
- Admin can login at: /login

### ✅ Backend (API Server)  
**URL:** https://backend-c7hk6o1hv-sajeeb2186s-projects.vercel.app

**What to do:**
- This handles all API requests
- Don't visit directly (it's for the frontend to use)

---

## ⚠️ CRITICAL: Add Environment Variables

Your app is deployed but **won't work yet** until you add environment variables!

### Step 1: Add Backend Environment Variables

**Go to:** https://vercel.com/sajeeb2186s-projects/backend/settings/environment-variables

**Click "Add" for each of these:**

#### Required Variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://...` | Get from MongoDB Atlas (see below) |
| `JWT_SECRET` | `4be784cd8d97ea4e90dabf5e402919d6d1c4520e46bc99e36f97125edb4b54c85602d484c3c11eccd6b84dda7eea7b60c7d79850a5c2181d2af0d2982ddccea4` | **Use this generated secret** |
| `JWT_EXPIRE` | `7d` | Token expiry (7 days) |
| `NODE_ENV` | `production` | Environment mode |
| `CORS_ORIGIN` | `https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app` | **Use this exact URL** |
| `FRONTEND_URL` | `https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app` | **Use this exact URL** |
| `OTP_EXPIRE_MINUTES` | `10` | OTP validity time |

#### Email Variables (Optional - for sending OTPs):

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `EMAIL_HOST` | `smtp.gmail.com` | Gmail SMTP server |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_USER` | `your-email@gmail.com` | Your Gmail address |
| `EMAIL_PASSWORD` | `your-app-password` | Gmail App Password (not regular password) |
| `EMAIL_FROM` | `your-email@gmail.com` | From email address |

**Note about Email:** If you don't set email variables, OTPs will be displayed in backend logs. You can view logs in Vercel dashboard.

---

## 🗄️ Setup MongoDB Atlas (DATABASE)

### Quick Setup:

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** for free account
3. **Create a FREE cluster** (M0)
4. **Create database user:**
   - Username: `matrimony_admin`
   - Password: (Generate and save it!)
5. **Whitelist IP:** Click "Allow Access from Anywhere" (0.0.0.0/0)
6. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the string
   - Replace `<password>` with your password
   - Add `/matrimony` before `?` 

**Example connection string:**
```
mongodb+srv://matrimony_admin:YourPassword@cluster0.xxxxx.mongodb.net/matrimony?retryWrites=true&w=majority
```

**Add this as `MONGODB_URI` in Vercel backend environment variables!**

📖 **Detailed guide:** See `MONGODB_ATLAS_SETUP.md` in your project

---

## 🔄 After Adding Environment Variables

### Step 2: Redeploy Backend

After adding all environment variables, redeploy backend:

```bash
cd /home/sajeeb/web/projects/Matrimony/backend
vercel --prod
```

Or go to Vercel dashboard → Backend project → Deployments → Click "..." on latest → "Redeploy"

---

## 👑 Create Admin Account

After redeploying with environment variables, create admin:

```bash
curl -X POST https://backend-c7hk6o1hv-sajeeb2186s-projects.vercel.app/api/dev/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@matrimony.com","phone":"+919999999999","password":"Admin@123"}'
```

**Admin Login Credentials:**
- Email: `admin@matrimony.com`
- Password: `Admin@123`

---

## 🧪 Test Your App

1. **Visit frontend:** https://frontend-6tikr46a2-sajeeb2186s-projects.vercel.app
2. **Register a new user**
3. **Check Vercel logs** for OTP (if email not configured)
4. **Verify OTP and login**
5. **Create a profile**
6. **Test features:** Search, messaging, etc.
7. **Login as admin** to test admin features

---

## 📋 Checklist

- [ ] Created MongoDB Atlas cluster
- [ ] Got MongoDB connection string
- [ ] Added all environment variables to backend in Vercel
- [ ] Redeployed backend
- [ ] Created admin account
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested profile creation
- [ ] Tested messaging
- [ ] Tested admin features

---

## 🔧 View Logs

**Backend logs:**
```bash
vercel logs https://backend-c7hk6o1hv-sajeeb2186s-projects.vercel.app
```

Or view in dashboard: https://vercel.com/sajeeb2186s-projects/backend

**Look for:**
- OTP codes (if email not configured)
- Error messages
- Database connection status

---

## 🆘 Troubleshooting

### App shows blank page
- Check browser console for errors
- Verify backend URL is correct in frontend .env
- Check CORS settings in backend

### Cannot register/login
- Check MongoDB connection string is correct
- Verify environment variables are set
- Look at backend logs for errors

### Email/OTP not working
- OTPs will appear in backend logs
- Or setup Gmail App Password for email

### CORS errors
- Make sure CORS_ORIGIN matches frontend URL exactly
- Include https:// in the URL

---

## 📞 Support Links

- **Backend Dashboard:** https://vercel.com/sajeeb2186s-projects/backend
- **Frontend Dashboard:** https://vercel.com/sajeeb2186s-projects/frontend
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## 🎊 You're Almost Done!

Just complete these final steps:

1. ✅ Setup MongoDB Atlas
2. ✅ Add environment variables  
3. ✅ Redeploy backend
4. ✅ Create admin account
5. ✅ Test your app

**Then share your app with the world!** 🌍

---

**Generated JWT Secret (already included above):**
```
4be784cd8d97ea4e90dabf5e402919d6d1c4520e46bc99e36f97125edb4b54c85602d484c3c11eccd6b84dda7eea7b60c7d79850a5c2181d2af0d2982ddccea4
```

---

Congratulations on deploying your Matrimony app! 🎉
