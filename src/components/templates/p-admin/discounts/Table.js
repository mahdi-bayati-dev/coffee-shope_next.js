
"use client";
import React from "react";
import styles from "./table.module.css";

function Table({ discounts }) {
  return (
    <div className={styles.container}>
      <div className={styles.table_container}>
        {discounts.length === 0 ? (
          <div className={styles.empty}>هیچ تخفیفی یافت نشد</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">شناسه</th>
                <th scope="col">کد</th>
                <th scope="col">درصد</th>
                <th scope="col">حداکثر استفاده</th>
                <th scope="col">دفعات استفاده</th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount, index) => (
                <tr key={discount._id}>
                  <td
                    className={
                      discount.uses === discount.maxUse
                        ? styles.red
                        : styles.green
                    }
                  >
                    {index + 1}
                  </td>
                  <td>{discount.code}</td>
                  <td>{discount.percent}%</td>
                  <td>{discount.maxUse}</td>
                  <td>{discount.uses}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      aria-label="حذف تخفیف"
                    >
                      حذف
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

export default Table;
