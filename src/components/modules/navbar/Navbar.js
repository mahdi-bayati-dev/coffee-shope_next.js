"use client";

import React, { useEffect, useState } from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ClientBasketBadge from "@/utils/ClientBasketBadge";
import Image from "next/image";

function Navbar({ isLogin, wishlist }) {
  const [fixTop, setFixTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setFixTop(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        {/* لوگو و آیکون منو */}
        <div className={styles.logo_section}>
          <Link href="/" className={styles.logo}>
            <Image width={150} height={50} src="/images/logo.png" alt="Logo" />
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <FaBarsStaggered />}
          </button>
        </div>

        {/* منو */}
        <ul className={`${styles.links} ${menuOpen ? styles.show_menu : ""}`}>
          <li><Link href="/">صفحه اصلی</Link></li>
          <li><Link href="/category">فروشگاه</Link></li>
          <li><Link href="/articles">وبلاگ</Link></li>
          <li><Link href="/contact-us">تماس با ما</Link></li>
          <li><Link href="/about-us">درباره ما</Link></li>
          <li><Link href="/rules">قوانین</Link></li>
          {!isLogin ? (
            <li><Link href="/login-register">ورود / عضویت</Link></li>
          ) : (
            <div className={styles.dropdown}>
              <Link href="/p-user">
                <IoIosArrowDown className={styles.dropdown_icons} />
                حساب کاربری
              </Link>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/p-user/tickets">تیکت‌ها</Link>
                <Link href="/p-user/comments">کامنت‌ها</Link>
                <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                <Link href="/p-user/account-details">جزئیات اکانت</Link>
              </div>
            </div>
          )}
        </ul>

        {/* آیکون‌ها */}
        <div className={styles.navbar_icons}>
          <ClientBasketBadge>
            {(basket) => (
              <Link href="/cart">
                <FaShoppingCart />
                {basket > 0 && <span>{basket}</span>}
              </Link>
            )}
          </ClientBasketBadge>

          <Link href="/wishlist">
            <FaRegHeart />
            {wishlist > 0 && <span>{wishlist}</span>}
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
