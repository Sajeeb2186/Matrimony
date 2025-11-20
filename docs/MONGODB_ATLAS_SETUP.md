# MongoDB Atlas Setup Guide

## Step-by-Step Instructions to Setup MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Sign up with email or Google account
4. Complete registration

### Step 2: Create a Cluster (Database)
1. After login, click "Build a Database"
2. Choose **FREE tier (M0)**
3. Select configuration:
   - **Cloud Provider:** AWS (recommended)
   - **Region:** Choose closest to your location or Vercel's region
   - **Cluster Name:** Keep default or name it "Matrimony"
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster creation

### Step 3: Create Database User
1. On the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: Choose a username (e.g., `matrimony_admin`)
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - Or create your own strong password
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

**⚠️ IMPORTANT: Save your username and password!**

### Step 4: Whitelist IP Addresses
1. On the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Choose one option:
   - **Option A (Recommended for Vercel):**
     - Click "Allow Access from Anywhere"
     - IP Address will be: `0.0.0.0/0`
   - **Option B (More Secure):**
     - Add specific Vercel IP ranges (check Vercel docs)
4. Description: "Vercel Access"
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" button for your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Format Connection String
Replace placeholders in the connection string:

**Original:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
1. `<username>` → Your database username (e.g., `matrimony_admin`)
2. `<password>` → Your database password
3. Add database name before `?`: `/matrimony?`

**Final Format:**
```
mongodb+srv://matrimony_admin:YourPassword123@cluster0.xxxxx.mongodb.net/matrimony?retryWrites=true&w=majority
```

**Example:**
```
mongodb+srv://matrimony_admin:MySecurePass123@cluster0.abc123.mongodb.net/matrimony?retryWrites=true&w=majority
```

### Step 7: Test Connection (Optional but Recommended)
Create a test file `test-connection.js` in your backend folder:

```javascript
const mongoose = require('mongoose');

const MONGODB_URI = 'YOUR_CONNECTION_STRING_HERE';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err);
    process.exit(1);
  });
```

Run:
```bash
cd backend
node test-connection.js
```

---

## Quick Reference

### MongoDB Atlas Dashboard URLs
- **Main Dashboard:** https://cloud.mongodb.com
- **Database Access:** https://cloud.mongodb.com/v2#/account/security/database/users
- **Network Access:** https://cloud.mongodb.com/v2#/account/security/network/accessList

### Connection String Template
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

**Replace:**
- `USERNAME` → Your database username
- `PASSWORD` → Your database password
- `CLUSTER` → Your cluster address (e.g., cluster0.abc123)
- `DATABASE` → Your database name (e.g., matrimony)

---

## Common Issues & Solutions

### Issue: "Authentication failed"
**Solution:**
- Check username and password are correct
- Make sure you used the database user credentials (not Atlas account)
- Password special characters may need URL encoding

### Issue: "IP not whitelisted"
**Solution:**
- Go to Network Access
- Add 0.0.0.0/0 to allow from anywhere
- Wait 1-2 minutes for changes to apply

### Issue: "Connection timeout"
**Solution:**
- Check your internet connection
- Verify cluster is active (not paused)
- Try different region cluster

### Issue: "Database name not specified"
**Solution:**
- Add `/matrimony` before the `?` in connection string
- Format: `...mongodb.net/matrimony?retryWrites=true...`

---

## Security Best Practices

1. **Strong Password:** Use complex passwords with numbers, letters, special chars
2. **IP Whitelist:** In production, limit to specific IPs if possible
3. **Database User:** Create separate user for each environment
4. **Connection String:** Never commit to Git (use .env files)
5. **Monitoring:** Enable Atlas monitoring and alerts

---

## Free Tier Limits (M0)

- **Storage:** 512 MB
- **RAM:** Shared
- **Connections:** 500 max concurrent
- **Backup:** Not available
- **Cost:** FREE forever

**Sufficient for:**
- Development
- Testing
- Small production apps (<1000 users)

**Upgrade if needed:** Paid tiers start at $0.08/hour (~$57/month)

---

## For Vercel Deployment

When deploying to Vercel, add this connection string as environment variable:

**Variable Name:** `MONGODB_URI`
**Value:** Your formatted connection string

Example in Vercel Dashboard:
```
MONGODB_URI = mongodb+srv://matrimony_admin:MyPass123@cluster0.abc123.mongodb.net/matrimony?retryWrites=true&w=majority
```

---

## Monitoring Your Database

1. Go to "Metrics" in Atlas Dashboard
2. Monitor:
   - Connections
   - Operations per second
   - Storage usage
   - Network traffic

3. Set up alerts:
   - Click "Alerts" → "Create Alert"
   - Set threshold for connections, storage, etc.

---

**Your MongoDB Atlas is now ready for deployment!** 🎉

Use the connection string in your Vercel environment variables.
