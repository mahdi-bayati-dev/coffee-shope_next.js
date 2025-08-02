"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./filtering.module.css";
import MultiRangeSlider from "../multiRange/MultiRangeSlider";
import { FaRegStar, FaStar } from "react-icons/fa";
import Card from "../bestProducts/Card";

const sampleFilters = [
  { id: 1, name: "اسپرسو ساز خانگی (ریز)", count: 20 },
  { id: 2, name: "اسپرسو ساز حرفه‌ای", count: 15 },
  { id: 3, name: "کپسول قهوه", count: 10 },
];

const sampleBestProducts = [
  { id: 1, name: "محصول برتر 1", price: 1000000, score: 4.5 },
  { id: 2, name: "محصول برتر 2", price: 2000000, score: 4.0 },
  { id: 3, name: "محصول برتر 3", price: 1500000, score: 4.8 },
];

const sampleRatings = [
  { stars: 5, count: 12 },
  { stars: 4, count: 22 },
  { stars: 3, count: 10 },
];

const Filtering = ({
  filters = sampleFilters,
  bestProducts = sampleBestProducts,
  ratings = sampleRatings,
  onFilterChange = () => {},
  toggleFilterMenu, // پراپ جدید برای مدیریت منو از والد
  isMenuOpen, // پراپ برای وضعیت منو
}) => {
  const [minValue, setMinValue] = useState(140000);
  const [maxValue, setMaxValue] = useState(6790000);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const menuRef = useRef(null);

  const handlePriceFilter = () => {
    onFilterChange({ type: "price", min: minValue, max: maxValue });
  };

  const handleCategoryFilter = (filterId) => {
    const updatedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(updatedFilters);
    onFilterChange({ type: "category", filters: updatedFilters });
  };

  const handleRatingFilter = (stars) => {
    const newRating = selectedRating === stars ? null : stars;
    setSelectedRating(newRating);
    onFilterChange({ type: "rating", stars: newRating });
  };

  // بستن منو با کلیک خارج
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        toggleFilterMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen, toggleFilterMenu]);

  return (
    <div
      ref={menuRef}
      className={`${styles.filtering} ${isMenuOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.price_filtering}>
        <p className={styles.title}>فیلتر بر اساس قیمت:</p>
        <div>
          <MultiRangeSlider
            min={140000}
            max={6790000}
            onChange={({ min, max }) => {
              setMinValue(min);
              setMaxValue(max);
            }}
          />
          <button
            className={styles.filter_btn}
            onClick={handlePriceFilter}
            aria-label="اعمال فیلتر قیمت"
          >
            فیلتر
          </button>
        </div>
      </div>
      <div className={styles.name_filtering}>
        <p className={styles.title}>انتخاب قهوه بر اساس</p>
        <section>
          {filters.map((filter) => (
            <div
              key={filter.id}
              className={selectedFilters.includes(filter.id) ? styles.active : ""}
              onClick={() => handleCategoryFilter(filter.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCategoryFilter(filter.id)}
              aria-label={`فیلتر ${filter.name}`}
            >
              <p>{filter.name}</p>
              <div>{filter.count}</div>
            </div>
          ))}
        </section>
      </div>
      <div className={styles.star_filtering}>
        <p className={styles.title}>انتخاب بر اساس امتیاز</p>
        <section>
          {ratings.map((rating) => (
            <div
              key={rating.stars}
              className={selectedRating === rating.stars ? styles.active : ""}
              onClick={() => handleRatingFilter(rating.stars)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleRatingFilter(rating.stars)}
              aria-label={`فیلتر بر اساس ${rating.stars} ستاره`}
            >
              <div>
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>
                      {i < rating.stars ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
              </div>
              <span>({rating.count})</span>
            </div>
          ))}
        </section>
      </div>
      <div className={styles.best_products}>
        <p className={styles.title}>برترین محصولات</p>
        <section>
          {bestProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Filtering;