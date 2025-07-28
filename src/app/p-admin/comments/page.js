import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import Table from "@/components/templates/p-admin/comments/Table";
import connectToDB from "@/configs/db";
import CommentModel from "@/model/Comments"
import ProductModel from '@/model/Product'

const page = async () => {
  await connectToDB();
  const comments = await CommentModel.find({})
    .sort({ _id: -1 })
    // .populate("user")
    .populate("ProductId")
    .lean();
    
    

  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
