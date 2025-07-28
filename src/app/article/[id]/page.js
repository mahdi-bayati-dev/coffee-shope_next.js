'use client';
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Comment from "@/components/templates/article/comment/Comment";
import Details from "@/components/templates/article/details/Details";
import styles from '@/styles/article.module.css'


const page = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb route={'قهوه'} />
            <div className={styles.container}>
                <Details />
                <Comment />
            </div>

            <Footer />
        </>
    )
}

export default page
