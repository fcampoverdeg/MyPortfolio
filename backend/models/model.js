import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    // TODO: Change model depending on needs
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Model = mongoose.model("Model", modelSchema);
export default Model;
