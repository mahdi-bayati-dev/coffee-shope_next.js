"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <img
          src="../../images/fall.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="../../images/slide.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="../../images/winter-slie.jpg"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
