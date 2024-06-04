const mysql = require("mysql");
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "shortcut",
});

database.connect(err => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

module.exports = database;
