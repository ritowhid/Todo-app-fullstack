const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*******",
  database: "todos_app",
});

db.connect((err) => {
  if (!err) {
    console.log("Connected to database Successfully");
  } else {
    console.log(err);
  }
});

app.post("/new-task", (req, res) => {
  console.log(req.body);

  const q = "insert into todos (task, createdAt, status) values (?, ?, ?)";
  db.query(q, [req.body.task, new Date(), "active"], (err) => {
    if (err) {
      console.log("failed to store task");
    } else {
      const updatedTasks = "select * from todos";

      db.query(updatedTasks, (error, newList) => {
        res.send(newList);
      });
    }
  });
});

app.get("/read-tasks", (req, res) => {
  const q = "select * from todos";

  db.query(q, (err, result) => {
    if (err) {
      console.log("failed to read tasks");
    } else {
      res.send(result);
    }
  });
});

app.post("/update-task", (req, res) => {
  const q = "UPDATE todos SET task = ? WHERE id = ?";

  db.query(q, [req.body.updatedTask, req.body.updateId], (err) => {
    if (err) {
      console.log("failed to update", err);
    } else {
      db.query("select * from todos", (e, r) => {
        res.send(r);
      });
    }
  });
});

app.post("/delete-task", (req, res) => {
  const q = "delete from todos where id =?";
  db.query(q, [req.body.id], (err, result) => {
    if (err) {
      console.log("Failed to delete");
    } else {
      console.log("Deleted successfully");
      db.query("select * from todos", (e, newList) => {
        res.send(newList);
      });
    }
  });
});

app.post("/complete-task", (req, res) => {
  const q = "update todos set status = ? where id =?";
  db.query(q, ["completed", req.body.id], (err, result) => {
    if (result) {
      db.query("select * from todos", (e, newList) => {
        res.send(newList);
      });
    }
  });
});

app.listen(5000, () => {
  console.log("server started");
});
