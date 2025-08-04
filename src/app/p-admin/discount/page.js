export const dynamic = "force-dynamic";

import Table from "@/components/templates/p-admin/discounts/Table";
// import Layout from "@/components/layouts/AdminPanelLayout";
import connectToDB from "@/configs/db";
import DiscountModel from "@/model/Discount";
import AddDiscounts from "@/components/templates/p-admin/discounts/addDiscounts";
import styles from "@/components/templates/p-admin/discounts/table.module.css";

const Discounts = async () => {
  connectToDB();
  const discounts = await DiscountModel.find({}).lean();


  
  

  return (
    // <Layout>
      <main>
        <AddDiscounts />

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    // </Layout>
  );
};

export default Discounts;
