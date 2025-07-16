"use client";
import { useState } from "react";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import { useRouter } from "next/navigation";

function AddDiscounts() {
  const router = useRouter()
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, percent, maxUse }),
      });
      console.log(response);

      if (!response.ok) {
        swal({
          title: "درخواست ساخت کد ارسال نشد",
          icon: "warning",
          buttons: "باشه",
        });
      }

      const data = await response.json();
      swal({
        title: "کد با موفقیت ساخته شد",
        icon: "success",
        buttons: "باشه",
      });
      // Reset form fields
      router.refresh();
      setCode("");
      setPercent("");
      setMaxUse("");
    } catch (error) {
      console.error("Error:", error);
      swal({ title: "خطا در ساخت کد تخفیف", icon: "error", buttons: "باشه" });
    }
  };
  return (
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>شناسه تخفیف</label>
          <input
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div>
          <label>درصد تخفیف</label>
          <input
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="text"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
        <div>
          <label>حداکثر استفاده</label>
          <input
            placeholder="حداکثر استفاده از کد تخفیف"
            type="text"
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
          />
        </div>
        <div>
          <label>محصول</label>
          <select name="" id="">
            <option value="">قهوه ترک</option>
            <option value="">قهوه عربیکا</option>
            <option value="">قهوه اسپرسو</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit}>افزودن</button>
    </section>
  );
}

export default AddDiscounts;
