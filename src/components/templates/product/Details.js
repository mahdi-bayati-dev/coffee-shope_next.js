import { FaFacebookF, FaStar, FaTwitter, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import AddToWishlist from "./addToWishlist";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import Link from "next/link";

const Details = ({ product }) => {
  if (!product) {
    return <p>در حال بارگذاری محصول...</p>;
  }

  const {
    name = "بدون عنوان",
    price = 0,
    shortDiscretion = "توضیحی ندارد",
    Comments = [],
    tag = [],
    _id = "نامشخص",
  } = product;

  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={name} />
      <h2>{name}</h2>

      <div className={styles.rating}>
        <div>
          {[...Array(product.score)].map((item, i) => (
            <FaStar key={i} />
          ))}
          {[...Array(5 - product.score)].map((item, i) => (
            <FaRegStar key={i} />
          ))}
        </div>
        <p>(دیدگاه {Comments.filter((comments)=>comments.isAccess).length || 0} کاربر)</p>
      </div>

      <p className={styles.price}>{price?.toLocaleString?.() || "۰"} تومان</p>

      <span className={styles.description}>{shortDiscretion}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishlist productId={product}/>
        <div>
          <TbSwitch3 />
          <Link href="/">مقایسه</Link>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {_id}</strong>
        <p>
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong>{" "}
          {Array.isArray(tag) ? tag.join(", ") : "بدون برچسب"}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <Link href="/">
          <FaTelegram />
        </Link>
        <Link href="/">
          <FaLinkedinIn />
        </Link>
        <Link href="/">
          <FaPinterest />
        </Link>
        <Link href="/">
          <FaTwitter />
        </Link>
        <Link href="/">
          <FaFacebookF />
        </Link>
      </div>

      <hr />
    </main>
  );
};

export default Details;
