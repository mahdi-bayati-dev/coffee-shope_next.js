export const dynamic = "force-dynamic";

import React from "react";
// import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";

import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";

import TicketModel from "@/model/Ticket";
import UserModel from "@/model/User";
import ProductModel from "@/model/Product";
import connectToDB from "@/configs/db";

async function AdminHomePage() {
  connectToDB();
  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

  return (
    // <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value="333" />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart/>
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart/>
          </section>
        </div>
      </main>
    // </AdminPanelLayout>
  );
}

export default AdminHomePage;
