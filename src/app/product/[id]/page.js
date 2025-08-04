// app/product/[id]/page.js
import connectToDB from "@/configs/db";
import ProductModel from "@/model/Product";
import { authUser } from "@/app/lib/authUser";
import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import CommentsModel from "@/model/Comments";
import mongoose from "mongoose";
import WishlistModel from "@/model/Wishlist";

export default async function ProductPage({ params }) {
  await connectToDB();
  let wishes = [];
  const user = await authUser();
  const userId = user?.id?.toString() || null;

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div>شناسه محصول معتبر نیست</div>;
  }

  const product = await ProductModel.findOne({ _id: id })
    .populate({
      path: "comments",
      populate: { path: "user", select: "name" }, // 👈 populate داخل کامنت
    })
    .lean();

  if (!product) {
    return <div>محصول پیدا نشد</div>;
  }

  // تبدیل کامل همه چیز به string/plain
  product._id = product._id.toString();

  product.comments = product.comments.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
    productId: comment.productId?.toString(),
    user: comment.user
      ? {
          _id: comment.user._id.toString(),
          name: comment.user.name,
        }
      : null,
    date: comment.date?.toISOString() || null,
  }));

  const relatedProduct = await ProductModel.find({
    smell: product.smell,
    _id: { $ne: new mongoose.Types.ObjectId(product._id.toString()) },
  }).lean();

  // 👇 تبدیل کامل به JSON-safe plain object
  const cleanRelatedProduct = relatedProduct.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  if (user) {
    try {
      wishes = await WishlistModel.find({ user: user.id })
        .populate("product", "name price score img")
        .sort({ _id: -1 })
        .lean();
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  return (
    <div className={styles.container}>
      {/* <Navbar isLogin={!!user} wishlist={wishes.length} /> */}

      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />

          <Gallery productImg={product.img} />
        </div>
        <Tabs product={product} userId={userId} />
        <MoreProducts relatedProduct={cleanRelatedProduct} />
      </div>
      <Footer />
    </div>
  );
}
