# 🔐 Admin Panel - Complete Feature Documentation

## ✅ Admin Pages Created

### 1. **Admin Profiles Page** (`/admin/profiles`)
Complete profile management system with full CRUD operations.

### 2. **Admin Reports Page** (`/admin/reports`)
Comprehensive report review and management system.

---

## 📋 Admin Profiles Page Features

### **Overview Statistics**
- ✅ Total Profiles Count
- ✅ Premium Profiles Count
- ✅ Verified Profiles Count (profiles with 2+ verifications)

### **Profile Management Table**
Displays all profiles with the following information:
- ✅ Profile ID (e.g., MAT010001)
- ✅ Name with avatar
- ✅ Email (from user account)
- ✅ Gender (color-coded chips)
- ✅ Age (auto-calculated from DOB)
- ✅ Location (City, State)
- ✅ Verification Level (0/4 to 4/4)
  - ID Verification
  - Photo Verification
  - Education Verification
  - Income Verification
- ✅ Premium Status (Premium/Free)
- ✅ Active Status (Active/Inactive)

### **Filtering Options**
- ✅ Filter by Verification Status (All/Verified/Not Verified)
- ✅ Filter by Premium Status (All/Premium/Free)
- ✅ Refresh button to reload data

### **Pagination**
- ✅ Rows per page: 5, 10, 25, 50
- ✅ Page navigation
- ✅ Total count display

### **Profile Verification Dialog**
Admin can verify profiles with checkboxes for:
- ✅ ID Verified
- ✅ Photo Verified
- ✅ Education Verified
- ✅ Income Verified

**Verification Levels:**
- 0/4: Not verified
- 1/4: Partially verified
- 2/4: Moderately verified (shows as verified)
- 3/4: Highly verified
- 4/4: Fully verified

---

## 📋 Admin Reports Page Features

### **Overview Statistics**
- ✅ Total Reports Count
- ✅ Pending Reports Count
- ✅ Resolved Reports Count
- ✅ Dismissed Reports Count

### **Reports Management Table**
Displays all reports with the following information:
- ✅ Report ID (last 6 characters)
- ✅ Reported By (email of reporter)
- ✅ Reported User (email of reported user)
- ✅ Category (with severity-based color coding)
  - Harassment (Red)
  - Inappropriate Content (Red)
  - Spam (Orange)
  - Fake Profile (Orange)
  - Other (Blue)
- ✅ Reason (truncated, with tooltip for full text)
- ✅ Status (Pending/Resolved/Dismissed)
- ✅ Date (formatted as "MMM dd, yyyy")

### **Filtering Options**
- ✅ Filter by Status (All/Pending/Resolved/Dismissed)
- ✅ Refresh button to reload data

### **Alert System**
- ✅ Warning alert when there are pending reports
- Shows count of pending reports needing review

### **Report Review Dialog**
Shows complete report details:
- Reported By email
- Reported User email
- Category
- Report Date & Time
- Reason
- Description (if provided)

**Admin Review Form:**
- ✅ Status dropdown (Pending/Resolved/Dismissed)
- ✅ Action Taken field (what admin did)
- ✅ Admin Notes field (internal notes)
- ✅ Auto-captures reviewer ID and review timestamp

---

## 🎨 UI/UX Features

### **Color-Coded System**
- **Green:** Success states (Active, Verified, Resolved)
- **Orange/Yellow:** Warning states (Pending, Moderately verified)
- **Red:** Error/Alert states (Inactive, Harassment reports)
- **Blue:** Info states (Premium, Other reports)
- **Grey:** Neutral states (Dismissed, Free users)

### **Icons Used**
- **Profiles:** Avatar, Verified, Premium, Visibility, Refresh
- **Reports:** Warning, CheckCircle, Block, Pending, Report

### **Responsive Design**
- ✅ Works on all screen sizes
- ✅ Grid layout for stats cards
- ✅ Responsive tables with horizontal scroll on mobile
- ✅ Adaptive dialogs

### **Loading States**
- ✅ CircularProgress spinner while loading data
- ✅ Disabled buttons during actions
- ✅ Loading indicators

### **Empty States**
- ✅ "No profiles found" message
- ✅ "No reports found" message
- ✅ Helpful text when filters return no results

---

## 🔌 Backend API Integration

### **Profile APIs Used**
```javascript
// Get all profiles with pagination and filters
GET /api/admin/profiles?page=1&limit=10&verified=true&premium=false

// Verify a profile
PUT /api/admin/profiles/:profileId/verify
Body: { idVerified, photoVerified, educationVerified, incomeVerified }

// Get dashboard stats
GET /api/admin/dashboard
```

### **Report APIs Used**
```javascript
// Get all reports with pagination and filters
GET /api/admin/reports?page=1&limit=10&status=pending

// Update a report
PUT /api/admin/reports/:reportId
Body: { status, actionTaken, adminNotes }

// Get dashboard stats
GET /api/admin/dashboard
```

---

## 🚀 How to Use

### **Admin Profiles Page**

1. **Login as Admin:**
   - Email: `admin@matrimony.com`
   - Password: `Admin@123`

2. **Navigate to Admin → Profiles**

3. **View Profiles:**
   - See all profiles in a table
   - Check verification levels
   - Identify premium users

4. **Filter Profiles:**
   - Select "Verified" to see only verified profiles
   - Select "Premium" to see only premium users
   - Use both filters together

5. **Verify a Profile:**
   - Click the Verify icon (checkmark) on any profile
   - Check the verification types to approve
   - Click "Update Verification"
   - Profile verification level updates immediately

### **Admin Reports Page**

1. **Navigate to Admin → Reports**

2. **View Reports:**
   - See all user reports
   - Check pending reports (yellow warning)
   - Review resolved/dismissed reports

3. **Filter Reports:**
   - Select "Pending" to see only pending reports
   - Select "Resolved" to see completed reviews
   - Select "Dismissed" to see dismissed reports

4. **Review a Report:**
   - Click the View icon (eye) on any report
   - Read full report details
   - Update status (Pending/Resolved/Dismissed)
   - Add action taken (e.g., "User suspended 7 days")
   - Add internal notes
   - Click "Update Report"

---

## 📊 Example Workflows

### **Workflow 1: Verify a New Profile**
1. Admin receives notification of new profile
2. Go to Admin → Profiles
3. Find the profile in the table
4. Click Verify icon
5. Check "ID Verified" and "Photo Verified"
6. Click "Update Verification"
7. Profile now shows 2/4 verification level

### **Workflow 2: Handle a Report**
1. Admin sees warning: "You have 3 pending reports"
2. Go to Admin → Reports
3. Filter by "Pending"
4. Click View icon on first report
5. Read details: "User sent inappropriate messages"
6. Update status to "Resolved"
7. Action taken: "User suspended for 7 days"
8. Admin notes: "First offense, warning email sent"
9. Click "Update Report"
10. Report marked as resolved

### **Workflow 3: Find Premium Profiles**
1. Go to Admin → Profiles
2. Set Premium filter to "Premium"
3. See all premium users
4. Check their verification levels
5. Prioritize verification for premium users

---

## 🔍 Data Displayed

### **Profile Virtual Properties**
The Profile model now exposes these virtual properties:
- `firstName` - from `personalInfo.firstName`
- `lastName` - from `personalInfo.lastName`
- `gender` - from `personalInfo.gender`
- `age` - calculated from `personalInfo.dateOfBirth`
- `profilePhoto` - from `photos` array
- `education` - from `professionalInfo.education`
- `occupation` - from `professionalInfo.occupation`
- `city`, `state`, `country` - from `location.*`
- `religion` - from `religiousInfo.religion`

### **Report Categories**
- `harassment` - Harassment or bullying
- `inappropriate_content` - Offensive or explicit content
- `spam` - Spam or advertising
- `fake_profile` - Fake or impersonation
- `scam` - Scam or fraud
- `other` - Other reasons

### **Report Statuses**
- `pending` - Awaiting admin review
- `resolved` - Admin took action
- `dismissed` - Report dismissed (false report)

---

## 🎯 Features Summary

### **Admin Profiles Features:**
✅ View all profiles with pagination
✅ Filter by verification status
✅ Filter by premium status
✅ Profile verification management
✅ Multi-level verification (4 types)
✅ Visual verification indicators
✅ Premium badge display
✅ Active/inactive status
✅ Avatar display
✅ Real-time stats

### **Admin Reports Features:**
✅ View all reports with pagination
✅ Filter by status
✅ Severity-based color coding
✅ Report review dialog
✅ Status management
✅ Action tracking
✅ Admin notes
✅ Alert for pending reports
✅ Detailed report information
✅ Timestamp display

---

## 🔧 Technical Details

### **Technologies Used:**
- **Frontend:** React 18, Material-UI v5
- **State Management:** React Hooks (useState, useEffect)
- **API Calls:** Axios (via adminService)
- **Date Formatting:** date-fns
- **Notifications:** react-toastify

### **Components:**
- Table, TablePagination
- Dialog, DialogTitle, DialogContent, DialogActions
- Chip, Avatar, Tooltip
- Card, CardContent
- FormControl, Select, TextField, Checkbox
- CircularProgress, Alert
- Icons from @mui/icons-material

### **Performance:**
- ✅ Pagination prevents loading all data at once
- ✅ Filters reduce data transfer
- ✅ Loading states provide user feedback
- ✅ Conditional rendering optimizes performance

---

## 📝 Sample Data

### **Sample Profile Entry:**
```json
{
  "profileId": "MAT010001",
  "firstName": "Asha",
  "lastName": "Kumar",
  "gender": "female",
  "age": 31,
  "city": "Bengaluru",
  "state": "Karnataka",
  "verification": {
    "idVerified": true,
    "photoVerified": true,
    "educationVerified": false,
    "incomeVerified": false
  },
  "isPremium": false,
  "isActive": true
}
```

### **Sample Report Entry:**
```json
{
  "_id": "67890abc",
  "reportedBy": { "email": "user1@example.com" },
  "reportedUser": { "email": "user2@example.com" },
  "category": "harassment",
  "reason": "Sending inappropriate messages",
  "description": "User sent multiple offensive messages after I declined their interest.",
  "status": "pending",
  "createdAt": "2025-11-22T10:30:00Z"
}
```

---

## 🎉 Success Indicators

**Admin Profiles Page is working if you see:**
- ✅ Stats cards showing counts
- ✅ Table with profile data
- ✅ Filters working
- ✅ Verify dialog opens on icon click
- ✅ Verification updates successfully

**Admin Reports Page is working if you see:**
- ✅ Stats cards showing report counts
- ✅ Table with report data
- ✅ Warning alert for pending reports
- ✅ Review dialog opens on icon click
- ✅ Status updates successfully

---

## 🚨 Troubleshooting

### **Issue: No profiles showing**
**Solution:** 
- Check if database has profiles (use `node check-db-data.js`)
- Verify backend server is running
- Check browser console for errors

### **Issue: Verification not updating**
**Solution:**
- Check backend logs for errors
- Verify admin is logged in
- Check API response in Network tab

### **Issue: Reports not loading**
**Solution:**
- Verify backend API endpoint `/api/admin/reports` works
- Check if Report model exists
- Test API with: `curl http://localhost:5000/api/admin/reports -H "Authorization: Bearer TOKEN"`

---

## 📚 Next Steps

### **Potential Enhancements:**
1. **Profiles Page:**
   - Add search by name/email
   - Add profile deletion
   - Add bulk verification
   - Add export to CSV
   - Add profile activity timeline

2. **Reports Page:**
   - Add bulk action (mark multiple as resolved)
   - Add report search
   - Add automatic actions (e.g., auto-suspend on 3 reports)
   - Add email notification to reported user
   - Add report analytics

---

**Created:** November 22, 2025

**Status:** ✅ **FULLY FUNCTIONAL**

**Pages:** 
- `/admin/profiles` - Complete
- `/admin/reports` - Complete

**Backend APIs:** All working

**Frontend Integration:** Complete
