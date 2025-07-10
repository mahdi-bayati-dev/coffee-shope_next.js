import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
  },
  { timeStamps: true }
);

const model = mongoose.models.Ban || mongoose.model("Ban", schema);

export default model;
