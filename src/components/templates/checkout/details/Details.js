"use client"
import stateData from '@/utils/stateData';
import styles from './details.module.css'
import Select from 'react-select';
import { useEffect, useState } from 'react';

const stateOptions = stateData()
const Details = () => {
    const [stateSelectedOption, setStateSelectedOption] = useState(null); 
    const [citySelectedOption, setCitySelectedOption] = useState(null);
    const [citySelectorDisabel,setCitySelectorDisabel]=useState(true)
    const [cityOption, setCityOption] = useState([]);

    useEffect(() => {
        setCitySelectedOption(null) 
        if (stateSelectedOption?.value) {
            const city =
                stateSelectedOption?.value.map(data => {
                    return {
                        value: data,
                        label: data
                    }
                })
            setCityOption(city)
            setCitySelectorDisabel(false) 
        }

    }, [stateSelectedOption])

    return (
        <div className={styles.details}>
            <p className={styles.details_title}>جزئیات صورتحساب</p>

            <form className={styles.form}>
                <div className={styles.groups}>
                    <div className={styles.group}>
                        <label>نام خانوادگی <span>*</span></label>
                        <input type="text" />
                    </div>
                    <div className={styles.group}>
                        <label>نام <span>*</span></label>
                        <input type="text" />
                    </div>
                </div>
                <div className={styles.group}>
                    <label>نام شرکت (اختیاری)</label>
                    <input type="text" />
                </div>
                <div className={styles.group}>
                    <label>استان<span>*</span></label>
                    <Select
                        defaultValue={stateSelectedOption}
                        onChange={setStateSelectedOption}
                        isClearable={true}
                        placeholder={''}
                        isRtl={true}
                        isSearchable={true}
                        options={stateOptions}
                    />
                </div>
                <div className={styles.group}>
                    <label>شهر<span>*</span></label>
                    <Select
                        defaultValue={citySelectedOption}
                        onChange={setCitySelectedOption }
                        isDisabled={citySelectorDisabel}
                        isClearable={true} 
                        isRtl={true}
                        isSearchable={true} 
                        options={cityOption}
                        placeholder={''}
                    />
                </div>
                <div className={styles.group}>
                    <label>آدرس خیابان<span>*</span></label>
                    <input type="text" />
                </div>
                <div className={styles.group}>
                    <label>کدپستی (بدون فاصله)<span>*</span></label>
                    <input type="text" />
                </div>
                <div className={styles.group}>
                    <label>شماره موبایل  <span>*</span></label>
                    <input type="text" />
                </div>

                <div className={styles.group}>
                    <label>ایمیل <span>*</span></label>
                    <input type="text" />
                </div>
                <div className={styles.create_account}>
                    <h5>ایجاد حساب کاربری</h5>
                    <section>
                        <div className={styles.group}>
                            <label>رمزعبور (اختیاری)</label>
                            <input placeholder='رمز عبور' type="text" />
                        </div>
                        <button>شماره موبایل را تایید کنید</button>
                    </section>
                </div> 
                <div className={styles.destination}>
                    <label>توضیحات سفارش (اختیاری)  </label>
                    <textarea cols="30" rows="8" placeholder='اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید'></textarea>
                </div>
            </form>
        </div>
    )
}

export default Details
