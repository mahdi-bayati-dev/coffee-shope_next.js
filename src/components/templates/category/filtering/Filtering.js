"use client"
import styles from './filtering.module.css'
import MultiRangeSlider from '../multiRange/MultiRangeSlider';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Card from '../bestProducts/Card';
const Filtering = () => {
    const [minValue, setMinValue] = useState()
    const [maxValue, setMaxValue] = useState()

    const priceFilterHandler = () => {
        alert(maxValue)
    }
    return (
        <div className={styles.filtering}>
            <div className={styles.price_filtering}>
                <p>فیلتر بر اساس قیمت:</p>
                <div>
                    <MultiRangeSlider
                        min={140000}
                        max={6790000}
                        onChange={({ min, max }) => {
                            setMaxValue(max)
                            setMinValue(min)
                        }}
                    />
                    <button className={styles.filter_btn} onClick={priceFilterHandler}>فیلتر</button>
                </div>
            </div> 
            <div className={styles.name_filtering}>
                <p className={styles.title}>انتخاب قهوه بر اساس</p>
                <section>
                    <div className={styles.active}>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div className={styles.active}>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                    <div>
                        <p>اسپرسو ساز خانگی (ریز)</p>
                        <div>
                            20
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.star_filtering}>
                <p className={styles.title}>انتخاب بر اساس امتیاز</p>
                <section>
                    <div>
                        <div>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <span>(12)</span>
                    </div>
                    <div>
                        <div>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </div>
                        <span>(22)</span>
                    </div>
                </section>
            </div>

            <div className={styles.best_products}>
                <p className={styles.title}>برترین محصولات</p>
                <section>
                    <Card/>
                    <Card/>
                    <Card/> 
                </section>
            </div>
        </div>
    )
}

export default Filtering
