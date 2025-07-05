import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
  score: { type: Number, required: true },
  isAccess: { type: Boolean, default: false },
  date: { type: Date, default: () => new Date() },
  ProductId: { type: mongoose.Types.ObjectId, ref: "Products" }, // توجه: نام مدل محصولات
});

const Comments = mongoose.models.Comments || mongoose.model("Comments", schema);
export default Comments;
