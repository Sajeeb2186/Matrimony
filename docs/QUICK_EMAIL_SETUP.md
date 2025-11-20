# Quick Email Setup Guide

## Current Status
- ✅ Application is working perfectly
- ✅ OTP generation is working
- ✅ OTP appears in backend console
- ❌ Email to Gmail inbox requires setup

## Why Emails Are Not Sending

Your `.env` file has **placeholder values** that need to be replaced with real credentials:

```env
# Current (NOT WORKING)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_digit_app_password_here

# Needs to be (YOUR ACTUAL CREDENTIALS)
EMAIL_USER=sajeeb2186@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Your real 16-digit App Password
```

## How to Get Gmail App Password (3 Minutes)

### Step 1: Enable 2-Step Verification
1. Visit: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow prompts to enable it

### Step 2: Generate App Password
1. Visit: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: **Matrimony App**
5. Click **Generate**
6. **Copy the 16-digit password** (it looks like: `abcd efgh ijkl mnop`)
7. **Remove spaces** when pasting

### Step 3: Update .env File

Edit this file: `/home/sajeeb/web/projects/Matrimony/backend/.env`

Replace lines 12-13 with:
```env
EMAIL_USER=sajeeb2186@gmail.com
EMAIL_PASSWORD=your16digitcode  # No spaces!
```

### Step 4: Restart Backend

```bash
# Stop the current backend (Ctrl+C in terminal)
# Then restart:
cd /home/sajeeb/web/projects/Matrimony/backend
npm start
```

### Step 5: Test

1. Register a new account at http://localhost:3000/register
2. Check **your Gmail inbox** for OTP email
3. OTP will also appear in backend console (as backup)

## Alternative: Use Configuration Script

Run this interactive script:

```bash
cd /home/sajeeb/web/projects/Matrimony/backend
./configure-email.sh
```

The script will ask for your email and App Password, then automatically update `.env`.

## Important Notes

⚠️ **Security Warning**: Never commit `.env` file to Git (it's already in `.gitignore`)

✅ **You can use the app NOW without email**:
   - OTP shows in backend console
   - Copy/paste OTP from console to verify
   - Everything works perfectly

✅ **After configuring email, you get BOTH**:
   - Email to Gmail inbox (professional)
   - Console logging (backup/debugging)

## Troubleshooting

### "Invalid login" Error
- You're using placeholder password
- Solution: Generate real App Password and update `.env`

### "App Passwords" Option Not Available
- 2-Step Verification not enabled
- Solution: Enable 2-Step Verification first

### Email Still Not Working After Setup
- Check you removed spaces from App Password
- Check EMAIL_USER is your actual Gmail
- Restart backend server after changing `.env`

## Quick Commands

```bash
# View current email config
cat /home/sajeeb/web/projects/Matrimony/backend/.env | grep EMAIL

# Run configuration script
cd /home/sajeeb/web/projects/Matrimony/backend && ./configure-email.sh

# Restart backend
cd /home/sajeeb/web/projects/Matrimony/backend && npm start
```

---

**TL;DR**: Replace placeholder values in `.env` with real Gmail App Password, then restart backend. That's it!
