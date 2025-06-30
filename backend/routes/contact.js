// backend/routes/contact.js

/**
This file handles CRUD operations for contact messages.
*/

import express from "express";
import {
  getMessages,
  postMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/", postMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

export default router;
