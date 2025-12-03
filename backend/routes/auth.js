import express from "express";
import { db } from "../server.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [email]);
    console.log(rows[0]);
    const user = rows[0];
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }
    req.session.user = { id: user.user_id, username: user.username, email: user.email, guest: false };
    res.json({ success: true, message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//log out backend
router.post("/logout", (req, res) => {
  if (!req.session.user) {
    res.clearCookie("connect.sid");
    return res.json({ success: true, message: "No active session" });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      res.clearCookie("connect.sid");
      return res.json({ success: true, message: "Session already destroyed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

//Create account backend
router.post("/createaccount", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: "Fields cannot be empty" });
  }
  try {
    const [rows] = await db.execute("SELECT * from user WHERE email = ? OR username = ?", [email, username]);

    if (rows.some((r) => r.email === email)) {
      return res.status(400).json({ success: false, type: "email_taken", message: "Email already in use" });
    }
    if (rows.some((r) => r.username === username)) {
      return res.status(400).json({ success: false, type: "username_taken", message: "Username already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.execute("INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hash]);
    res.json({ success: true, message: "Account created successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("username")) {
        return res.status(400).json({ success: false, type: "username_taken", message: "Username already in use" });
      }
      if (err.sqlMessage.includes("email")) {
        return res.status(400).json({ success: false, type: "email_taken", message: "Email already in use" });
      }
      return res.status(400).json({ success: false, type: "duplicate_entry", message: "Duplicate entry" });
    }
    res.status(500).json({ success: false, type: "server_error", message: "Server error" });
  }
});

//Onko kirjauduttu
let requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  next();
};

router.get("/me", (req, res) => {
  if (req.session.user) {
    return res.json({ loggedin: true, user: req.session.user });
  }
  res.json({ loggedin: false });
});

export default router;
