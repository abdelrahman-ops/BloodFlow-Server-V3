import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';
import connectDB from './config/db.js';




// Establish database connection
connectDB();

// Create express app instance
const app = express();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Middleware setup
app.use(
    cors({ 
        origin: [
            "http://localhost:5173" , 
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

// Basic routes
app.get("/", (req, res) => {
    res.send("Welcome to the Blood Donation Management System API!");
});
app.get("/health", (req, res) => res.send("OK"));

// API routes
app.use('/api', routes);





// Handle errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;