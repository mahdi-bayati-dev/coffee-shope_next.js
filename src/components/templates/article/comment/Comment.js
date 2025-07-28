import styles from './comment.module.css'

const Comment = () => {
  return (
    <div className={styles.comment}>
      <p className={styles.title}>دیدگاهتان را بنویسید</p>
      <p>نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند <span>*</span></p>
      <div className={styles.group}>
        <label>دیدگاه <span>*</span></label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div className={styles.groups}>
      <div className={styles.group}>
        <label>وب‌سایت</label>
      <input type="text" />
      </div>
      <div className={styles.group}>
        <label>ایمیل <span>*</span></label>
      <input type="email" />
      </div>
     <div className={styles.group}>
        <label>دیدگاه <span>*</span></label>
      <input type="text" />
      </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" />
    <p> ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.</p>
      </div>
      <button>ارسال دیدگاه</button>
    </div>
  )
}

export default Comment
