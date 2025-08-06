"use client";
import Card from "@/components/modules/product/Product"; // نام کامپوننت را به Card تغییر دادیم
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MoreProducts = ({ relatedProduct }) => {
  

  return (
    <div data-aos="fade-right" style={{ padding: "20px 0" }}>
      <section
        style={{
          textAlign: "right",
          marginBottom: "20px",
          padding: "0 15px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          محصولات مرتبط
        </h2>
        <div
          style={{
            height: "2px",
            width: "70px",
            background: "black",
            marginTop: "10px",
            marginRight: "auto",
          }}
        ></div>
      </section>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
        style={{ padding: "0 10px" }}
      >
        {relatedProduct.map((product) => (
          <SwiperSlide key={product._id}>
            <Card
              name={product.name}
              price={product.price}
              img={product.img}
              _id={product._id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;