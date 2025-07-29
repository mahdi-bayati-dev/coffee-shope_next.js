import { ImOpera } from "react-icons/im";
import styles from "./answer.module.css";
import Image from "next/image";

const Answer = ({ type, body, title, createdAt, user }) => {

  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(createdAt).toLocaleDateString('fa-IR')} </p>
        <div>
          <div>
            <p>{user.name}</p>
            <span>{type=== 'user'? 'کاربر':"مدیر"}</span>
          </div>
          <Image
            width={50}
            height={50}
            
           src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Answer;
