const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcrypt");

async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const pool = await poolPromise;
  return pool.request()
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, hashedPassword)
    .query("INSERT INTO Users (username, password) VALUES (@username, @password)");
}

async function getUserByUsername(username) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("username", sql.VarChar, username)
    .query("SELECT * FROM Users WHERE username = @username");
  return result.recordset[0];
}

module.exports = { registerUser, getUserByUsername };
