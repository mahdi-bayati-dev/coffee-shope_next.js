
"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function DataTable({ users, title }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal({
        title: "نقش کاربر با موفقیت تغییر یافت",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userID }),
        });
        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        });
        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت بن شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        {users.length === 0 ? (
          <div className={styles.empty}>هیچ کاربری یافت نشد</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">شناسه</th>
                <th scope="col">نام</th>
                <th scope="col">ایمیل</th>
                <th scope="col">نقش</th>
                <th scope="col">ویرایش</th>
                <th scope="col">تغییر نقش</th>
                <th scope="col">حذف</th>
                <th scope="col">بن</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                  <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                  <td>
                    <button type="button" className={styles.edit_btn}>
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.edit_btn}
                      onClick={() => changeRole(user._id)}
                    >
                      نقش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => removeUser(user._id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => banUser(user.email, user.phone)}
                    >
                      بن
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
