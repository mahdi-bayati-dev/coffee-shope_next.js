'use client';
import { useState , useEffect} from "react";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Modal from "./Modal";
import Image from "next/image";

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);
  const [user, setUser] = useState(null); // ✅ اضافه کن



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
            src="/images/shahin.jpg"
            alt="پروفایل"
          />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div
            onClick={() => setShowNotifications(true)}
            className={styles.notification}
          >
            <IoIosNotifications />
            <span>0</span>
          </div>
        </section>
      </div>
      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            {/* if we dont have any notif we show : */}
            {/* <div>
              <span>پیفامی وجود ندارد</span>
              <IoClose onClick={() => setShowNotifications(false)}/>
            </div> */}
          </section>
        </div>
      )}
      {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className={styles.modal_text}>عالی هستی ادمین عزیز</p>
        </Modal>
      )}
    </>
  );
};

export default TopBar;