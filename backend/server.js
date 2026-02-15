import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import attemptRoutes from "./routes/attempt.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/gamified_quiz")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);

// Start server
app.listen(5000, () => console.log("Backend running on port 5000"));
