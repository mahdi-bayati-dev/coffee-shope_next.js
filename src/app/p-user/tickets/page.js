import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/app/lib/authUser";
import TicketModel from "@/model/Ticket";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user.id }).populate(
    "department",
    "title"
  );

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
