import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
import Article from "./Article";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className={`container ${styles.mainContainer}`}>
        {/* لوگو و آدرس */}
        <section className={styles.descriptions}>
          <Image
            width={300}
            height={150}
            src="/images/logo_light.png"
            alt="لوگو قهوه ست"
            priority
          />
          <p className={styles.descriptions_title}>
            شرکت فنجان داغ خوارزمی، فروشگاه اینترنتی قهوه ست
          </p>

          <div className={styles.description}>
            <p>
              تهران. شریف آباد . شهرک صنعتی خوارزمی فاز ۲ . بلوار بهارستان.
              خیابان ماگنولیا بلوک آ۱۱۷
            </p>
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionItem}>پیگیری سفارشات: ۰۲۱۸۸۳۰۵۸۲۷</p>
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionItem}>support [at] set-coffee.com</p>
          </div>
        </section>

        {/* لینک‌های مهم */}
        <nav className={styles.footerLinks}>
          <div>
            <h4 className={styles.titleH4}>منوی فوتر</h4>
            <ul>
              <li>
                <Link href="/contact-us">تماس با ما</Link>
              </li>
              <li>
                <Link href="/about-us">درباره ما</Link>
              </li>
              <li>
                <Link href="/rules">قوانین</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.titleH4}>دسترسی سریع</h4>
            <ul>
              <li>
                <Link href="/category">فروشگاه</Link>
              </li>
              <li>
                <Link href="/articles">مقالات</Link>
              </li>
              <li>
                <Link href="/cart">سبد خرید</Link>
              </li>
              <li>
                <Link href="/wishlist">علاقه‌مندی‌ها</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* مقالات جدید */}
        <section className={styles.latestArticlesSection}>
          <h4 className={styles.titleH4}>جدیدترین نوشته‌ها</h4>
          <Article
            href="/article/123"
            data="۱۷ آبان ۱۴۰۲"
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />
          <hr />
          <Article
            href="/article/123"
            data="۱۷ آبان ۱۴۰۲"
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />
        </section>

        {/* مجوزها */}
        <section className={styles.licenses}>
          <Image src="/images/license4.htm" width={76} height={76} alt="مجوز" />
          <Image src="/images/license1.png" width={85} height={85} alt="مجوز" />
          <Image src="/images/license3.png" width={85} height={85} alt="مجوز" />
          <Image src="/images/license2.svg" width={62} height={95} alt="مجوز" />
        </section>
      </main>

      {/* خط جداکننده */}
      <hr className={styles.footerDivider} />

      {/* کپی رایت */}
      <div className="container">
        <p className={styles.copyRight}>
          2023 <MdOutlineCopyright />
          تمام حقوق متعلق است به <strong>قهوه ست</strong> | طراحی و اجرا{" "}
          <strong>نیلامارکتینگ</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
