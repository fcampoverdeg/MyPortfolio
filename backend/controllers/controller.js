// backend/controllers/contactController.js

import Model from "../models/model.js"; // Model now refers to ContactMessage

// ============== POST /api/contact ==============
// Create new contact message
export const postMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const newMessage = new Model({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error saving contact message:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== GET /api/contact ==============
// Retrieve all contact messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Model.find();
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== DELETE /api/contact/:id ==============
// Delete a contact message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }
    res.json({ success: true, data: deleted });
  } catch (error) {
    console.error("Error deleting message:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== PUT /api/contact/:id ==============
// Update a contact message
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const updated = await Model.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating message:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
