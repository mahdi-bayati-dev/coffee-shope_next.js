import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
  score: { type: Number, required: true },
  isAccess: { type: Boolean, default: false },
  date: { type: Date, default: () => new Date() },
  productId: { type: mongoose.Types.ObjectId, ref: "Product" , required:true},
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Comments = mongoose.models.Comments || mongoose.model("Comments", schema);
export default Comments;
