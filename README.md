# 💑 Matrimony App - MERN Stack

A full-featured matrimony/matchmaking web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time messaging, advanced matching algorithms, and comprehensive admin dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://frontend-qzcbb0r9v-sajeeb2186s-projects.vercel.app)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com)

## ✨ Features

### For Users
- 📝 **User Registration & Authentication**
  - Email verification with OTP
  - Secure JWT-based authentication
  - Password reset functionality

- 👤 **Profile Management**
  - Comprehensive profile creation
  - Photo uploads
  - Personal, family, and preference details
  - Profile verification system

- 🔍 **Advanced Search & Matching**
  - Filter by age, location, education, occupation
  - Religion and caste-based search
  - Height and marital status filters
  - Smart matching algorithm

- 💬 **Real-Time Messaging**
  - Socket.IO powered instant messaging
  - Conversation history
  - Message timestamps
  - Online/offline status

- ❤️ **Interest Management**
  - Send interest requests
  - Accept/reject interests
  - Shortlist profiles
  - Favorites management

### For Administrators
- 📊 **Admin Dashboard**
  - User statistics and analytics
  - Profile management
  - User verification
  - Content moderation

- 👥 **User Management**
  - Activate/deactivate accounts
  - Suspend users with reason
  - Delete accounts (cascade delete)
  - View user details

## �� Tech Stack

### Frontend
- React 18, Redux Toolkit, Material-UI v5
- React Router v6, Socket.IO Client, Axios
- date-fns, React Toastify, Framer Motion

### Backend
- Node.js v22, Express.js, MongoDB, Mongoose
- Socket.IO, JWT, bcrypt, Nodemailer
- Helmet, CORS, Express Rate Limit

### Deployment
- Vercel (Frontend & Backend)
- MongoDB Atlas (Database)
- Gmail SMTP (Email Service)

## 📦 Installation

### Prerequisites
- Node.js v18+ and npm
- MongoDB or MongoDB Atlas
- Gmail account for emails

### Setup

1. **Clone repository**
```bash
git clone https://github.com/yourusername/matrimony-app.git
cd matrimony-app
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm start
```

Visit `http://localhost:3000`

## 📧 Email Configuration

1. Enable 2-Factor Authentication on Google Account
2. Generate App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Add to backend `.env`:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

## 🔐 Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/matrimony
JWT_SECRET=your_secure_random_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Key Features

- ✅ Email OTP verification
- ✅ Real-time messaging (Socket.IO)
- ✅ Advanced profile search
- ✅ Interest system
- ✅ Admin dashboard
- ✅ Profile verification
- ✅ User management

## 🚀 Deployment

Deploy to Vercel:
```bash
cd backend && vercel --prod
cd frontend && vercel --prod
```

See `docs/VERCEL_DEPLOYMENT_GUIDE.md` for details.

## 👨‍💻 Author

**Sajeeb**
- GitHub: [@sajeeb2186](https://github.com/sajeeb2186)

## �� License

MIT License - see LICENSE file

---

**Live Demo:** [https://frontend-qzcbb0r9v-sajeeb2186s-projects.vercel.app](https://frontend-qzcbb0r9v-sajeeb2186s-projects.vercel.app)
