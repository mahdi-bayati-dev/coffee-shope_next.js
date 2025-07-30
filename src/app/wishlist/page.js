// app/wishlist/
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Card from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import styles from "@/styles/wishlist.module.css";
import { authUser } from "@/app/lib/authUser";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/model/Wishlist";
import "@/model/Product";

const page = async () => {
  let wishes = [];
  await connectToDB();
  const user = await authUser();
  if (user) {
    wishes = await WishlistModel.find({ user: user.id })
      .populate("product", "name price score img")
      .sort({ _id: -1 })
      .lean();
  }

  return (
    <>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) =>
              wish.product ? <Card key={wish._id} {...wish.product} /> : null
            )}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه فروشگاه محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
