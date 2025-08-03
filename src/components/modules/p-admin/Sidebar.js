
"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // مدیریت حالت باز/بسته سایدبار
  const path = usePathname();
  const router = useRouter();

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then(async (willLogout) => {
      if (willLogout) {
        try {
          const res = await fetch("/api/auth/signout", { method: "POST" });
          if (res.ok) {
            swal("با موفقیت خارج شدید", "", "success");
            router.replace("/");
          } else {
            swal("خطا در خروج", "متأسفانه مشکلی در خروج پیش آمد.", "error");
          }
        } catch (error) {
          swal("خطای شبکه", "اتصال به سرور برقرار نشد.", "error");
        }
      }
    });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* دکمه همبرگری برای موبایل */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* سایدبار */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebar_open : ""}`}>
        <div className={styles.sidebar_header}>
          <p>خوش اومدی شاهین عزیز</p>
          {/* دکمه بستن در موبایل */}
          <button className={styles.close_btn} onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className={styles.sidebar_main}>
          {path.includes("/p-user") ? (
            <>
              <li>
                <Link
                  href={"/p-user"}
                  className={`${styles.sidebar_link} ${path === "/p-user" ? styles.sidebar_link_active : ""}`}
                >
                  <ImReply />
                  پیشخوان
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-user/orders"}
                  className={`${styles.sidebar_link} ${path === "/p-user/orders" ? styles.sidebar_link_active : ""}`}
                >
                  <FaShoppingBag />
                  سفارش‌ها
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-user/tickets"}
                  className={`${styles.sidebar_link} ${path === "/p-user/tickets" ? styles.sidebar_link_active : ""}`}
                >
                  <MdSms />
                  تیکت‌های پشتیبانی
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-user/comments"}
                  className={`${styles.sidebar_link} ${path === "/p-user/comments" ? styles.sidebar_link_active : ""}`}
                >
                  <FaComments />
                  کامنت‌ها
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-user/wishlist"}
                  className={`${styles.sidebar_link} ${path === "/p-user/wishlist" ? styles.sidebar_link_active : ""}`}
                >
                  <FaHeart />
                  علاقه‌مندی
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-user/account-details"}
                  className={`${styles.sidebar_link} ${path === "/p-user/account-details" ? styles.sidebar_link_active : ""}`}
                >
                  <TbListDetails />
                  جزئیات اکانت
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={"/p-admin"}
                  className={`${styles.sidebar_link} ${path === "/p-admin" ? styles.sidebar_link_active : ""}`}
                >
                  <ImReply />
                  پیشخوان
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-admin/products"}
                  className={`${styles.sidebar_link} ${path === "/p-admin/products" ? styles.sidebar_link_active : ""}`}
                >
                  <FaShoppingBag />
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-admin/users"}
                  className={`${styles.sidebar_link} ${path === "/p-admin/users" ? styles.sidebar_link_active : ""}`}
                >
                  <FaUsers />
                  کاربران
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-admin/comments"}
                  className={`${styles.sidebar_link} ${path === "/p-admin/comments" ? styles.sidebar_link_active : ""}`}
                >
                  <FaComments />
                  کامنت‌ها
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-admin/tickets"}
                  className={`${styles.sidebar_link} ${path === "/p-admin/tickets" ? styles.sidebar_link_active : ""}`}
                >
                  <MdSms />
                  تیکت‌ها
                </Link>
              </li>
              <li>
                <Link
                  href={"/p-admin/discount"}
                  className={`${styles.sidebar_link} ${path === "/p-admin/discount" ? styles.sidebar_link_active : ""}`}
                >
                  <MdOutlineAttachMoney />
                  تخفیفات
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.logout} onClick={logoutHandler}>
          <MdLogout />
          خروج
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
