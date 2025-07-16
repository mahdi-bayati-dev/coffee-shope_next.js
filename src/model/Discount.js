import mongoose from "mongoose";

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  maxUse: {
    type: Number,
    required: false,
  },
  uses: {
    type: Number,
    required: true,
    default: 0
  },

});

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

export default model;
