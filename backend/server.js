// This file is the main server file that sets up the Express application and connection to MongoDB
// backend/server.js

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productionRoutes from "./routes/data.js";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/Home", productionRoutes); // Use the production routes for API requests

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
