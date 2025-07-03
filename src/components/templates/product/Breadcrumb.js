import React from "react";
import styles from "./breadcrumb.module.css";
import Link from "next/link";
const Breadcrumb = ({ title }) => {
  return (
    <section className={styles.breadcrumb}>
      <Link href="/">خانه </Link>
      <span>/</span>
      <Link href="/">همه موارد </Link>
      <span>/</span>
      <p>{title}</p>
    </section>
  );
};

export default Breadcrumb;
