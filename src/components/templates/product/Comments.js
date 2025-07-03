import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({productId, comments }) => {
  console.log(comments);
  
  return (
    <>
      {" "}
      <div>
        <p>نظرات ({comments.length}) :</p>
        <hr />

        <main className={styles.comments}>
          <div className={styles.user_comments}>
            <p className={styles.title}>
              7 دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD
              ) ده -10- عددی
            </p>
            {comments.map((comment) => (
             comment.isAccess && <Comment key={comment._id} comments={comment} />

            ))}
          </div>
          <div className={styles.form_bg}>
            <CommentForm ProductId={productId} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Comments;
