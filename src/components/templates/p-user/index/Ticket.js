import Link from "next/link";
import styles from "./ticket.module.css";

const Ticket = ({title , createdAt ,department ,hasAnswer}) => {
  return (
    <Link href={`/p-user/tickets/answer/2323`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString('fa-IR')}</p>
        <p className={styles.no_answer}>{hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
