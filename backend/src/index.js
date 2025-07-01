import express from "express";
import authRoutes from "../routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "../routes/messageRoutes.js";
import cors from "cors";
import { app, server } from "../lib/socket.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Increase the limit for JSON payloads to 10MB to handle image uploads
app.use(express.json({ limit: "10mb" }));
// Increase the limit for URL-encoded payloads as well
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || "https://your-app-name.onrender.com"
        : "http://localhost:5173",
    credentials: true, //allow cookies
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // Get the project root directory (two levels up from backend/src)
  const projectRoot = path.resolve(__dirname, "../../..");
  const frontendDistPath = path.join(projectRoot, "frontend", "dist");

  console.log("Serving static files from:", frontendDistPath);

  // Serve static files from the React frontend app
  app.use(express.static(frontendDistPath));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    const indexPath = path.join(frontendDistPath, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
}

server.listen(PORT, () => {
  console.log("Server started on port:" + PORT);
  connectDB();
});
