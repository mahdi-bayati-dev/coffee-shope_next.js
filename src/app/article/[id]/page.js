import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Comment from "@/components/templates/article/comment/Comment";
import Details from "@/components/templates/article/details/Details";
import styles from "@/styles/article.module.css";
import { authUser } from "@/app/lib/authUser";
import WishlistModel from "@/model/Wishlist";

const page = async () => {
  let user = null;
  let wishes = [];

  try {
    user = await authUser();
    if (user) {
      wishes = await WishlistModel.find({ user: user.id })
        .populate("product", "name price score img")
        .sort({ _id: -1 })
        .lean();
    }
  } catch (error) {
    console.error("Error fetching user or wishlist:", error);
  }

  return (
    <>
      <Navbar isLogin={!!user} wishlist={wishes.length} />

      <Breadcrumb route={"قهوه"} />
      <div className={styles.container}>
        <Details />
        <Comment />
      </div>

      <Footer />
    </>
  );
};

export default page;
