import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Pagination from "@/components/modules/pagination/Pagination";
import Card from "@/components/templates/articles/card/Card";
import styles from "@/styles/articles.module.css";
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
            <Breadcrumb route={"اخبار و مقالات"} />
            <main className={styles.container}>
                <div className={styles.articles}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Pagination />
            </main>
            <Footer />
        </>
    );
};

export default page;