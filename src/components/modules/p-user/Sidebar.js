"use client";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers, FaUserCircle } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <>
      <button className={styles.menuToggle} onClick={toggleSidebar} title="باز/بسته کردن منو">
        {isOpen ? <CgClose /> : <FaBars />}
      </button>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebar_header}>
          <FaUserCircle size={30} style={{ marginBottom: "10px" }} />
          <p>خوش اومدی شاهین عزیز</p>
        </div>
        <ul className={styles.sidebar_main}>
          {path.includes("/p-user") ? (
            <>
              <Link href="/p-user" className={path === "/p-user" ? styles.sidebar_link_active : ""} title="پیشخوان">
                <ImReply />
                پیشخوان
              </Link>
              <Link href="/p-user/orders" className={path === "/p-user/orders" ? styles.sidebar_link_active : ""} title="سفارش‌ها">
                <FaShoppingBag />
                سفارش‌ها
              </Link>
              <Link href="/p-user/tickets" className={path === "/p-user/tickets" ? styles.sidebar_link_active : ""} title="تیکت‌های پشتیبانی">
                <MdSms />
                تیکت‌های پشتیبانی
              </Link>
              <Link href="/p-user/comments" className={path === "/p-user/comments" ? styles.sidebar_link_active : ""} title="کامنت‌ها">
                <FaComments />
                کامنت‌ها
              </Link>
              <Link href="/p-user/wishlist" className={path === "/p-user/wishlist" ? styles.sidebar_link_active : ""} title="علاقه‌مندی‌ها">
                <FaHeart />
                علاقه‌مندی
              </Link>
              <Link href="/p-user/account-details" className={path === "/p-user/account-details" ? styles.sidebar_link_active : ""} title="جزئیات اکانت">
                <TbListDetails />
                جزئیات اکانت
              </Link>
            </>
          ) : (
            <>
              <Link href="/p-admin" className={path === "/p-admin" ? styles.sidebar_link_active : ""} title="پیشخوان">
                <ImReply />
                پیشخوان
              </Link>
              <Link href="/p-admin/products" className={path === "/p-admin/products" ? styles.sidebar_link_active : ""} title="محصولات">
                <FaShoppingBag />
                محصولات
              </Link>
              <Link href="/p-admin/users" className={path === "/p-admin/users" ? styles.sidebar_link_active : ""} title="کاربران">
                <FaUsers />
                کاربران
              </Link>
              <Link href="/p-admin/comments" className={path === "/p-admin/comments" ? styles.sidebar_link_active : ""} title="کامنت‌ها">
                <FaComments />
                کامنت‌ها
              </Link>
              <Link href="/p-admin/tickets" className={path === "/p-admin/tickets" ? styles.sidebar_link_active : ""} title="تیکت‌ها">
                <MdSms />
                تیکت‌ها
              </Link>
              <Link href="/p-admin/discount" className={path === "/p-admin/discount" ? styles.sidebar_link_active : ""} title="تخفیفات">
                <MdOutlineAttachMoney />
                تخفیفات
              </Link>
            </>
          )}
        </ul>
        <div className={styles.logout} onClick={logoutHandler} title="خروج از حساب">
          <MdLogout />
          خروج
        </div>
      </aside>
    </>
  );
};

export default Sidebar;