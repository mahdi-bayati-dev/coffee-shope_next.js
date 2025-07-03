import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  shortDiscretion: { type: String, required: true },
  longDiscretion: { type: String, required: true },
  weight: { type: Number, required: true },
  SuitableFor: { type: String, required: true },
  smell: { type: String, required: true },
  score: { type: Number,  default: 5 },
  tag: { type: [String] },
  Comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
});

const Products = mongoose.models.Products || mongoose.model("Products", schema);
export default Products;
