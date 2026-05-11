require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (!err) {
    console.log("Connected to database Successfully");
  } else {
    console.log(err);
  }
});

// ---------------- TOKEN ----------------
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).send("Token required");
  }

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = decoded;
    next();
  });
};

// ---------------- SIGNUP ----------------
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body || {};

  // FIX: prevent empty request crash
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const checkUser = "SELECT * FROM users WHERE email = ?";

  db.query(checkUser, [email], async (err, result) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    if (result.length > 0) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const q =
      "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

    db.query(q, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Signup failed");
      }

      const newUserId = result.insertId;

      const token = jwt.sign(
        { id: newUserId, email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.send({
        message: "Signup successful",
        token,
        user: { id: newUserId, username, email },
      });
    });
  });
});

// ---------------- LOGIN ----------------
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // FIX: prevent empty login request
  if (!email || !password) {
    return res.status(400).send("Email and password required");
  }

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], async (err, result) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = result[0];

    // FIX: prevent bcrypt crash if password missing
    const isMatch = password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send({
      message: "Login success",
      token,
      user,
    });
  });
});

// ---------------- TASK APIs (UNCHANGED LOGIC) ----------------
app.post("/new-task", verifyToken, (req, res) => {
  const q =
    "INSERT INTO todos (task, createdAt, status, user_id) VALUES (?, ?, ?, ?)";

  db.query(
    q,
    [req.body.task, new Date(), "active", req.user.id],
    (err) => {
      if (err) {
        console.log("failed to store task");
        return res.status(500).send("Failed to store task");
      }

      const updatedTasks = "SELECT * FROM todos WHERE user_id = ?";

      db.query(updatedTasks, [req.user.id], (error, newList) => {
        res.send(newList);
      });
    }
  );
});

app.get("/read-tasks", verifyToken, (req, res) => {
  const q = "SELECT * FROM todos WHERE user_id = ?";

  db.query(q, [req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to fetch tasks");
    }

    res.send(result);
  });
});

app.post("/update-task", verifyToken, (req, res) => {
  const q =
    "UPDATE todos SET task = ? WHERE id = ? AND user_id = ?";

  db.query(
    q,
    [req.body.updatedTask, req.body.updateId, req.user.id],
    (err) => {
      if (err) {
        console.log("failed to update", err);
        return res.status(500).send("Failed to update");
      }

      db.query(
        "SELECT * FROM todos WHERE user_id = ?",
        [req.user.id],
        (e, r) => {
          res.send(r);
        }
      );
    }
  );
});

app.post("/delete-task", verifyToken, (req, res) => {
  const q = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(q, [req.body.id, req.user.id], (err) => {
    if (err) {
      console.log("Failed to delete");
      return res.status(500).send("Failed to delete");
    }

    db.query(
      "SELECT * FROM todos WHERE user_id = ?",
      [req.user.id],
      (e, newList) => {
        res.send(newList);
      }
    );
  });
});

app.post("/toggle-task", verifyToken, (req, res) => {
  const { id, status } = req.body;

  const q =
    "UPDATE todos SET status = ? WHERE id = ? AND user_id = ?";

  db.query(q, [status, id, req.user.id], (err) => {
    if (err) {
      console.log("Failed to update status", err);
      return res.status(500).send(err);
    }

    db.query(
      "SELECT * FROM todos WHERE user_id = ?",
      [req.user.id],
      (e, newList) => {
        res.send(newList);
      }
    );
  });
});

app.listen(5000, () => {
  console.log("server started");
});