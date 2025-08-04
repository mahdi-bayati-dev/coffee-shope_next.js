import DataTable from "@/components/templates/p-user/comments/DataTable";
// import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import CommentModel from "@/model/Comments";
import { authUser } from "@/app/lib/authUser";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import ProductModel from "@/model/Product";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  

  let userId = user.id;

  const comments = await CommentModel.find({ user: userId }, "-__v").populate(
    "productId",
    "name"
  );
  // console.log('==>',comments);

  const testComments = await CommentModel.find({ user: userId });

  

  return (
    // <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        )}
      </main>
    // </Layout>
  );
};

export default page;
