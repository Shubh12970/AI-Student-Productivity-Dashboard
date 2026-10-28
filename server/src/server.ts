
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "StudyFlow API is running",
  });
});

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Check server/.env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`StudyFlow API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start StudyFlow:", error);
    process.exit(1);
  }
}

startServer();
