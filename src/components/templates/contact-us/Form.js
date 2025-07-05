"use client";
import styles from "./form.module.css";
import { useState } from "react";
import swal from "sweetalert";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, phone, message }),
      });
      if (res.ok) {
        swal({
          title: "پیام شما با موفقیت ارسال شد",
          icon: "success",
          buttons: "ممنونم",
        });
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");

      }else {
        const errorData = await res.json();
        swal({
          title: "خطا در ارسال پیام",
          text: errorData.message || "لطفا دوباره تلاش کنید",
          icon: "error",
          buttons: "باشه",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button onClick={sendMessage}>ارسال</button>
    </form>
  );
};

export default Form;
