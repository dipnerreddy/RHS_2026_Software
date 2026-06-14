# School Management System (SMS)

A modern full-stack **School Management System** built using:

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT + RBAC
* **Future Integrations:** WhatsApp AI Agent, Attendance Alerts, Fee Reminders

---

# Tech Stack

## Frontend

* React 19
* Vite
* React Router DOM
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Project Architecture

```text
Client (React)
        ↓
API Layer (Axios Services)
        ↓
Node.js + Express
        ↓
MongoDB Atlas
```

---

# Features Implemented

# Sprint 1 → Backend Authentication

### MongoDB Integration

* MongoDB Atlas connected
* Environment configuration
* Centralized DB connection

### User Authentication

Implemented:

```text
Register
Login
Forgot Password
Reset Password
```

### Security

* Password hashing using bcryptjs
* JWT authentication
* Protected APIs
* Environment variables

### APIs

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
GET  /api/auth/profile
GET  /api/auth/me
```

---

# Sprint 2 → Frontend Authentication

### Authentication Pages

Implemented:

```text
Login
Register
Forgot Password
Reset Password
```

### Routing

Implemented:

```text
/
/login
/register
/home
/forgot-password
/reset-password/:token
```

### Route Protection

Protected routes:

```text
Home
Authenticated pages
```

Public routes:

```text
Login
Register
```

### Session Persistence

Implemented:

```text
JWT + localStorage
Persistent Login
Logout
Role-aware authentication
```

---

# Sprint 3 → Role-Based Access Control (RBAC)

## Roles

Implemented:

```text
SUPER_ADMIN
HOD
CLASS_TEACHER
BILLING_STAFF
```

---

## Role Permissions

### SUPER_ADMIN

Can:

```text
Everything
```

---

### HOD

Can:

```text
Attendance edits
View reports
Student visibility
```

---

### CLASS_TEACHER

Can:

```text
View assigned students
Mark attendance
View attendance history
```

Cannot:

```text
Edit attendance
View other class students
Billing
```

---

### BILLING_STAFF

Can:

```text
Fee collection
Reports
Student billing
```

---

## RBAC Middleware

Implemented:

```js
authorizeRoles(
  "SUPER_ADMIN"
)
```

Examples:

```js
authorizeRoles(
  "CLASS_TEACHER",
  "SUPER_ADMIN"
)
```

---

## User Model Enhancements

Added:

```text
role
assignedClasses
```

Example:

```js
assignedClasses: [
  {
    className: "5",
    section: "A"
  }
]
```

---

# Sprint 4 → School Foundation

## Academic Year Module

Implemented:

### Academic Year Model

Example:

```text
2026-2027
```

Features:

```text
Create academic year
Get all academic years
Get active academic year
Only one active year
```

### APIs

```http
POST /api/academic-years
GET  /api/academic-years
GET  /api/academic-years/active
```

---

## Student Module

### Student Identity Model

Implemented:

```text
Admission Number
Student Name
Father Name
Mother Name
Primary Phone
Secondary Phone
Gender
DOB
Admission Date
Address
Status
```

### Admission Number Generator

Auto-generated format:

```text
ADM20260001
ADM20260002
ADM20260003
```

Pattern:

```text
ADM + YEAR + SEQUENCE
```

### Student Status

Supported:

```text
ACTIVE
TRANSFERRED
DROPPED
GRADUATED
```

### APIs

```http
POST /api/students
GET  /api/students
GET  /api/students/search
```

Search supports:

```text
Student Name
Admission Number
Phone Number
```

---

## Student Academic Records

Purpose:

```text
Student
≠
Class
```

Tracks year-wise class history.

Example:

```text
2026-27 → Class 5-A
2027-28 → Class 6-A
```

### Model

Stores:

```text
Student
Academic Year
Class
Section
Roll Number
Status
```

### APIs

```http
POST /api/student-academic/assign
GET  /api/student-academic/class
```

---

## Teacher Assigned Student Visibility

Implemented:

Teacher can only see:

```text
Assigned Classes
```

Example:

Teacher:

```text
5-A
6-B
```

Can only view:

```text
Students from 5-A
Students from 6-B
```

No access to other classes.

### API

```http
GET /api/student-academic/assigned
```

---

# Database Collections

Implemented collections:

```text
users
academic_years
students
student_academic_records
```

Upcoming collections:

```text
attendance
attendance_change_logs
payments
audit_logs
teacher_assignments
```

---

# Current School Structure

## Supported Classes

```text
NURSERY
LKG
UKG
1
2
3
4
5
6
7
8
9
10
```

---

## Sections

Supported:

```text
A
B
C
D
```

---

# Current Project Structure

```text
project-root/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

# Environment Variables

## Backend (.env)

```env
PORT=8090

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8090
```

---

# Completed Sprints

## Sprint 1

```text
Authentication Backend
```

Status:

```text
COMPLETE
```

---

## Sprint 2

```text
Authentication Frontend
```

Status:

```text
COMPLETE
```

---

## Sprint 3

```text
RBAC + Role-aware Authentication
```

Status:

```text
COMPLETE
```

---

## Sprint 4

```text
School Foundation
```

Status:

```text
IN PROGRESS
```

Completed:

```text
Academic Year
Student Model
Student Search
Academic Records
Teacher Assigned Visibility
```

---

# Upcoming Phase → Attendance Module

## Attendance System

Teachers will:

```text
View assigned students
Mark attendance
View attendance history
```

Attendance statuses:

```text
PRESENT
ABSENT
LEAVE
```

---

## Rules

### Teachers

Can:

```text
Mark attendance
```

Cannot:

```text
Edit attendance later
```

---

### HOD

Can:

```text
Edit attendance
Correct mistakes
```

---

## Attendance Logs

Every attendance edit will maintain:

```text
Old Status
New Status
Changed By
Reason
Timestamp
```

---

## Attendance Features

Planned:

```text
Prevent duplicate attendance
Daily attendance
Attendance history
Class-wise attendance
Teacher-only assigned classes
HOD correction
Audit logs
```

---

# Future Roadmap

## Module 2 → Billing

Features:

```text
School Fees
Bus Fees
Partial Payments
Receipt Generation (PDF)
Payment History
Reports
Pending Balance
```

---

## Module 3 → Super Admin

Features:

```text
Student Promotion
Student Transfer
Teacher Assignment
Academic Year Management
Reports
```

---

## WhatsApp AI Agent (Future)

Features:

```text
Attendance Alerts
Fee Due Reminders
Parent Queries
AI School Assistant
```

Examples:

```text
"Did my child attend school today?"

"How much fees are pending?"
```

---

# Author

Built as a scalable, production-ready School Management System using the MERN stack.
