"use client";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import swal from "sweetalert";
import styles from "./AddToWishlist.module.css";

export default function AddToWishlist({ productId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            "Content-Type": "application/json",
            // اگر توکن لازم است: "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data?.user || null);
        } else {
          // اگر درخواست موفق نبود، فقط در کنسول لاگ کنید
          console.warn("Failed to fetch user data:", res.status);
          setUser(null);
        }
      } catch (err) {
        // خطا را فقط در کنسول لاگ کنید، بدون نمایش به کاربر
        console.warn("Error fetching user:", err.message);
        setUser(null);
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