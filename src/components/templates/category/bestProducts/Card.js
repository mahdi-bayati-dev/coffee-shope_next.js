import Link from 'next/link'
import styles from './card.module.css'
import { FaRegStar, FaStar } from 'react-icons/fa'

const Card = () => {
    return (
        <div className={styles.card}>
            <img src="https://set-coffee.com/wp-content/uploads/2021/10/03.png" alt="" />
            <div>
                <Link href={'/product/123'}> کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( RED ) 10 عددی LIMITED EDITION </Link>
                <div className={styles.stars}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                </div>
                <span> 5890,000 تومان</span>
            </div>
        </div>
    )
}

export default Card
