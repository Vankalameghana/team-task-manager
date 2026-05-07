const sqlite3 = require("sqlite3").verbose();

// This creates the actual database file: database.db
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.log("Database connection error:", err.message);
  } else {
    console.log("SQLite database connected (database.db created)");
  }
});

// ================= USERS TABLE =================
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
`);

// ================= PROJECTS TABLE =================
db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    createdDate TEXT,
    deadline TEXT,
    filePath TEXT,
    createdBy INTEGER
  )
`);

// ================= TASKS TABLE =================
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT,
    assignedTo INTEGER,
    projectId INTEGER,
    createdDate TEXT
  )
`);

module.exports = db;