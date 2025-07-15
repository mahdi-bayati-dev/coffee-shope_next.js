import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import CommentsModel from "@/model/Comments";

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;
    await CommentsModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccess: true } },
      { new: true }
    );
    return NextResponse.json(
      { message: "کامنت با موفقیت رد شد" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در بروزرسانی کامنت" },
      { status: 500 }
    );
  }
}
