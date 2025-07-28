"use client"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Stepper from "@/components/modules/stepper/Stepper"
import styles from '@/styles/checkout.module.css'
import { useState } from "react"
import Order from "@/components/templates/checkout/order/Order" 
import Details from "@/components/templates/checkout/details/Details"

const page = () => {
    const [showDiscountForm, setShowDiscountForm] = useState(false)
    return (
        <>
            <Navbar />
            <Stepper step="checkout" />
            <div className={styles.container} data-aos="fade-up">
                <section className={styles.discount}>
                    <div>
                        <p>کد تخفیف دارید؟</p>
                        <span onClick={() => setShowDiscountForm(true)}>برای نوشتن کد اینجا کلیک کنید</span>
                    </div>
                    {showDiscountForm && (
                        <div className={styles.discount_container}>
                                <p>اگر کد تخفیف دارید لطفا در باکس زیر بنویسید</p>
                                <div>
                                    <input type="text" placeholder="کد تخفیف" />
                                    <button>اعمال کوپن</button>
                                </div>
                        </div>
                    )}
                </section>
                <main className={styles.checkout}>
                        <Order />
                        <Details/>
                </main>
            </div>



            <Footer />
        </>
    )
}

export default page
