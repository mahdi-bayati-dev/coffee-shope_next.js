// app/product/[id]/page.js
import connectToDB from "@/configs/db";
import {
  getProductWithComments,
  getRelatedProducts,
} from "@/app/services/productService";
import { getUserWishlist } from "@/app/services/wishlistService";
import { authUser } from "@/app/lib/authUser";
import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import mongoose from "mongoose";

export default async function ProductPage({ params }) {
  
  const id =await  params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div>شناسه محصول معتبر نیست</div>;
  }

  await connectToDB();
  const user = await authUser();
  const userId = user?.id?.toString() || null;

  const product = await getProductWithComments(id);
  if (!product) {
    return <div>محصول پیدا نشد</div>;
  }

  const relatedProducts = await getRelatedProducts(product);
  const wishlist = user ? await getUserWishlist(user.id) : [];

  return (
    <div className={styles.container}>
      <Navbar isLogin={!!user} wishlist={wishlist.length} />

      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />
          <Gallery productImg={product.img} />
        </div>
        <Tabs product={product} userId={userId} />
        <MoreProducts relatedProduct={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
}
