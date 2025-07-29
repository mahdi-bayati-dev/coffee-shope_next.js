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

export default async function ProductPage({ params }) {
  await connectToDB();

  const user = await authUser();
  const userId = user?.id?.toString() || null;

  const { id } = params;

  // اگر شناسه معتبر نباشه (مثلاً favicon.ico باشه)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div>شناسه محصول معتبر نیست</div>;
  }

  const product = await ProductModel.findOne({ _id: id })
    .populate("comments")
    .lean();
    product._id = product._id.toString();

  if (!product) {
    return <div>محصول پیدا نشد</div>;
  }

  const relatedProduct = await ProductModel.find({
    smell: product.smell,
    _id: { $ne: product._id },
  }).lean();

  return (
    <div className={styles.container}>
      <Navbar isLogin={!!user} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />
          <Gallery productImg={product.img}/>
        </div>
        <Tabs product={product} userId={userId} />
        <MoreProducts relatedProduct={relatedProduct} />
      </div>
      <Footer />
    </div>
  );
}
