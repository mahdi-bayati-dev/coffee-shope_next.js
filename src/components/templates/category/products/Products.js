"use client";
import { useState } from "react";
import styles from "./products.module.css";
import { MdOutlineClose, MdOutlineGridView } from "react-icons/md";
import { BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import Card from "@/components/modules/card/Card";
import Pagination from "@/components/modules/pagination/Pagination";

// داده‌های نمونه (در عمل از API یا پراپ دریافت می‌شود)
const sampleProducts = Array(9).fill({
  id: 1,
  name: "اسپرسو ساز خانگی",
  price: 1000000,
  score: 4.5,
  img: "/images/product.jpg",
});

const sampleFilters = [
  "اسپرسو ساز خانگی (ریز)",
  "اسپرسو ساز حرفه‌ای",
  "کپسول قهوه",
];

const Products = ({ products = sampleProducts, initialFilters = sampleFilters }) => {
  const [viewMode, setViewMode] = useState("grid-3"); // grid-3, grid-4, grid-2
  const [sortOrder, setSortOrder] = useState("default");
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    // TODO: منطق مرتب‌سازی محصولات بر اساس انتخاب کاربر
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleRemoveFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className={styles.products}>
      <div className={styles.filtering}>
        <div className={styles.view} role="group" aria-label="تغییر نمای محصولات">
          <TfiLayoutGrid4Alt
            className={viewMode === "grid-4" ? styles.active : ""}
            onClick={() => handleViewChange("grid-4")}
            aria-label="نمایش گرید 4 ستونی"
          />
          <BiSolidGrid
            className={viewMode === "grid-3" ? styles.active : ""}
            onClick={() => handleViewChange("grid-3")}
            aria-label="نمایش گرید 3 ستونی"
          />
          <MdOutlineGridView
            className={viewMode === "grid-2" ? styles.active : ""}
            onClick={() => handleViewChange("grid-2")}
            aria-label="نمایش گرید 2 ستونی"
          />
        </div>
        <select
          name="orderby"
          value={sortOrder}
          onChange={handleSortChange}
          aria-label="مرتب‌سازی محصولات"
        >
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="popularity">مرتب‌سازی بر اساس محبوبیت</option>
          <option value="rating">مرتب‌سازی بر اساس امتیاز</option>
          <option value="last_products">مرتب‌سازی بر اساس آخرین</option>
          <option value="Inexpensive">مرتب‌سازی بر اساس ارزان‌ترین</option>
          <option value="expensive">مرتب‌سازی بر اساس گران‌ترین</option>
        </select>
      </div>
      <div className={styles.available_filters}>
        <div
          onClick={handleClearFilters}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClearFilters()}
          aria-label="حذف همه فیلترها"
        >
          <p>حذف همه فیلترها</p>
          <MdOutlineClose />
        </div>
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            onClick={() => handleRemoveFilter(filter)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleRemoveFilter(filter)}
            aria-label={`حذف فیلتر ${filter}`}
          >
            <p>{filter}</p>
            <MdOutlineClose />
          </div>
        ))}
      </div>
      <main className={`${styles.main} ${styles[viewMode]}`}>
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </main>
      <Pagination />
    </div>
  );
};

export default Products;