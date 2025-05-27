// This file contains the controller functions for handling API requests
// backend/controllers/controller.js

import mongoose from "mongoose";
import Model from "../models/model.js";

// ============== POST / API ==============
// Data is Sent to MongoDB
export const postData = async (req, res) => {
  const data = req.body;

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
};

// ============== GET / API ==============
// Data is Retrieved from MongoDB
export const getData = async (req, res) => {
  try {
    const models = await Model.find();
    res.json({ success: true, data: models });
  } catch (error) {
    console.error("Error in fetching data:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== DELETE / API ==============
// Data is Deleted from MongoDB
export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedModel = await Model.findByIdAndDelete(id);
    if (!deletedModel) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found." });
    }
    res.json({ success: true, data: deletedModel });
  } catch (error) {
    console.error("Error in delete data:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== PUT / API ==============
// Updated All Data in MongoDB
export const putData = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data.name || !data.price) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields." });
  }

  try {
    const updatedModel = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedModel) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found." });
    }

    res.json({ success: true, data: updatedModel });
  } catch (error) {
    console.error("Error in update data:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
