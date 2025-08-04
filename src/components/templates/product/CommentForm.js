"use client";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";

const CommentForm = ({ productId, userId }) => {
  
  const [userName, setUserName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [isSaveUserInfo, setIsUserInfo] = useState(false);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      const { userName, email } = JSON.parse(savedUserInfo);
      setUserName(userName);
      setEmail(email);
      setIsUserInfo(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !email || !body) {
      return swal({
        title: "خطا",
        text: "لطفاً همه‌ی فیلدها را پر کنید!",
        icon: "error",
        button: "باشه",
      });
    }
    if (isSaveUserInfo) {
      const userInfo = { userName, email };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    const comment = { userName, email, body, score, productId, user: userId };
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      const data = await res.json();
      
      if (!res.ok) {
        return swal({
          title: "ثبت ناموفق!",
          text: data.message || "مشکلی در ثبت نظر به‌وجود آمد.",
          icon: "error",
          button: "تلاش مجدد",
        });
      }
      swal({
        title: "ثبت موفق!",
        text: "نظر شما با موفقیت ثبت شد و پس از بررسی نمایش داده خواهد شد.",
        icon: "success",
        button: "باشه",
      });
      setBody("");
      setScore(0);
    } catch (error) {
      console.error("⛔ Error:", error.message);
      swal({
        title: "خطای شبکه",
        text: "مشکلی در برقراری ارتباط با سرور پیش آمد.",
        icon: "error",
        button: "متوجه شدم",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p className={styles.emailNote}>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className={styles.required}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <IoMdStar
              key={i}
              onClick={() => setScore(i + 1)}
              className={i < score ? styles.starActive : styles.star}
            />
          ))}
        </div>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>
          دیدگاه شما<span className={styles.required}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label className={styles.label}>
            نام<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>
            ایمیل<span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={isSaveUserInfo}
          onChange={() => setIsUserInfo((prev) => !prev)}
          className={styles.checkboxInput}
        />
        <label className={styles.checkboxLabel}>
          ذخیره نام، ایمیل و وبسایت من در مرورگر
        </label>
      </div>
      <button type="submit" className={styles.submitButton}>ثبت</button>
    </form>
  );
};

export default CommentForm;