import Link from "next/link";
import styles from "./promote.module.css";
import Image from "next/image";

const Promote = () => {
  return (
    <div className={styles.readable}>
      <div data-aos="fade-up-right" className={styles.container}>
        {/* بخش اول */}
        <main className={styles.main}>
          <section className={styles.textBlock}>
            <span>خرید قهوه، به سبک حرفه‌ای‌ها</span>
            <p>زیبایی امروز رو با قهوه ست کنید</p>
            <Image
              width={500}
              height={500}
              data-aos="fade-left"
              src="/images/coffee-image-1.jpg"
              alt="coffee main"
              className={styles.image}
            />
          </section>

          <section className={styles.club}>
            <div>
              <span>باشگاه مشتریان ست</span>
              <p>برای مشتریان وفادار قهوه ست</p>
            </div>
          </section>
        </main>

        {/* بخش دوم */}
        <main className={styles.main}>
          <Image
            width={400}
            height={400}
            src="/images/Home32.jpg"
            alt="coffee bag"
            className={styles.image}
          />
          <section data-aos="fade-up" className={styles.why_coffee}>
            <p className={styles.title}>چرا قهوه ست؟</p>
            <p className={styles.description}>
              برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف‌کنندگان راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است. تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف‌کنندگان قهوه، ضامن این ویژگی‌ها است.
            </p>
            <div className={styles.buttons}>
              <Link href="/about-us">
                <button className={styles.red_btn}>بیشتر بخوانید</button>
              </Link>
              <Link href="/category">
                <button className={styles.white_btn}>فروشگاه</button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Promote;
