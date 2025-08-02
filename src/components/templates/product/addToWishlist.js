"use client";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import swal from "sweetalert";
import styles from "./AddToWishlist.module.css"; // وارد کردن CSS ماژولار

export default function AddToWishlist({ productId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }
        const data = await res.json();
        setUser(data.data?.user || null);
      } catch (err) {
        console.error(err.message);
      }
    };
    authUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();

    if (!user?._id) {
      return swal({
        title: "لاگین کنید",
        icon: "warning",
        buttons: "فهمیدم",
      });
    }

    const wishlist = {
      user: user._id,
      product: productId._id,
    };

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlist),
      });

      const result = await res.json();
      if (res.ok) {
        swal("با موفقیت", "به علاقه‌مندی‌ها اضافه شد", "success");
      } else {
        throw new Error(result.message || "خطا در افزودن");
      }
    } catch (error) {
      swal("خطا", error.message, "error");
    }
  };

  return (
    <button onClick={addToWishlist} className={styles.wishlistButton}>
      <CiHeart className={styles.heartIcon} />
      افزودن به علاقه‌مندی‌ها
    </button>
  );
}