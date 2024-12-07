import express from "express"
import mysql from "mysql2"
import cors from "cors"
import router from "./routes/userRoutes.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", router);

//db connection 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to MySQL database.");
});


app.listen(process.env.PORT,()=>{
    console.log("server is running on port 8181");
})