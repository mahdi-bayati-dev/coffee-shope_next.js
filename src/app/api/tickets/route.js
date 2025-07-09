import connectToDB from "@/configs/db";
import { authUser } from "@/app/lib/authUser";
import TicketModel from "@/model/Ticket";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    // Validation (You)

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user.id,
    });

    return Response.json(
      { message: "Ticket saved successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
