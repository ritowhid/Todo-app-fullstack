# 📝 'Do-It' Todo App (Full Stack)

A full-stack Todo application built with **React**, **Node.js**, **Express**, and **MySQL**, featuring JWT authentication and user-specific task management.

---

## 🚀 Features

- User Signup & Login (JWT Authentication)
- Protected Routes (token-based access)
- Create, Read, Update, Delete (CRUD) Todos
- Toggle task status (Active / Completed)
- User-specific task separation
- Secure password hashing with bcrypt
- Input validation on backend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
project-root/
│
├── client/                  (React frontend)
│   ├── src/pages/Home.jsx
│   ├── src/pages/Login.jsx
│   ├── src/pages/SignUp.jsx
│   └── App.jsx
│
├── server/                  (Node backend)
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd project-root
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
JWT_SECRET=mysecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=todos_app
```

Run server:

```bash
node server.js
```

Server runs on: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔐 Authentication Flow

1. User signs up → JWT token generated
2. Token stored in `localStorage`
3. Token sent in `Authorization` header:
```
   Bearer <token>
```
4. Backend middleware (`verifyToken`) protects routes

---

## 📌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create user |
| POST | `/login` | Login user |

### Todos (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/read-tasks` | Get user tasks |
| POST | `/new-task` | Create task |
| POST | `/update-task` | Update task |
| POST | `/delete-task` | Delete task |
| POST | `/toggle-task` | Toggle status |

---

## 🧠 Key Improvements (Latest Fix)

- Added input validation for login/signup
- Prevented empty request crashes
- Safer password comparison handling
- Improved backend stability without changing logic flow

---

## 📷 UI Overview

- **Login page** → First entry point
- **Signup page** → Create account
- **Home page** → Task dashboard with tabs:
  - All
  - Active
  - Completed

---

## ⚠️ Notes

- Ensure MySQL server is running before starting backend
- Ensure `.env` variables are correctly configured
- Token is required for all task routes

---

## 👨‍💻 Author

Built by **Rakibul Towhid**

---

## 📌 License

This project is for learning and portfolio use.
