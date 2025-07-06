import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState } from "react";

const CommentForm = ({ ProductId , userId}) => {

  const [userName, setUserName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !body) {
      alert("همه‌ی فیلدها را پر کنید!");
      return;
    }

    const comment = { userName, email, body, score, ProductId ,  user: userId };

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    console.log(comment);

    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>

      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          {[...Array(5)].map((_, i) => (
            <IoMdStar
              key={i}
              onClick={() => setScore(i + 1)}
              style={{ color: i < score ? "gold" : "gray", cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label>
          دیدگاه شما<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          cols="45"
          rows="8"
          required
        ></textarea>
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>
            نام<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className={styles.group}>
          <label>
            ایمیل<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" />
        <p>ذخیره نام، ایمیل و وبسایت من در مرورگر</p>
      </div>

      <button type="submit">ثبت</button>
    </form>
  );
};

export default CommentForm;
