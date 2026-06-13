# RHS_2026_Software

# Full Stack Authentication App

A full-stack authentication application built with **React**, **Node.js**, **Express**, and **MongoDB Atlas**.

---

## Tech Stack

### Frontend

* React 19
* Vite 8
* React Router DOM 7
* Axios
* Tailwind CSS 4

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

```text
project-root/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── config/
│   │   │   └── api.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── services/
│   │   │   └── authService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Features Implemented

### Backend

#### MongoDB Atlas Integration

* Connected backend to MongoDB Atlas
* Environment-based configuration
* Centralized database connection

#### User Registration

* Create new users
* Email uniqueness validation
* Password hashing using bcryptjs

#### User Login

* Email/password authentication
* Credential validation
* JWT generation

#### JWT Authentication

* Secure token creation
* Configurable expiration
* JWT secret stored in environment variables

#### Protected Routes

* Authentication middleware
* Token verification
* Access control for authenticated users

#### API Endpoints

##### Register

```http
POST /api/auth/register
```

##### Login

```http
POST /api/auth/login
```

##### Profile (Protected)

```http
GET /api/auth/profile
```

---

### Frontend

#### React Router Setup

Available Routes:

```text
/
/login
/register
/home
/forgot-password
/reset-password/:token
```

#### Smart Landing Route

```text
User visits "/"

Token Exists?
│
├── Yes → /home
│
└── No → /login
```

#### Protected Route Component

* Redirects unauthenticated users
* Prevents direct access to protected pages

#### Login Flow

```text
Login Page
    ↓
Backend Authentication
    ↓
JWT Received
    ↓
Stored in localStorage
    ↓
Redirect to Home
```

#### Logout Flow

```text
Logout
    ↓
Remove JWT
    ↓
Redirect to Login
```

#### API Service Layer

Centralized API communication using:

```text
authService.js
```

Functions:

```javascript
login()
register()
logout()
getToken()
isAuthenticated()
```

---

## Environment Variables

### Backend (.env)

```env
PORT=8090
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8090
```

---

## Authentication Flow

### Register

```text
User Registers
        ↓
Validate Input
        ↓
Hash Password
        ↓
Store User
        ↓
Success Response
```

### Login

```text
User Login
        ↓
Validate Credentials
        ↓
Generate JWT
        ↓
Return Token
        ↓
Store in localStorage
```

### Protected Route

```text
Request Protected Page
        ↓
Check Token
        ↓
Valid?
│
├── Yes → Allow Access
│
└── No → Redirect Login
```

---

## Security Implemented

* Password hashing with bcryptjs
* JWT authentication
* Environment variable configuration
* Protected API routes
* Protected frontend routes
* Email uniqueness validation

---

## Current Progress

### Sprint 1 - Backend Authentication

* [x] MongoDB Atlas Connection
* [x] User Schema
* [x] Registration API
* [x] Password Hashing
* [x] JWT Utility
* [x] Login API
* [x] JWT Middleware
* [x] Protected Route API

### Sprint 2 - Frontend Authentication

* [x] React Router Setup
* [x] Protected Route Component
* [x] Login Page
* [x] Login Integration
* [x] Logout Functionality
* [x] API Service Layer
* [x] Environment Configuration

### Upcoming

* [ ] Register Page UI
* [ ] Registration Integration
* [ ] Forgot Password API
* [ ] Reset Password API
* [ ] Email Integration
* [ ] Home Dashboard
* [ ] User Profile
* [ ] Deployment

---

## Run Locally

### Backend

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:8090
```

### Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Author

Built as a learning and production-ready authentication project using the MERN stack.
