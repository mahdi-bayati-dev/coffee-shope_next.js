import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Filtering from "@/components/templates/category/filtering/Filtering"
import Products from "@/components/templates/category/products/Products"
import styles from '@/styles/category.module.css'


const page = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb route={'فروشگاه'} />
            <main className={styles.container} data-aos="fade-up">
                <div className={styles.category}>
                    <Products />
                    <Filtering />
                </div>
            </main> 
            <Footer />
        </>
    )
}

export default page
