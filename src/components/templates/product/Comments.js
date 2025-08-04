"use client";
import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ productId, comments, userId, productName }) => {
  
  return (
    <div className={styles.container}>
      <p className={styles.commentsCount}>
        نظرات ({comments.filter((c) => c.isAccess).length}) :
      </p>
      <hr className={styles.divider} />
      <main className={styles.comments}>
        <div className={styles.formBg}>
          <CommentForm productId={productId} userId={userId} />
        </div>
        <div className={styles.userComments}>
          <p className={styles.title}>دیدگاه‌ها برای {productName}</p>
          {comments.map(
            (comment) =>
              comment.isAccess && (
                <Comment key={comment._id} comments={comment} />
              )
          )}
        </div>
      </main>
    </div>
  );
};

export default Comments;
