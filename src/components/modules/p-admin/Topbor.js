import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Image from "next/image";
const Topbar = () => {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>شاهین مشکل گشا</p>
            <span>ادمین</span>
          </div>
          <Image
            width={50}
            height={50}
           src="/images/shahin.jpg" alt="" />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topbar;
