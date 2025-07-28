"use client"
import styles from './products.module.css'
import { MdOutlineClose, MdOutlineGridView } from 'react-icons/md'
import { BiSolidGrid } from 'react-icons/bi'
import { TfiLayoutGrid4Alt } from 'react-icons/tfi'
import Card from '@/components/modules/card/Card' 
import Pagination from '@/components/modules/pagination/Pagination'

const Products = () => { 
    return (
        <div className={styles.products}>
            <div className={styles.filtering}>
                <div className={styles.view}>
                    <TfiLayoutGrid4Alt />
                    <BiSolidGrid  className={styles.active} />
                    <MdOutlineGridView  />
                </div>
                <select name="orderby">
                    <option value="default">مرتب‌سازی پیش‌فرض</option>
                    <option value="popularity">مرتب‌سازی بر اساس محبوبیت</option>
                    <option value="rating">مرتب‌سازی بر اساس امتیاز</option>
                    <option value="last_products">مرتب‌سازی بر اساس آخرین</option>
                    <option value="Inexpensive">مرتب‌سازی بر اساس ارزانترین</option>
                    <option value="expensive">مرتب‌سازی بر اساس گرانترین</option>
                </select>
            </div>
            <div className={styles.available_filters}>
                <div>
                <p>clear filters</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
                <div>
                    <p>اسپرسو ساز خانگی (ریز)</p>
                    <MdOutlineClose />
                </div>
            </div>
            <main className={styles.main}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> 
                <Card />
                <Card />
                <Card />
            </main>
            <Pagination />
        </div>
    )
}

export default Products
