import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../.env") });

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export default dbconfig;
