import express from "express";
import mongoose from "mongoose";
import "reflect-metadata";
import container from "./config/inversify.config";
import { UserController } from "./controllers/user.controller";
import TYPES from "./config/types";

// MongoDB connection
const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/chern";

mongoose.connect(mongoUri, {})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB: ", err);
});

// Express app
const app = express();

app.use(express.json());

// Controllers
const userController = container.get<UserController>(TYPES.UserController);

app.get("/users/:id", userController.getUserById);


// Start the server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});