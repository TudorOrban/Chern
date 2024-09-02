import express from "express";
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/chern";

console.log("Attempting to connect to MongoDB...");

mongoose.connect(mongoUri, {})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB: ", err);
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});