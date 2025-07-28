
import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaFacebookF, FaLinkedinIn, FaPinterest, FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoGridOutline } from "react-icons/io5";
import styles from './details.module.css'

const Details = () => {
  return (
    <>
           <p className={styles.tag}>قهوه</p>
                <p className={styles.title}>نوشیدن قهوه تجربه ای است که به طور کامل مغز را به فعالیت وادار می کند</p>
                <div className={styles.author}>
                    <p>نویسنده</p>
                    <img src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g" alt="" />
                    <p>Mohebi</p>
                </div>

                <div className={styles.main_img}>
                    <div class={styles.date}>
                        <span>24</span>
                        <span>بهمن</span>
                    </div>
                    <img src="https://set-coffee.com/wp-content/uploads/2024/01/coffe.jpg" alt="" />
                </div>
                <section>
                    <p>تحقیقات جدید حاکی از آن است که در واقع خود تجربه نوشیدن قهوه موجب هوشیاری و کارایی بیشتر ذهن می شود نه فقط کافئین موجود در آن. محققان با این فرضیه که «قهوه ضرروی برای صبحانه» که میلیاردها نفر در سراسر جهان از آن لذت می برند ممکن است دارونما باشد، روی افرادی که به طور منظم قهوه می نوشند، MRI انجام دادند تا فعالیت عملکردی مغز آنها را ارزیابی کنند.</p>
                    <p>تیم تحقیقاتی مستقر در پرتغال از شرکت کنندگان در این تحقیق، خواست تا قبل از انجام MRI از مصرف قهوه یا کافئین خودداری کنند. به یک گروه از شرکت کنندگان، کافئین به شکل شیمیایی ساده داده شد در حالی که به گروه دیگر یک فنجان قهوه کافئین دار تقریبا شبیه قهوه ای که هر روز نوشیدن آن را تجربه می کنند، داده شد. سپس از شرکت کنندگان خواسته شد هنگام انجام اسکن ام آر آی آرام باشند و اجازه دهند ذهنشان آزادانه فکر کند.</p>
                    <p>اسکن‌ها نشان دادند که فعالیت در شبکه حالت پیش‌فرض مغز (DMN) – که با درونگرایی و خویشتن اندیشی مرتبط است، در هر دو گروه از شرکت‌کنندگان کاهش یافت و در عین حال، پاسخ به محرک‌های خارجی افرایش یافت. این نتایج، نشان می دهد که مصرف کافئین یا یک فنجان قهوه “افراد را برای تغییر وضعیت از حالت استراحت به انجام وظایف آماده تر می کند.”</p>
                    <p>البته،MRI  یک تمایز قابل توجه را نیز بین دو گروه نشان داد. در افرادی که یک فنجان قهوه نوشیده بودند، ارتباط شبکه عصبی بین «شبکه بصری بالاتر- higher visual network » و «شبکه کنترل اجرایی صحیح- right executive control network » دیده شد. این شبکه ها، بخش‌هایی از مغز هستند که با حافظه فعال، کنترل شناختی و رفتار هدف‌دار مرتبط هستند.</p>
                    <p>اما گروهی که بدون تجربه نوشیدن قهوه صرفا کافئین مصرف کرده بودند، این افزایش در فعالیت عصبی را تجربه نکرده بودند.</p>
                </section>
                <div className={styles.img_content}>
                    <img src="https://set-coffee.com/wp-content/uploads/2024/01/cofffe.jpg" alt="" />
                    <p>نوشیدن قهوه برای مغز</p>
                </div>
                <section>
                    <p><strong>ماریا پیکو-پرز، سرپرست تیم تحقیق</strong> از دانشگاه Jaume I ، در بیانیه‌ای درباره این یافته‌ها گفت : به عبارت ساده، شرکت کنندگان در این تحقیق بعد از نوشیدن قهوه برای انجام فعالیت هایشان آماده تر بودند و هوشیار آنها نسبت به محرک‌های خارجی بیشتر شده بود.</p>
                    <p>این تحقیق برای بررسی اینکه آیا نوشیدن فنجان های قهوه بدون کافئین ممکن است نتایج مشابهی به همراه داشته باشد یا خیر طراحی نشده بود، اگرچه محققان این فرضیه را مطرح کردند که نوشیدنی های بدون قهوه که حاوی کافئین هستند احتمالاً تغییر وضعیت از حالت استراحت به انجام وظایف را سریعتر می کنند.</p>
                    <p>پیکو پرز ادامه داد: «با در نظر گرفتن اینکه برخی از نتایج این تحقیق به علت وجود کافئین ایجاد می‌شوند، می‌توانیم انتظار داشته باشیم که سایر نوشیدنی‌های کافئین‌دار نیز  اثرات مشابهی را به ایجاد کنند. با این حال، برخی از نتایج نیز فقط مختص نوشیدن قهوه بودند، که ناشی از عواملی مانند بو و طعم خاص این نوشیدنی، یا تاثیر روانی مرتبط با مصرف آن نوشیدنی بود.</p>
                </section>

                <div className={styles.contents}>
                    <div className={styles.icons}>
                        <Link href={'/'}><FaTelegram /></Link>
                        <Link href={'/'}><FaLinkedinIn /></Link>
                        <Link href={'/'}><FaPinterest /></Link>
                        <Link href={'/'}><FaTwitter /></Link>
                        <Link href={'/'}><FaFacebookF /></Link>
                    </div>
                    <div className={styles.more_articles}>
                        <div className={styles.prev_article} >
                            <Link href={'/article/134'} className={styles.icon}>
                                <FaAngleLeft />
                            </Link>
                            <div>
                                <p>قدیمی تر</p>
                                <Link href={'/article/134'}>مصرف قهوه با شیر برای کاهش التهاب</Link>
                            </div>

                        </div>
                        <Link className={styles.link} href={'/articles'}><IoGridOutline /></Link>

                        <div className={styles.next_article}>
                            <Link href={'/article/134'} className={styles.icon}>
                                <FaAngleRight />
                            </Link>
                            <div>
                                <p>جدید تر</p>
                                <Link href={'/article/134'}>کاهش افسردگی و اضطراب با قهوه</Link>
                            </div>


                        </div>
                    </div>
                </div>
    </>
  )
}

export default Details
