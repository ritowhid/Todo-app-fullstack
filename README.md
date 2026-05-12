# 📝 'Do-It' Todo App (Full Stack)

A full-stack Todo application built with **React**, **Vite**, **Node.js**, **Express**, and **MySQL**, featuring JWT authentication and user-specific task management.

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
| Package | Purpose |
|---|---|
| React + Vite | UI framework & build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Styling |

### Backend
| Package | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| MySQL (mysql2) | Relational database |
| jsonwebtoken | JWT auth |
| bcryptjs | Password hashing |
| cors | Cross-origin requests |
| dotenv | Environment variables |

---

## 📁 Project Structure

```
project-root/
│
├── client/                  (React + Vite frontend)
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

### 2️⃣ Database Setup

Run the following SQL to initialize the database:

```sql
CREATE DATABASE IF NOT EXISTS todos_app;
USE todos_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    status ENUM('active', 'completed') DEFAULT 'active',
    user_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    CONSTRAINT fk_user_todo
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3️⃣ Backend Setup

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

### 4️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🗄️ Database Architecture

**Engine:** InnoDB | **Charset:** utf8mb4 (full Unicode + emoji support) | **Relationship:** One-to-Many (Users → Todos)

### Table: `users`
| Field | Type | Attributes | Description |
|---|---|---|---|
| id | INT(11) | PK, AI | Unique User ID |
| username | VARCHAR(100) | utf8mb4 | Display name |
| email | VARCHAR(100) | UNIQUE | Auth email |
| password | VARCHAR(255) | — | Bcrypt hashed |
| createdAt | TIMESTAMP | DEFAULT NOW | Created time |

### Table: `todos`
| Field | Type | Attributes | Description |
|---|---|---|---|
| id | INT(11) | PK, AI | Unique Task ID |
| task | VARCHAR(255) | utf8mb4 | Task content |
| status | ENUM | DEFAULT 'active' | active / completed |
| user_id | INT(11) | FK → users.id | Owner reference |
| createdAt | DATETIME | DEFAULT NOW | Created time |

> **Cascading Deletes:** Deleting a user automatically removes all their todos (`ON DELETE CASCADE`), maintaining referential integrity.

---

## 🔐 Authentication Flow

1. User signs up → password hashed with bcrypt → JWT token generated
2. Token stored in `localStorage`
3. Token sent in every request via `Authorization` header:
```
   Bearer <token>
```
4. Backend `verifyToken` middleware protects all task routes

---

## 📌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Create user |
| POST | `/login` | Login user |

### Todos (Protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/read-tasks` | Get user tasks |
| POST | `/new-task` | Create task |
| POST | `/update-task` | Update task |
| POST | `/delete-task` | Delete task |
| POST | `/toggle-task` | Toggle status |

---

## 📷 UI Overview

- **Login page** → Entry point
- **Signup page** → Create account
- **Home page** → Task dashboard with tabs:
  - All · Active · Completed

---

## ⚠️ Notes

- Ensure MySQL is running before starting the backend
- Ensure all `.env` variables are correctly set
- Token is required for all `/todos` routes
- Passwords are never stored in plain text

---

## 👨‍💻 Author

Built by **Rakibul Towhid**

## 📌 License

This project is for learning and portfolio use.
