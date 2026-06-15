# Radiant High School ERP
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
Attendance corrections
Student promotion
Student status changes
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
Promote students
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

# Sprint 5 → Attendance Module ✅

## Attendance System

Implemented:

```text
Mark attendance
Attendance history
NOT_MARKED detection
HOD attendance correction
Attendance audit logs
```

Attendance statuses:

```text
PRESENT
ABSENT
LEAVE
```

---

## Attendance Rules

### CLASS_TEACHER

Can:

```text
Mark attendance
View attendance history
```

Restrictions:

```text
Only assigned classes
Only today's attendance
Cannot edit attendance
```

---

### HOD

Can:

```text
View all classes
Correct attendance
Edit previous attendance
Backdate attendance if required
```

---

## Attendance Features Implemented

```text
Class-wise attendance
Teacher class restriction
Duplicate prevention
Today-only attendance
Attendance history
NOT_MARKED detection
Attendance correction
Reason mandatory for edits
Audit logs
```

---

## Attendance Security

Implemented:

```text
Teacher ownership validation
Duplicate DB protection
HOD override
Attendance change tracking
```

---

## Attendance APIs

```http
POST /api/attendance/mark
GET  /api/attendance/history
PUT  /api/attendance/edit
```

---

## Attendance Change Logs

Every attendance correction maintains:

```text
Old Status
New Status
Changed By
Reason
Timestamp
```

---

# Database Collections

Implemented collections:

```text
users
academic_years
students
student_academic_records
attendance
attendance_change_logs
```

Upcoming collections:

```text
payments
payment_history
audit_logs
fee_structures
student_promotions
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
COMPLETE
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

## Sprint 5

```text
Attendance Module
```

Status:

```text
COMPLETE
```

Completed:

```text
Attendance Marking
Duplicate Prevention
Attendance History
NOT_MARKED Detection
Attendance Correction
Attendance Audit Logs
Teacher Restrictions
HOD Override
```

---

# Upcoming Roadmap

# Sprint 6 → Administration Layer

Status:

```text
PLANNED
```

### Phase 6.1 → Role Management

SUPER_ADMIN can:

```text
Assign HOD
Change user roles
Promote/Demote staff permissions
```

Example:

```text
CLASS_TEACHER → HOD
HOD → CLASS_TEACHER
```

---

### Phase 6.2 → Teacher Assignment Management

SUPER_ADMIN can:

```text
Assign teacher to class
Remove teacher assignments
View teacher assignments
```

Example:

```text
Teacher
↓
5-A
6-B
```

---

### Phase 6.3 → Student Promotion System

SUPER_ADMIN & HOD can:

```text
Promote students to next class
Maintain academic history
```

Example:

```text
2026 → 5-A
2027 → 6-A
```

without overwriting history.

---

### Phase 6.4 → Student Status Management

SUPER_ADMIN & HOD can change:

```text
ACTIVE
TRANSFERRED
DROPPED
GRADUATED
```

Example:

```text
Student leaving school
↓
TRANSFERRED
```

No deletion.

History preserved.

---

# Sprint 7 → Billing Module

Status:

```text
PLANNED
```

Features:

```text
School Fees
Bus Fees
Tuition Fees
Partial Payments
Receipt Generation (PDF)
Pending Balance
Payment History
Reports
Fee Due Tracking
```

---

# Sprint 8 → Super Admin Dashboard

Status:

```text
PLANNED
```

Features:

```text
School Analytics
Attendance Reports
Fee Reports
Teacher Reports
Student Reports
Academic Year Management
```

---

# Sprint 9 → Parent Communication Layer

Status:

```text
PLANNED
```

Features:

```text
WhatsApp Alerts
Attendance Alerts
Fee Due Reminders
Admission Follow-up
Broadcast Notifications
```

Examples:

```text
"Your child was absent today."

"Fees due: ₹5,000"
```

---

# Sprint 10 → AI School Assistant

Status:

```text
PLANNED
```

Features:

```text
Parent Queries
Fee Queries
Attendance Queries
Admission Support
School Information Assistant
```

Examples:

```text
"Did my child attend school today?"

"What fees are pending?"

"What is tomorrow's holiday?"
```

---

# Author

Built as a scalable, production-ready School Management System using the MERN stack.