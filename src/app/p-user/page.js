import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/app/lib/authUser";
import TicketModel from "@/model/Ticket";
import WishlistMOdel from "@/model/Wishlist";
import CommentsModel from "@/model/Comments";
const page = async () => {
  const user = await authUser();
  const allTickets = await TicketModel.find({ user: user.id })
  const allWishList = await WishlistMOdel.find({ user: user.id })
  const allComments = await CommentsModel.find({ user: user.id })
  
  const tickets = await TicketModel.find({ user: user.id })
    .populate("department", "title")
    .limit(3)
    .lean()
    .sort({_id:-1})
  console.log(tickets);

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={allComments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={allWishList.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
