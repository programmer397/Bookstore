"use strict";
/*import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve("../.env")})*/
import express from "express";
import session from "express-session";
import data from "./config.json" with { type: "json" };
import dbconfig from "./dbconfig.js"
import mysql from "mysql2/promise";


const db = mysql.createPool(dbconfig);
const app = express();



export { db };


import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);



app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = { guest: true };
  }
  next();
});

app.listen(data.port, data.host, () => {
  console.log(`${data.host}: ${data.port} Listening`);
});
