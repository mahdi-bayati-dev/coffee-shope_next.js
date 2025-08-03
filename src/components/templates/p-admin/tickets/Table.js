
"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketBody = (body) => {
    swal({
      title: body,
      buttons: "خوندم",
    });
  };

  const answerToTicket = async (ticket) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد کنید:",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      if (answerText) {
        const answer = {
          ...ticket,
          body: answerText,
          ticketID: ticket._id,
        };
        const res = await fetch("/api/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        });
        if (res.status === 201) {
          swal({
            title: "پاسخ مورد نظر ثبت شد",
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
        {tickets.length === 0 ? (
          <div className={styles.empty}>هیچ تیکتی یافت نشد</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">شناسه</th>
                <th scope="col">کاربر</th>
                <th scope="col">عنوان</th>
                <th scope="col">دپارتمان</th>
                <th scope="col">مشاهده</th>
                <th scope="col">پاسخ</th>
                <th scope="col">بن</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.user?.name || "ناشناخته"}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.department?.title || "نامشخص"}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.edit_btn}
                      onClick={() => showTicketBody(ticket.body)}
                      aria-label="مشاهده تیکت"
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => answerToTicket(ticket)}
                      aria-label="پاسخ به تیکت"
                    >
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      aria-label="بن کاربر"
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
