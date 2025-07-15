"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    swal({
      title: body,
      buttons: "خوندم",
    });
  };

  const acceptComments = async (id) => {
    try {
      swal({
        title: "میخواهید کامنت را تایید کنید؟",
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await fetch("/api/comment/accept", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          console.log(response);
          console.log(id);

          if (response.ok) {
            swal("کامنت تایید شد", "", "success");
            router.refresh();
          } else {
            swal("خطا در تایید کامنت", "", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error rejecting comment:", error);
      swal("خطا در تایید کامنت", "", "error");
    }
  };
  const rejectComments = async (id) => {
    try {
      swal({
        title: "میخواهید کامنت را رد کنید؟",
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await fetch("/api/comment/reject", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          console.log(response);
          console.log(id);

          if (response.ok) {
            swal("کامنت رد شد", "", "success");
            router.refresh();
          } else {
            swal("خطا در رد کامنت", "", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error rejecting comment:", error);
      swal("خطا در رد کامنت", "", "error");
    }
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>رد/ تایید</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.ProductId.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccess ? (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => {
                        rejectComments(comment._id);
                      }}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => {
                        acceptComments(comment._id);
                      }}
                    >
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
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
