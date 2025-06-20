import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//! Middleware:
app.use(
  cors({
    origin: [
      "https://satinder-think-board.vercel.app",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());
app.use(ratelimiter);

//! Notes Routes:
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

//! Connect to MongoDB Database & Start the App:
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 App server is running in Port: ${port}`);
  });
});
