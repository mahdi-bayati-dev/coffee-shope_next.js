"use client";
import { useEffect, useState } from "react";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Image from "next/image";

const Topbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState();

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const getMe = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.data.user);
    };

    getMe();
  }, []);

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div className={styles.name}>
            <p>{user?.name}</p>
            <span>{user?.role === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <Image
            width={50}
            height={50}
            src={user?.avatar || "/images/avatar.png"}
            alt={`پروفایل ${user?.name || "کاربر"}`}
            className={styles.profile_img}
          />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification} onClick={toggleNotifications}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
      {isNotificationsOpen && (
        <>
          <div
            className={styles.notifications_overlay}
            onClick={toggleNotifications}
          ></div>
          <div className={styles.notifications_box}>
            <div>
              <p>اعلان جدید: سفارش جدید ثبت شد</p>
              <button>مشاهده</button>
            </div>
            <div>
              <p>اعلان: تیکت جدید دریافت شد</p>
              <button>مشاهده</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Topbar;
