import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { registerRoutes } from "./routes/all.routes";
import cors from "cors";

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/chern";

mongoose.connect(mongoUri, {})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB: ", err);
});

// Create Express app
const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
console.log("CORS enabled");

app.use(express.json());

// Register routes
const router = express.Router();

registerRoutes(router);

app.use("/api/v1", router);

// Set up error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start the server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});