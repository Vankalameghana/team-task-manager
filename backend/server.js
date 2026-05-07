const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= UPLOAD =================
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const db = new sqlite3.Database("database.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    createdDate TEXT,
    deadline TEXT,
    filePath TEXT,
    createdBy INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT,
    assignedTo INTEGER,
    projectId INTEGER,
    createdDate TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT,
    projectId INTEGER,
    contribution TEXT,
    createdBy INTEGER
  )`);
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)`,
    [name, email, hash, role],
    (err) => {
      if (err) return res.status(400).json({ message: "User exists" });
      res.json({ message: "Signup success" });
    }
  );
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email=?`, [email], async (err, user) => {
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET");

    res.json({ token, user });
  });
});

// ================= USER LIST (ADMIN FIX) =================
app.get("/users", (req, res) => {
  db.all(`SELECT id,name,email,role FROM users`, (err, rows) => {
    res.json(rows);
  });
});

// ================= PROJECTS =================
app.post("/projects", (req, res) => {
  const { title, description, deadline, createdBy } = req.body;

  db.run(
    `INSERT INTO projects(title,description,createdDate,deadline,filePath,createdBy)
     VALUES (?,?,?,?,?,?)`,
    [title, description, new Date().toISOString(), deadline, "", createdBy],
    () => res.json({ message: "Project created" })
  );
});

app.get("/projects", (req, res) => {
  db.all(
    `SELECT projects.*, users.name AS creatorName
     FROM projects JOIN users ON users.id = projects.createdBy`,
    (err, rows) => res.json(rows)
  );
});

// ================= TASKS =================
app.post("/tasks", (req, res) => {
  const { title, status, assignedTo, projectId } = req.body;

  db.run(
    `INSERT INTO tasks(title,status,assignedTo,projectId,createdDate)
     VALUES (?,?,?,?,?)`,
    [title, status, assignedTo, projectId, new Date().toISOString()],
    () => res.json({ message: "Task created" })
  );
});

app.get("/tasks", (req, res) => {
  db.all(
    `SELECT tasks.*, users.name AS assignedUser, projects.title AS projectTitle
     FROM tasks
     JOIN users ON users.id = tasks.assignedTo
     JOIN projects ON projects.id = tasks.projectId`,
    (err, rows) => res.json(rows)
  );
});

// ================= TEAM =================
app.post("/team", (req, res) => {
  const { name, email, role, projectId, contribution, createdBy } = req.body;

  db.run(
    `INSERT INTO team_members(name,email,role,projectId,contribution,createdBy)
     VALUES (?,?,?,?,?,?)`,
    [name, email, role, projectId, contribution, createdBy],
    () => res.json({ message: "Team added" })
  );
});

app.get("/team", (req, res) => {
  db.all(`SELECT * FROM team_members`, (err, rows) => res.json(rows));
});

// ================= ADMIN DASHBOARD =================
app.get("/admin/dashboard", (req, res) => {
  db.all(`SELECT * FROM users`, (e1, users) => {
    db.all(`SELECT * FROM projects`, (e2, projects) => {
      db.all(`SELECT * FROM tasks`, (e3, tasks) => {
        db.all(`SELECT * FROM team_members`, (e4, team) => {
          res.json({
            totalUsers: users.length,
            totalProjects: projects.length,
            totalTasks: tasks.length,
            totalTeam: team.length
          });
        });
      });
    });
  });
});

app.listen(5000, () => console.log("Server running on 5000"));