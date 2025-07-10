import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import SubDepartmentModel from "@/model/SubDepartment";

export async function GET(request, { params }) {
  try {
    await connectToDB(); // ⬅️ اتصال به دیتابیس

    const id = params.id; // ⬅️ به هیچ وجه از optional chaining استفاده نکن
    

    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid" }, { status: 422 });
    }

    const subDepartments = await SubDepartmentModel.find({ department: id });
    return Response.json(subDepartments, { status: 200 });
  } catch (error) {
    console.error("Error in GET subDepartments:", error);
    return Response.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
