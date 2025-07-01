import express from "express";
import authRoutes from "../routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "../routes/messageRoutes.js";
import cors from "cors";
import { app, server } from "../lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// Increase the limit for JSON payloads to 10MB to handle image uploads
app.use(express.json({ limit: "10mb" }));
// Increase the limit for URL-encoded payloads as well
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow cookies
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log("Server started on port:" + PORT);
  connectDB();
});
