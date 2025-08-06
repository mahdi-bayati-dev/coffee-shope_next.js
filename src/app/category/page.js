"use client"; // اضافه کردن "use client" برای مدیریت state در کلاینت
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Filtering from "@/components/templates/category/filtering/Filtering";
import Products from "@/components/templates/category/products/Products";
import styles from "@/styles/category.module.css";
import { FaFilter } from "react-icons/fa";

const Page = () => {
  // داده‌های نمونه (در عمل از سرور دریافت می‌شوند)
  const sampleFilters = [
    { id: 1, name: "اسپرسو ساز خانگی (ریز)", count: 20 },
    { id: 2, name: "اسپرسو ساز حرفه‌ای", count: 15 },
    { id: 3, name: "کپسول قهوه", count: 10 },
  ];
  const sampleBestProducts = [
    { id: 1, name: "محصول برتر 1", price: 1000000, score: 4.5 },
    { id: 2, name: "محصول برتر 2", price: 2000000, score: 4.0 },
    { id: 3, name: "محصول برتر 3", price: 1500000, score: 4.8 },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [user, setUser] = useState(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const toggleFilterMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist");
        const data = await res.json();
        setWishes(data.wishes || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const data = await res.json();
        setUser(data.data?.user); // یا optional chaining برای اطمینان

        
      } catch (err) {
        console.error("خطا در دریافت کاربر", err);
      } finally {
        setLoadingUser(false); // ✅ بعد از گرفتن یا نخوردن به خطا
      }
    };

    fetchUser();
  }, []);


 useEffect(() => {
  if (user !== null) {
    console.log("🔄 مقدار user به‌روز شد:", user);
  }
}, [user]);


  return (
    <>
      <Navbar isLogin={!!user} wishlist={wishes.length} />

      <Breadcrumb route={"فروشگاه"} />
      <main className={styles.container} data-aos="fade-up">
        <button
          className={styles.filter_toggle}
          onClick={toggleFilterMenu}
          aria-label={isMenuOpen ? "بستن منوی فیلتر" : "باز کردن منوی فیلتر"}
        >
          <FaFilter />
          <span>فیلترها</span>
        </button>
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleFilterMenu}
        ></div>
        <div className={styles.category}>
          <Products />
          <Filtering
            isMenuOpen={isMenuOpen}
            toggleFilterMenu={toggleFilterMenu}
            filters={sampleFilters}
            bestProducts={sampleBestProducts}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
