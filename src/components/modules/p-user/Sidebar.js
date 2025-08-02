"use client";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // آیکون همبرگر
import { CgClose } from "react-icons/cg";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // حالت باز/بسته سایدبار

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
      <button className={styles.menuToggle} onClick={toggleSidebar}>
        {isOpen ? <CgClose /> : <FaBars />}
      </button>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebar_header}>
          <p>خوش اومدی شاهین عزیز</p>
        </div>
        <ul className={styles.sidebar_main}>
          {path.includes("/p-user") ? (
            <>
              <Link
                href={"/p-user"}
                className={path === "/p-user" ? styles.sidebar_link_active : ""}
              >
                <ImReply />
                پیشخوان
              </Link>
              <Link
                href={"/p-user/orders"}
                className={
                  path === "/p-user/orders" ? styles.sidebar_link_active : ""
                }
              >
                <FaShoppingBag />
                سفارش‌ها
              </Link>
              <Link
                href={"/p-user/tickets"}
                className={
                  path === "/p-user/tickets" ? styles.sidebar_link_active : ""
                }
              >
                <MdSms />
                تیکت‌های پشتیبانی
              </Link>
              <Link
                href={"/p-user/comments"}
                className={
                  path === "/p-user/comments" ? styles.sidebar_link_active : ""
                }
              >
                <FaComments />
                کامنت‌ها
              </Link>
              <Link
                href={"/p-user/wishlist"}
                className={
                  path === "/p-user/wishlist" ? styles.sidebar_link_active : ""
                }
              >
                <FaHeart />
                علاقه‌مندی
              </Link>
              <Link
                href={"/p-user/account-details"}
                className={
                  path === "/p-user/account-details"
                    ? styles.sidebar_link_active
                    : ""
                }
              >
                <TbListDetails />
                جزئیات اکانت
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/p-admin"}
                className={
                  path === "/p-admin" ? styles.sidebar_link_active : ""
                }
              >
                <ImReply />
                پیشخوان
              </Link>
              <Link
                href={"/p-admin/products"}
                className={
                  path === "/p-admin/products" ? styles.sidebar_link_active : ""
                }
              >
                <FaShoppingBag />
                محصولات
              </Link>
              <Link
                href={"/p-admin/users"}
                className={
                  path === "/p-admin/users" ? styles.sidebar_link_active : ""
                }
              >
                <FaUsers />
                کاربران
              </Link>
              <Link
                href={"/p-admin/comments"}
                className={
                  path === "/p-admin/comments" ? styles.sidebar_link_active : ""
                }
              >
                <FaComments />
                کامنت‌ها
              </Link>
              <Link
                href={"/p-admin/tickets"}
                className={
                  path === "/p-admin/tickets" ? styles.sidebar_link_active : ""
                }
              >
                <MdSms />
                تیکت‌ها
              </Link>
              <Link
                href={"/p-admin/discount"}
                className={
                  path === "/p-admin/discount" ? styles.sidebar_link_active : ""
                }
              >
                <MdOutlineAttachMoney />
                تخفیفات
              </Link>
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
