# 🎉 Event Management System
A comprehensive event booking and management platform with **web** and **mobile** applications for users and administrators.

## 🎯 About

The **Event Management System** is a full-stack application that enables users to discover, book, and manage events via web and mobile platforms.  
It also provides an **Admin Dashboard** for event organizers to manage event details, attendees, and bookings.  
Built with **React.js** (web), **React Native** (mobile), and **Node.js/Express** (backend), with **MySQL** as the database.

## ✨ Features
### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing
- Role-based access (User & Admin)
- Account status control (Active/Inactive)

### 🎟 User Features
- Event browsing & search
- Category & date filters
- Event booking & cancellation
- Mobile app access for convenience
- Responsive web design

### 🛠 Admin Features
- Add, edit, and delete events
- Manage attendees & bookings
- View booking statistics
- 
## 🛠 Tech Stack

### Frontend (Web - Client & Admin)
- **React.js**
- HTML, CSS, Bootstrap (UI Framework)
- React Router
- Axios

### Frontend (Mobile)
- **React Native**
- Expo CLI

### Backend
- **Node.js / Express.js**
- MySQL
- JWT Authentication
- MySQL

### Development Tools
- Git & GitHub
- VS Code
- Postman (API testing)

- 
## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MySQL
- npm or yarn
- Git
### Backend Setup
```bash
git clone https://github.com/Event-Mangament-System/server-repo.git
cd backend
npm install
npm start
---------------
Backend will start on http://localhost:5000
-------------------
Client Web Setup
bash
Copy
Edit
cd client-web
npm install
npm start
-------------
Client will start on http://localhost:3000
--------------
Admin Web Setup
bash
Copy
Edit
cd admin-web
npm install
npm start
Admin panel will start on http://localhost:5174

Mobile App Setup
bash
Copy
Edit
cd mobile-app
npm install
npm start
Run using Expo on an emulator or physical device.

📚 API Documentation
Once backend is running, API documentation is available via Postman collection or Swagger (if integrated).

Example Endpoints:

Method	Endpoint	   Description
POST	/api/auth/register User registration
POST	/api/auth/login	   User login
GET	/api/events	   Get all events
POST	/api/events	   Add event (Admin)
PUT	/api/events/:id	   Update event (Admin)
DELETE	/api/events/:id	   Delete event (Admin)


👥 Development Team
This project is developed by a dedicated team of four developers:
  - Babli, 
  - Santoshi,
  - Amruta, 
  - Janhvi

Developed as part of Post Graduate Diploma in Mobile Computing (PG-DMC) program at CDAC.

*Built with ❤ by Team S.A.J.B. Planners | PG-DMC CDAC Final Project*

