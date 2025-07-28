'use client';
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Pagination from "@/components/modules/pagination/Pagination";
import Card from "@/components/templates/articles/card/Card";
import styles from '@/styles/articles.module.css'



const page = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb route={'اخبار و مقالات'} />
            <main className={styles.container}>
                <div className={styles.articles}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Pagination />
            </main>

            <Footer />
        </>
    )
}

export default page
