import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import swal from "sweetalert";
import {
  ValidationEmail,
  ValidationPassword,
  ValidationPhone,
} from "@/utils/auth";
import { useRouter } from "next/navigation";

const Register = ({ showLoginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router=useRouter()

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signUp = async () => {
    if (!name.trim()) {
      swal({
        title: "لطفا نام را وارد کنید!",
        icon: "error",
        buttons: "دوباره امتحان کنید",
      });
      return;
    }

    if (!ValidationPhone(phone)) {
      swal({
        title: "لطفا شماره تلفن رو درست وارد کنید",
        icon: "error",
        buttons: "دوباره امتحان کنید",
      });
      return;
    }

    if (email.trim() && !ValidationEmail(email)) {
      swal({
        title: "لطفا ایمیل را درست وارد کنید",
        icon: "error",
        buttons: "دوباره امتحان کنید",
      });
      return;
    }

    if (isRegisterWithPass && !ValidationPassword(password)) {
      swal({
        title: "پسور قابل حدس است",
        icon: "error",
        buttons: "دوباره امتحان کن",
      });
      return;
    }

    const user = { name, email, phone, password };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.status === 422) {
        swal({
          title: "کاربر وجود دارد",
          icon: "warning",
          buttons: "دوباره امتحان کن",
        });
      } else if (res.status === 201) {
        swal({
          title: "ثبت نام موفق بود",
          icon: "success",
          buttons: "ورود به پنل کاربر",
        });
        router.replace('/')
        setEmail("");
        setPassword("");
        setPhone("");
        setName("");

      } else if (res.status === 400) {
        swal({
          title: "مقادیر رو درست وارد کنید",
          icon: "warning",
          buttons: "دوباره  امتحان کنید",
        });
      } else {
        swal({
          title: "مشکل در سرور",
          icon: "warning",
          buttons: "دوباره  امتحان کنید",
        });
      }
    } catch (error) {
      console.error(error);
      swal({
        title: "خطای ناشناخته!",
        icon: "error",
        buttons: "دوباره امتحان کنید",
      });
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="نام"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            {isRegisterWithPass && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            )}

            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              onClick={() => {
                if (!isRegisterWithPass) {
                  setIsRegisterWithPass(true);
                } else {
                  signUp();
                }
              }}
              className={styles.btn}
            >
              {isRegisterWithPass ? "ثبت نام نهایی" : "ثبت نام با رمزعبور"}
            </button>

            <p onClick={showLoginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
