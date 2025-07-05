import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { ValidationEmail, ValidationPassword } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);

  const [email, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginPassword = async () => {
    if (!email) {
      return swal({
        title: "خطا",
        text: "ایمیل یا شماره موبایل را وارد کنید",
        icon: "error",
      });
    }

    if (!ValidationEmail(email)) {
      return swal({
        title: "خطا",
        text: "فرمت ایمیل معتبر نیست",
        icon: "error",
      });
    }

    if (!password) {
      return swal({
        title: "خطا",
        text: "رمز عبور را وارد کنید",
        icon: "error",
      });
    }
    const isValidPassword = ValidationPassword(password);
    if (!isValidPassword) {
      return swal({
        title: "خطا",
        text: "رمز عبور درست نیست",
        icon: "error",
      });
    }

    const user = { password, email };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
     

      if (!res.ok) {
        return swal({
          title: "خطا",
          text: data.message || "ورود ناموفق بود",
          icon: "error",
        });
      }

      swal({
        title: "ورود موفق",
        icon: "success",
        buttons: "ورود به سایت",
      }).then(() => {
        router.push("/"); 
      });

      // انجام عملیات بعد از ورود موفق (مثل redirect)
    } catch (error) {
      console.error(error);
      swal({
        title: "خطا",
        text: "مشکلی در اتصال به سرور پیش آمده",
        icon: "error",
      });
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              value={email}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginPassword}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
