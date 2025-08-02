"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import styles from "@/components/templates/product/Gallery.module.css";

const Gallery = ({ productImg }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [productImg];

  return (
    <section className={styles.galleryContainer}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.gallerySlider} mySwiper2`}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <Image
                width={700}
                height={700}
                alt={`تصویر گالری ${index + 1}`}
                src={img}
                layout="responsive"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 700px" // بهینه‌سازی اندازه تصویر
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.gallerySlider2}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.thumbWrapper}>
              <Image
                width={100}
                height={100}
                src={img}
                alt="تصویر محصول"
                layout="responsive"
                objectFit="cover"
                sizes="(max-width: 768px) 25vw, 100px" // بهینه‌سازی اندازه تصاویر کوچک
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;