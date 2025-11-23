# Vercel Environment Variables - Copy & Paste Reference

## ✅ Status: Local Backend Connected to Atlas Successfully!

Your local backend is now running with:
- MongoDB Atlas: Connected ✅
- Cloudinary: Configured ✅  
- Same 6 profiles as production ✅

---

## 🚀 BACKEND Environment Variables (Vercel)

Go to: **Vercel Dashboard** > **Your Backend Project** > **Settings** > **Environment Variables**

Click **Add** and paste these one by one:

### Database
```
Name: MONGODB_URI
Value: mongodb+srv://sajeeb2186:sajeeb2186@cluster0.xkfvw.mongodb.net/matrimony?retryWrites=true&w=majority
Environment: Production, Preview, Development (select all)
```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
### Cloudinary (Image Storage)
```
Name: CLOUDINARY_CLOUD_NAME
Value: dft6wpehp
Environment: Production, Preview, Development
```

```
Name: CLOUDINARY_API_KEY
Value: 134789661444967
Environment: Production, Preview, Development
```

```
Name: CLOUDINARY_API_SECRET
Value: B8vi0fGv8vkdlrPbcrse5HTuRu0
Environment: Production, Preview, Development
```

### Authentication
```
Name: JWT_SECRET
Value: your_jwt_secret_key_here_change_in_production
Environment: Production, Preview, Development
```

```
Name: JWT_EXPIRE
Value: 7d
Environment: Production, Preview, Development
```

### Email Configuration
```
Name: EMAIL_HOST
Value: smtp.gmail.com
Environment: Production, Preview, Development
```

```
Name: EMAIL_PORT
Value: 587
Environment: Production, Preview, Development
```

```
Name: EMAIL_USER
Value: sajeeb2186@gmail.com
Environment: Production, Preview, Development
```

```
Name: EMAIL_PASSWORD
Value: xzoc iuyv buoi mhda
Environment: Production, Preview, Development
```

### Other
```
Name: FRONTEND_URL
Value: https://frontend-fqcr8l8fo-sajeeb2186s-projects.vercel.app
Environment: Production, Preview, Development
```

```
Name: NODE_ENV
Value: production
Environment: Production only
```

---

## 🎨 FRONTEND Environment Variables (Vercel)

Go to: **Vercel Dashboard** > **Your Frontend Project** > **Settings** > **Environment Variables**

Verify this variable exists:

```
Name: REACT_APP_API_URL
Value: https://backend-bmcegums2-sajeeb2186s-projects.vercel.app/api
Environment: Production, Preview, Development
```

---

## 📋 Deployment Commands (After adding env vars)

### Deploy Backend:
```bash
cd backend
vercel --prod
```

### Deploy Frontend:
```bash
cd frontend
vercel --prod
```

---

## ✅ Verification Checklist

After deployment:
- [ ] Open production frontend URL
- [ ] Login with existing account
- [ ] Go to profile page
- [ ] Upload a new photo
- [ ] Check Cloudinary dashboard - image should appear in Media Library
- [ ] Verify photo displays correctly in profile card
- [ ] Check that profiles match between local and production
- [ ] Verify dashboard statistics are consistent

---

## 🎉 What Will Be Fixed

Once deployed with these environment variables:
- ✅ Images will persist in production (stored on Cloudinary)
- ✅ Same profiles everywhere (shared MongoDB Atlas)
- ✅ Dashboard statistics will be consistent
- ✅ Fast image delivery via Cloudinary CDN
- ✅ No more "different data" between environments

---

**Last Updated**: November 23, 2025
**Local Backend Status**: Connected to Atlas ✅  
**Profiles in DB**: 6 (MAT010002-MAT010007)
