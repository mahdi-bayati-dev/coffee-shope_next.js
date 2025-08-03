"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";

function AccountDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (isMounted) {
          setName(data.data?.user?.name || "");
          setEmail(data.data?.user?.email || "");
          setPhone(data.data?.user?.phone || "");
          setAvatarUrl(data.data?.user?.avatar || "");
        }
      } catch (err) {
        console.error("Fetch User Error:", err);
      }
    };
    getUser();

    return () => {
      isMounted = false;
      if (avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const updateUser = async () => {
    const userNewInfos = { name, email, phone };
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userNewInfos),
      });

      if (res.ok) {
        await swal({
          title: "اطلاعات مورد نظر با موفقیت آپدیت شد",
          icon: "success",
          buttons: "فهمیدم",
        });
        await fetch("/api/auth/signout", { method: "POST" });
        router.replace("/login-register");
      } else {
        await swal("خطا در به‌روزرسانی", "", "error");
      }
    } catch (err) {
      console.error("Update User Error:", err);
      await swal("خطا در ارتباط با سرور", "", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (!file) {
      console.log("No file selected");
      return;
    }
    if (!file.type.startsWith("image/")) {
      swal("لطفاً یک فایل تصویری انتخاب کنید", "", "error");
      return;
    }
    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    console.log("✅ handleUpload executed, avatarFile:", avatarFile);
    if (!avatarFile) {
      await swal("لطفاً یک فایل انتخاب کنید", "", "warning");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("img", avatarFile);

    try {
      console.log("Sending request to /api/user/avatarUpload");
      const res = await fetch("/api/user/avatarUpload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.ok) {
        await swal("عکس با موفقیت آپلود شد", "", "success");
        setAvatarUrl(data.avatar);
        setAvatarFile(null); // پاک کردن فایل پس از آپلود موفق
      } else {
        console.error("Upload failed:", data);
        await swal("خطا در آپلود عکس", data.message || "خطای ناشناخته", "error");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      await swal("خطا در ارتباط با سرور", err.message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span>جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <Image
                width={100}
                height={150}
                src={avatarUrl || "/images/avatar.png"}
                alt="user profile"
              />
              <div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    انتخاب فایل
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={styles.uploadButton}
                >
                  {isUploading ? "در حال آپلود..." : (
                    <>
                      <IoCloudUploadOutline />
                      آپلود عکس
                    </>
                  )}
                </button>
                <button type="button" disabled={!avatarUrl}>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;