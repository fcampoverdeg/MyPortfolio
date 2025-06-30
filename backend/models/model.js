import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Model = mongoose.model("Model", modelSchema);
export default Model;
