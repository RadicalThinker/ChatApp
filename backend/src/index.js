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
import { existsSync, readdirSync } from "fs";

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
  console.log("🚀 Setting up production static file serving...");

  // Try multiple possible paths for the frontend build
  const possiblePaths = [
    path.resolve(process.cwd(), "frontend", "dist"),
    path.resolve(__dirname, "../../frontend/dist"),
    path.resolve(__dirname, "../../../frontend/dist"),
  ];

  let frontendDistPath = null;

  for (const testPath of possiblePaths) {
    const indexPath = path.join(testPath, "index.html");
    console.log(`Checking for frontend build at: ${testPath}`);

    if (existsSync(indexPath)) {
      frontendDistPath = testPath;
      console.log(`✅ Found frontend build at: ${frontendDistPath}`);
      break;
    }
  }

  if (!frontendDistPath) {
    console.error("❌ Frontend build not found in any of these locations:");
    possiblePaths.forEach((p) => console.error(`  - ${p}`));
    console.error("Current working directory:", process.cwd());
    console.error("__dirname:", __dirname);

    // List contents of current directory for debugging
    try {
      console.error("Contents of current working directory:");
      const files = readdirSync(process.cwd());
      files.forEach((file) => {
        const fullPath = path.join(process.cwd(), file);
        const isDir = existsSync(fullPath) && readdirSync(fullPath).length > 0;
        console.error(`  ${isDir ? "📁" : "📄"} ${file}`);
      });
    } catch (e) {
      console.error("Error reading directory contents:", e.message);
    }

    // Don't exit - let the server start but show an error page
    app.get("*", (req, res) => {
      res.status(500).send(`
        <h1>Frontend Build Not Found</h1>
        <p>The frontend build files are missing. Please check the build process.</p>
        <h2>Debugging Information:</h2>
        <ul>
          <li>Current working directory: ${process.cwd()}</li>
          <li>Backend directory: ${__dirname}</li>
          <li>Searched paths: ${possiblePaths.join(", ")}</li>
        </ul>
      `);
    });
  } else {
    // Serve static files from the React frontend app
    app.use(express.static(frontendDistPath));

    // Handle React routing, return all requests to React app
    app.get("*", (req, res) => {
      const indexPath = path.join(frontendDistPath, "index.html");
      res.sendFile(indexPath);
    });
  }
}

server.listen(PORT, () => {
  console.log("Server started on port:" + PORT);
  connectDB();
});
