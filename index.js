import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

const app = express();

// CORS and Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://blood-flow.vercel.app",
      "https://bfserver.vercel.app",
      "https://blood-flow-server-v2.vercel.app",
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Blood Donation Management System API!");
});
app.get("/health", (req, res) => res.send("OK"));

app.use("/api", routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Required by Vercel
export default app;