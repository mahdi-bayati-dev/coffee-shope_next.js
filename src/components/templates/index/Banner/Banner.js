"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

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
        <Image
          width={1920}
          height={1080}
          src="/images/fall.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src="/images/slide.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src="/images/winter-slie.jpg"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
