"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({ product, userId }) => {
  console.log("--=>", product);

  const [tab, setTab] = useState("description");
  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onChange={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description"}
      />
      <input
        onChange={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes"}
      />
      <input
        onChange={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments"}
      />

      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            نظرات ({(product.comments || []).filter((c) => c.isAccess).length})
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Description product={JSON.parse(JSON.stringify(product))} />
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
        </section>
        <section className={styles.tabs_content}>
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
