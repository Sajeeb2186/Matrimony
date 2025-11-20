# Admin Dashboard Features

## Overview
Complete admin dashboard with user management capabilities for the Matrimony application.

## Admin Access
- **Email**: admin@matrimony.com
- **Password**: Admin@123
- **Role**: admin

## Features Implemented

### 1. Admin Dashboard (`/admin/dashboard`)
Comprehensive statistics dashboard showing:
- **Total Users**: Count with weekly new registrations
- **Active Users**: Count with verified users
- **Total Profiles**: Count with premium profiles
- **Total Matches**: Count with recent interests
- **Pending Reports**: Requires attention
- **Verified Users**: With percentage
- **Recent Registrations**: This week's count
- **Premium Profiles**: With percentage

**Quick Actions**:
- Manage Users
- Manage Profiles
- View Reports
- Analytics (coming soon)

### 2. User Management (`/admin/users`)

#### Features:
- **View All Users**: Paginated table with user details
- **Filter Users**: 
  - By Status (Active/Inactive)
  - By Verification (Verified/Unverified)
- **User Actions**:

##### ✅ Activate/Deactivate User
- Toggle user's active status
- Deactivated users cannot login
- Icon: Block/CheckCircle

##### ✅ Verify/Unverify User
- Toggle user's verification status
- Affects profile visibility
- Icon: Visibility

##### ⚠️ Suspend User
- Temporarily suspend user account
- **Duration Options**:
  - 1 Day
  - 3 Days
  - 7 Days
  - 14 Days
  - 30 Days
  - 90 Days
  - 1 Year
- **Requires**: Suspension reason
- **Tracks**: 
  - Suspended date
  - Suspension duration
  - Reason for suspension
- Icon: Block (Warning color)

##### 🗑️ Delete User
- Permanently delete user account
- **Confirmation Required**
- **Deletes**:
  - User account
  - Associated profile
  - All interactions
  - All matches
  - **Cannot be undone**
- Icon: Delete (Red)

#### Protection:
- **Admin users cannot be modified** (all action buttons disabled for admin role)

#### Display Information:
- Email
- Phone
- Role (Admin/User badge)
- Status (Active/Inactive chip with icon)
- Verified status (Verified/Unverified chip)
- Registration date

#### Pagination:
- Options: 5, 10, 25, 50 per page
- Total count displayed

### 3. Backend API Endpoints

#### User Management:
```
GET    /api/admin/users                    - Get all users (with filters)
GET    /api/admin/users/:userId            - Get user details
PUT    /api/admin/users/:userId/status     - Update active/verified status
PUT    /api/admin/users/:userId/suspend    - Suspend user
DELETE /api/admin/users/:userId            - Delete user permanently
```

#### Dashboard:
```
GET    /api/admin/dashboard                - Get dashboard statistics
```

#### Profiles:
```
GET    /api/admin/profiles                 - Get all profiles
PUT    /api/admin/profiles/:profileId/verify - Verify profile
```

#### Reports:
```
GET    /api/admin/reports                  - Get all reports
PUT    /api/admin/reports/:reportId        - Update report status
```

## Database Schema Updates

### User Model:
```javascript
{
  suspendedAt: Date,           // When user was suspended
  suspendedUntil: Date,        // When suspension expires
  suspensionReason: String     // Reason for suspension
}
```

## Security Features
- All admin routes protected with JWT authentication
- Role-based access control (admin role required)
- Admin users cannot modify other admin accounts
- Confirmation dialogs for destructive actions
- Audit trail (suspension reason, dates)

## UI/UX Features
- Color-coded status chips
- Icon-based action buttons with tooltips
- Responsive design (works on all screen sizes)
- Loading states and error handling
- Toast notifications for all actions
- Confirmation dialogs for:
  - User suspension (with reason input)
  - User deletion (permanent action warning)

## Usage Flow

### To Suspend a User:
1. Navigate to Admin → Users
2. Find the user in the table
3. Click the warning Block icon
4. Enter suspension reason (required)
5. Select duration (default: 7 days)
6. Click "Suspend User"
7. User account is deactivated with tracked suspension details

### To Delete a User:
1. Navigate to Admin → Users
2. Find the user in the table
3. Click the red Delete icon
4. Review the warning message
5. Click "Delete Permanently"
6. User and all associated data removed from database

### To Filter Users:
1. Use the Status dropdown (All/Active/Inactive)
2. Use the Verified dropdown (All/Verified/Unverified)
3. Click "Clear Filters" to reset

## Future Enhancements
- Analytics dashboard with charts
- Export user data to CSV
- Bulk actions (suspend/delete multiple users)
- Email notifications to suspended users
- Activity logs for admin actions
- Advanced search (by email, phone, date range)
