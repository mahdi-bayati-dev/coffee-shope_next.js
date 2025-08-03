import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import CommentsModel from "@/model/Comments";
import { authAdmin } from "@/app/lib/authUser";

export async function PUT(req) {
  const admin=authAdmin()

    if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDB();

    const body = await req.json();
    const { id } = body;

    const updatedComment = await CommentsModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccess: true } },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json({ message: "کامنت پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "کامنت با موفقیت تایید شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: "خطا در بروزرسانی کامنت" },
      { status: 500 }
    );
  }
}
