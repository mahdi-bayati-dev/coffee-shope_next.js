import styles from "./answer.module.css";
import Image from "next/image";

const Answer = ({ type, body, title, createdAt, user }) => {

  return (
    <section
      className={type === "user" ? styles.userTicket : styles.adminTicket}
      aria-label={type === "user" ? "تیکت کاربر" : "تیکت مدیر"}
    >
      <div className={styles.ticket_main}>
        <div className={styles.title}>
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
          <p>{title}</p>
        </div>

        <div>
          <div>
            <p>{user.name}</p>
            <span>{type === "user" ? "کاربر" : "مدیر"}</span>
          </div>
          <Image
            width={50}
            height={50}
            src="/images/shahin.jpg"
            alt={`تصویر پروفایل ${user.name}`}
            className={styles.profile_image}
          />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Answer;
