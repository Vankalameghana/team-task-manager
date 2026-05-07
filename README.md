📌 Team Task Manager (Full Stack Web Application)

A full-stack Team Task Management System designed to help teams manage projects, assign tasks, and track progress efficiently.
Built using Node.js, Express.js, SQLite, HTML, CSS, and JavaScript, this project includes authentication, role-based access control, and an admin dashboard.

🚀 Project Overview

The Team Task Manager allows organizations or teams to:

Create and manage projects
Assign tasks to team members
Track task and project status
Manage users with role-based access (Admin & User)
View real-time dashboard analytics

It is designed with a simple, responsive UI and a secure backend API.

✨ Key Features
👤 1. Authentication System
User Signup & Login system
Password hashing using bcryptjs
Secure login using JWT (JSON Web Token)
Role-based access:
Admin
User
📁 2. Project Management
Create new projects
View all projects
Store project details in database
Track project status:
🟥 Pending
🟧 In Progress
🟩 Completed
✅ 3. Task Management
Create tasks inside projects
Assign tasks to users
Track task status
View tasks with assigned user details
🧑‍💼 4. Admin Dashboard

Admin can:

View total number of users
View total projects
View total tasks
View all registered users
Monitor all projects
Track overall system activity
👨‍💻 5. User Dashboard

Users can:

View assigned projects
View assigned tasks
Track progress of work
Access personal dashboard only
🎨 6. Frontend UI
Clean dark-themed UI
Responsive layout for mobile & desktop
Separate Admin and User interfaces
Login & Signup pages
Dashboard cards for analytics
Project tracking UI with status labels
🛠️ Tech Stack
🔹 Frontend
HTML5
CSS3
JavaScript (Vanilla JS)
🔹 Backend
Node.js
Express.js
🔹 Database
SQLite3
🔹 Security & Auth
bcryptjs (password hashing)
jsonwebtoken (JWT authentication)
📁 Project Structure
team_task_manager/
│
├── backend/
│   ├── server.js              # Main backend server
│   ├── package.json           # Dependencies
│   ├── database.db            # SQLite database
│
├── frontend/
│   ├── login.html             # Login page
│   ├── signup.html            # Signup page
│   ├── admin.html             # Admin dashboard
│   ├── user.html              # User dashboard
│   ├── style.css              # Styling
│   ├── auth.js                # Authentication logic
│   ├── admin.js              # Admin API handling
│
└── README.md
⚙️ Installation & Setup Guide
🔹 Step 1: Clone Repository
git clone https://github.com/your-username/team-task-manager.git
🔹 Step 2: Navigate to Project
cd team-task-manager/backend
🔹 Step 3: Install Dependencies
npm install

Installed packages:

express
sqlite3
bcryptjs
jsonwebtoken
cors
nodemon
🔹 Step 4: Start Backend Server
npm run dev

Server runs at:

http://localhost:5000
🌐 Frontend Usage

Open frontend pages directly in browser:

frontend/login.html
frontend/signup.html
frontend/admin.html

OR use Live Server in VS Code for better experience.

📡 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login user
📁 Projects
Method	Endpoint	Description
POST	/projects	Create project
GET	/projects	Get all projects
✅ Tasks
Method	Endpoint	Description
POST	/tasks	Create task
GET	/tasks	Get all tasks
🧑‍💼 Admin
Method	Endpoint	Description
GET	/admin/dashboard	Admin analytics
📊 Admin Dashboard Features
Total Users Count
Total Projects Count
Total Tasks Count
User Management View
Project Overview
System Analytics
🔐 Security Features
Password hashing using bcrypt
JWT authentication for sessions
Protected API routes
Role-based access control
🔮 Future Improvements

This project can be upgraded to production-level with:

🔥 React frontend upgrade
🔥 MongoDB / PostgreSQL database
🔥 Real-time notifications (Socket.io)
🔥 Drag & Drop Kanban Board (Trello-style)
🔥 Email notifications
🔥 Deployment (Render / Vercel / Netlify)
🔥 Team invite system
