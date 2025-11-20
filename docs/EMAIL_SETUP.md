# Email Configuration Guide

## Gmail SMTP Setup for OTP Emails

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the steps to enable it

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
   - Direct link: https://myaccount.google.com/apppasswords
3. In "Select app" dropdown, choose **Mail**
4. In "Select device" dropdown, choose **Other** and enter "Matrimony App"
5. Click **Generate**
6. Google will show you a 16-character password (example: `abcd efgh ijkl mnop`)
7. **Copy this password** (remove spaces)

### Step 3: Update .env File

Open `/backend/.env` and update the email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Paste the 16-digit app password here (no spaces)
```

### Step 4: Restart Backend Server

After updating the .env file:

1. Stop the backend server (Ctrl+C)
2. Restart it: `npm start`

### Step 5: Test Email

1. Register a new account on the frontend
2. Check **both**:
   - Your email inbox (OTP will be sent there)
   - Backend console (OTP is also logged there as backup)

---

## Alternative: Using Other Email Providers

### Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
```

### Yahoo Mail

```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASSWORD=your_app_password  # Generate app password from Yahoo account settings
```

### SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com/
2. Create an API key
3. Update .env:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
```

---

## Troubleshooting

### "Invalid login: Username and Password not accepted"

**Cause:** Using regular Gmail password instead of App Password

**Solution:**
1. Make sure 2-Step Verification is enabled
2. Generate a new App Password
3. Use the 16-digit App Password (without spaces)
4. Update `.env` file
5. Restart backend server

### Email not received

**Check:**
1. Spam/Junk folder
2. Backend console for OTP (it's logged there too)
3. Email credentials in `.env` are correct
4. Backend server restarted after updating `.env`

### ECONNECTION or TIMEOUT errors

**Check:**
1. Firewall blocking port 587
2. Internet connection
3. Email provider settings

---

## Development Mode

For development/testing, you don't need to configure email. The OTP will be displayed in the **backend console** like this:

```
==================================================
🔐 OTP VERIFICATION CODE
==================================================
Email: user@example.com
OTP: 123456
Expires at: 11/19/2025, 4:30:00 PM
==================================================
```

Just copy the OTP from the console and use it in the verification page.

---

## Production Recommendations

For production environments, consider using:

1. **SendGrid** - Reliable, scalable, free tier available
2. **AWS SES** - Cost-effective for high volume
3. **Mailgun** - Good deliverability, free tier
4. **Postmark** - Excellent delivery rates

These services provide:
- Better deliverability
- Email analytics
- Higher sending limits
- Professional email templates
- Bounce and spam handling

---

## Current Status

✅ OTP displayed in backend console (working)
⚠️  Email sending requires Gmail App Password configuration
✅ Registration works even if email fails
✅ Graceful error handling implemented

---

**After configuring email, both console logging AND email sending will work simultaneously for better reliability!**
