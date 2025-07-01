"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import styles from "@/styles/ScrollToTop.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
 
  useEffect(() => {
    const toggleVis = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVis);
    return () => window.removeEventListener("scroll", toggleVis);
  }, []);

  return (
    <button
      className={isVisible ? styles.buttonVisible : styles.button}
      onClick={scrollToTop}
    >
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
