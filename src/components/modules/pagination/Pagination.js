import styles from './pagination.module.css'
import { MdChevronLeft,MdChevronRight  } from 'react-icons/md'

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <ul>
        <MdChevronRight />
        <li className={styles.active}>1</li>
        <li>2</li>
        <li>3</li>
        <MdChevronLeft /> 
      </ul>
    </div>
  )
}

export default Pagination
 