"use client";
import React, { useState } from "react";
import styles from "./tabs.module.css";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

const Tabs = ({ product, userId }) => {
  
  const [tab, setTab] = useState("description");

  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onChange={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description"}
        className={styles.tabInput}
      />
      <input
        onChange={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes"}
        className={styles.tabInput}
      />
      <input
        onChange={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments"}
        className={styles.tabInput}
      />
      <ul className={styles.tabList}>
        <li title="توضیحات">
          <label htmlFor="description" role="button" className={styles.tabLabel}>
            توضیحات
          </label>
        </li>
        <li title="اطلاعات بیشتر">
          <label htmlFor="moreInfoes" role="button" className={styles.tabLabel}>
            اطلاعات بیشتر
          </label>
        </li>
        <li title="نظرات">
          <label htmlFor="comments" role="button" className={styles.tabLabel}>
            نظرات ({(product.comments || []).filter((c) => c.isAccess).length})
          </label>
        </li>
      </ul>
      <div className={styles.contents}>
        <section className={`${styles.tabsContent} ${tab === "description" ? styles.active : ""}`}>
          <Description product={JSON.parse(JSON.stringify(product))} />
        </section>
        <section className={`${styles.tabsContent} ${tab === "moreInfoes" ? styles.active : ""}`}>
          <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
        </section>
        <section className={`${styles.tabsContent} ${tab === "comments" ? styles.active : ""}`}>
          <Comments
            userId={userId}
            productId={product._id}
            comments={JSON.parse(JSON.stringify(product.comments || []))}
          />
        </section>
      </div>
    </div>
  );
};

export default Tabs;