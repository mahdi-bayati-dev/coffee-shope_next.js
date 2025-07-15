// app/product/[id]/page.js
import connectToDB from "@/configs/db";
import ProductModel from "../../../model/Products";
import CommentsModel from "../../../model/Comments";
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
  const userId = user.id?.toString();
  const { id } = await params;

  const productId = id;
  const product = await ProductModel.findOne({ _id: productId })
    .populate("Comments")
    .lean();

  const relatedProduct = await ProductModel.find({
    smell: product.smell,
  }).lean();

  return (
    <div className={styles.container}>
      <Navbar isLogin={!!user} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} userId={userId} />{" "}
        <MoreProducts
          relatedProduct={JSON.parse(JSON.stringify(relatedProduct))}
        />
      </div>
      <Footer />
    </div>
  );
}
