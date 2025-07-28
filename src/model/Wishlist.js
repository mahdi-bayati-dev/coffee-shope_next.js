import mongoose from "mongoose";
import Product from '@/model/Product'

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",

      required: true,
    },
  },
  { timestamps: true }
);

// جلوگیری از افزودن محصول تکراری برای یک کاربر
schema.index({ user: 1, product: 1 }, { unique: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", schema);
export default Wishlist;
