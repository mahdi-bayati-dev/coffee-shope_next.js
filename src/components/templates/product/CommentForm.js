import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";

const CommentForm = ({ ProductId, userId }) => {
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

    const comment = { userName, email, body, score, ProductId, user: userId };

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

      // پاک کردن فیلدها بعد از ارسال موفق
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
        <input
          type="checkbox"
          checked={isSaveUserInfo}
          onChange={() => setIsUserInfo((prev) => !prev)}
        />
        <p>ذخیره نام، ایمیل و وبسایت من در مرورگر</p>
      </div>

      <button type="submit">ثبت</button>
    </form>
  );
};

export default CommentForm;
