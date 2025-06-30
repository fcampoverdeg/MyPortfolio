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
import nodemailer from "nodemailer";

const router = express.Router();

// API calls
router.post("/", postMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

// Email Message to myself
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ===== SEND EMAIL =====
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "hotmail", "yahoo", or a custom SMTP
      auth: {
        user: process.env.EMAIL_USER, // e.g., "youraddress@gmail.com"
        pass: process.env.EMAIL_PASS, // Gmail app password or real password (not recommended directly)
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL, // Your own email
      subject: "New Message from Portfolio",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent and email delivered." });
  } catch (error) {
    console.error("Error saving contact or sending email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
