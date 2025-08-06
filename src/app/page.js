// app/page.js
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import { getHomePageData } from "@/app/services/homeService";

export default async function Home() {
  const { user, latestProducts, wishlist } = await getHomePageData();

  return (
    <>
      <Navbar isLogin={!!user} wishlist={wishlist.length} />
      <div className="navbarSpacerMobile"></div>
      <Banner />
      <Latest products={latestProducts} /> 
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
