// backend/router/data.js

/**
This file checks for the API routes related to data management.
It handles CRUD operations for the data stored in MongoDB.
*/

import express from "express";

import {
  getData,
  postData,
  deleteData,
  putData,
} from "../controllers/controller.js";

const router = express.Router(); // Create a new router instance

// ============== POST / API ============== //
// Data is Sent to MongoDB
router.post("/", postData);

// ============== GET / API ============== //
// Data is Retrieved from MongoDB
router.get("/", getData);

// ============== DELETE / API ============== //
// Data is Deleted from MongoDB
router.delete("/:id", deleteData);

// ============== PUT / API ============== //
// Updated All Data in MongoDB
router.put("/:id", putData);

export default router; // Export the router to be used in the main server file
