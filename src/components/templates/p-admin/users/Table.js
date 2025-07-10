"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function DataTable({ users, title }) {
  const router = useRouter();
  if (!users || users.length === 0) {
    return <p className={styles.empty}>هیچ کاربری وجود ندارد</p>;
  }

  // تغییر نقش
  const handleUserRole = async (id) => {
    try {
      const res = await fetch("/api/user/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.status === 200) {
        swal({
          title: "نقش کاربر با موفقیت تغییر کرد",
          buttons: "باشه",
          icon: "success",
        }).then(() => {
          router.refresh();
          
        });
      } else {
        swal({
          title: "خطا در تغییر نقش کاربر",
          icon: "error",
          buttons: "باشه",
        });
      }
    } catch (error) {
      swal({ title: "خطای شبکه", icon: "error", buttons: "باشه" });
    }
  };

  // حذف کاربر
  const handleDeleteUser = (id) => {
    swal({
      title: "ایا از حذف مطمئنی؟",
      icon: "warning",
      buttons: {
        cancel: "نه",
        confirm: "اره",
      },
    }).then(async (result) => {
      if (result) {
        try {
          const res = await fetch("/api/user", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });

          const data = await res.json();

          if (res.status === 200) {
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              buttons: "باشه",
            }).then(() => {
              router.refresh();
            });
          } else {
            swal({ title: "خطا در حذف کاربر", icon: "error", buttons: "باشه" });
          }
        } catch (error) {
          swal({ title: "خطای شبکه", icon: "error", buttons: "باشه" });
        }
      }
    });
  };
  // بن کردن کاربر
  const handleBanUser = (email, phone) => {
    swal({
      title: "مطمئنی  میخواهی این کاربر را بن کنی؟",
      icon: "warning",
      buttons: { cancel: "نه", confirm: "اره" },
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone }),
        });
        const data = await res.json();
        swal({ title: "کاربر بن شد", icon: "success", buttons: "باشه" });
        router.refresh();
      }
    });
  };

  // ویرایش کاربر
  const handleEditUser = (id) => {
    swal("ویرایش در حال توسعه است");
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر نقش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل ندارد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button
                    onClick={() => handleEditUser(user._id)}
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleUserRole(user._id)}
                    className={styles.edit_btn}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className={styles.delete_btn}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleBanUser(user.email, user.phone)}
                    className={styles.delete_btn}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
