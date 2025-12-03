import express from "express";
import { db } from "../server.js";
const router = express.Router();

router.get("/allbooks", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM book");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Tietokantavirhe" });
  }
});

router.get("/topbooks", async (req, res) => {
  let titles = [
    "Court of Winter",
    "When The Cherry Trees Blossomed: The Expansion of Opus Dei in Japan",
    "Death's Detective: The Malykant Mysteries",
    "Fire (A Companion to Graceling)",
    "Treason",
    "Art of War",
    "Water: Nature and Culture",
  ];
  const placeholder = titles.map(() => "?").join(",");
  const sql = `SELECT * FROM BOOK WHERE title IN (${placeholder})`;
  try {
    const [rows] = await db.execute(sql, titles);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Tietokantavirhe" });
  }
});

export default router;
