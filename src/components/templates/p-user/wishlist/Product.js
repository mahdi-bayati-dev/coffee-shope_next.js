"use client";

import styles from "./product.module.css";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import swal from "sweetalert";

const Card = ({ price, score = 0, name, productId }) => {
  const removeProduct = (productId) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (confirmed) => {
      if (!confirmed) return;

      try {
        const res = await fetch(`/api/wishlist/${productId}`, {
          method: "DELETE",
        });

        // 1️⃣ بررسی وضعیت HTTP
        if (!res.ok) {
          const errorData = await res.json();
          const message =
            errorData?.message ||
            errorData?.error ||
            "خطای ناشناخته‌ای رخ داده است";
          swal(`خطا: ${message}`, { icon: "error" });
          return;
        }

        // 2️⃣ بررسی موفقیت حذف در بدنه JSON
        const data = await res.json();

        if (data?.success) {
          swal("محصول با موفقیت حذف شد", {
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            window.location.reload();
          });
        } else {
          swal(data?.message || "خطا در حذف محصول", {
            icon: "error",
          });
        }
      } catch (err) {
        // 3️⃣ مدیریت خطای شبکه یا برنامه
        console.error("Error removing product:", err);
        swal("خطا در ارتباط با سرور. لطفاً بعداً تلاش کنید.", {
          icon: "error",
        });
      }
    });
  };

  const filledStars = Math.max(0, Math.min(score, 5));
  const emptyStars = 5 - filledStars;

  return (
    <div className={styles.card}>
      <Link href={`/product/${productId}`}>
        <img
          width={283}
          height={283}
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt={name}
        />
      </Link>

      <p dir="rtl">{name}</p>

      <div>
        <div>
          {[...Array(filledStars)].map((_, i) => (
            <IoMdStar key={i} />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={i + 5} />
          ))}
        </div>
        <span>{price ? price.toLocaleString() : "نامشخص"} تومان</span>
      </div>

      <button
        onClick={() => removeProduct(productId)}
        className={styles.delete_btn}
      >
        حذف محصول
      </button>
    </div>
  );
};

export default Card;
