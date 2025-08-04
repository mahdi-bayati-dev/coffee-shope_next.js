export const dynamic = "force-dynamic";

import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import { authUser } from "@/app/lib/authUser";
import Link from "next/link";
import Map from "@/components/templates/contact-us/Map";
import WishlistModel from "@/model/Wishlist";

const page = async () => {
  // const user = await authUser();
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
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <main className={styles.maps}>
          <section>
            <Map
              position={[35.72021225108499, 51.42222691580869]}
              center={[35.72021225108499, 51.42222691580869]}
            >
              <span>فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[35.70153474690238, 51.41497422314844]}
              center={[35.70153474690238, 51.41497422314844]}
            >
              <span>فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه دوم)</h3>
              <p>تهران – خ ولیعصر – خ زرتشت – شماره ۲۰</p>
              <p>021-88891234</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
        </main>
      </div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
