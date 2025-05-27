import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Model from "./models/model.js";

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/api/Home", async (req, res) => {
  const data = req.body; // user's sent data

  if (!data.name || !data.price) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields." });
  }

  const newModel = new Model(data);

  try {
    await newModel.save();
    res.status(201).json({ success: true, data: newModel });
  } catch (error) {
    console.error("Error in create data:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
