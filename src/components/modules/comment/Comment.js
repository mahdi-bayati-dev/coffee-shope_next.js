import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

import styles from "./comment.module.css";
const Comment = ({ comments }) => {
  return (
    <section className={styles.comment}>
      <Image
      width={50}
      height={50} 
       src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{comments.name}</strong>
            <p>
              {new Date(comments.date).toLocaleDateString("fa-IR")}
            </p>
          </div>
          <div className={styles.stars}>
            {[...Array(comments.score)].map((item, i) => (
              <FaStar key={i} />
            ))}
            {[...Array(5 - comments.score)].map((item, i) => (
              <FaRegStar key={i} />
            ))}
          </div>
        </div>
        <p>{comments.body}</p>
      </div>
    </section>
  );
};

export default Comment;
