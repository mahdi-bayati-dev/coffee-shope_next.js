"use client"
import { useState } from 'react'
import styles from './order.module.css'
import Link from 'next/link'

const Order = () => {
    const [showZarinPallAlert, setShowZarinPallAlert] = useState(false)
    return (
        <div className={styles.order}>
            <p className={styles.title}>سفارش شما</p>
            <main className={styles.main}>
                <div>
                    <p>جمع جزء</p>
                    <p>محصول</p>
                </div>
                <div>
                    <p>205,000 تومان</p>
                    <p className={styles.product_name}>کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( RED ) 10 عددی LIMITED EDITION - Ethiopia Natural ( اتیوپی )  × 1</p>
                </div>
                <div>
                    <p>205,000 تومان</p>
                    <p>جمع جزء</p>
                </div>
                <div>
                    <p>پیک موتوری: <strong> 30,000 تومان</strong></p>
                    <p>حمل و نقل</p>
                </div>
                <div>
                    <div>
                        <h2>235,000 تومان</h2>
                        <p>(شامل <strong>16,927</strong> تومان ارزش افزوده)</p>
                    </div>
                    <h3>مجموع</h3>
                </div>
            </main>
            <div className={styles.transaction}>
                <div>
                    <input onClick={() => setShowZarinPallAlert(false)} type="radio" name="payment_method" value="melli" />
                    <label> بانک ملی</label>
                    <img width={24} height={40} src="https://set-coffee.com/wp-content/plugins/WooCommerce-melli/images/logo.png" alt="بانک ملی"></img>
                </div>
                <div>
                    <input onClick={() => setShowZarinPallAlert(true)} type="radio" name="payment_method" value="zarinpal" />
                    <label>پرداخت امن زرین پال </label>
                    <img width={40} height={40} src="https://set-coffee.com/wp-content/plugins/zarinpal-woocommerce-payment-gateway/assets/images/logo.png" alt="زرین پال"></img>
                </div>
                {showZarinPallAlert && (
                    <div className={styles.paymentBox}>
                        <p>پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین پال</p>
                    </div>
                )}
                <div className={styles.warning}>
                    <p>اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این وبسایت و برای اهداف دیگری که در <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده می‌شود.</p>
                </div>
                <div className={styles.accept_rules}>
                    <input type="checkbox" name="" id="" />
                    <p> من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می پذیرم. <span>*</span></p>
                </div>
                <Link href={'/complate-order'}> <button className={styles.submit}>ثبت سفارش</button> </Link> 
            </div>

        </div>
    )
}

export default Order
