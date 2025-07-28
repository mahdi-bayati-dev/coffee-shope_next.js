// app/product/[id]/page.js
import connectToDB from "@/configs/db";
import ProductModel from "@/model/Product";
import CommentsModel from "@/model/Comments";
import { authUser } from "@/app/lib/authUser";

import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";

export default async function ProductPage({ params }) {
  await connectToDB();

  const user = await authUser();
  const userId = user?.id?.toString() || null;
  const { id } = params;

  const product = await ProductModel.findOne({ _id: id })
    .populate("comments")

    .lean();

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
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} userId={userId} />
        <MoreProducts
          relatedProduct={JSON.parse(JSON.stringify(relatedProduct))}
        />
      </div>
      <Footer />
    </div>
  );
}
