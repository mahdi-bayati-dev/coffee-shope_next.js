"use client";
import { useEffect, useState } from "react";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import { useRouter } from "next/navigation";

function AddDiscounts() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, percent, maxUse }),
      });
      

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        
        setProducts(data.data); // ✅ فقط آرایه
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    getProducts();
  }, []);

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
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">انتخاب محصول</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleSubmit}>افزودن</button>
    </section>
  );
}

export default AddDiscounts;
