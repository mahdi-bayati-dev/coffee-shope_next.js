import connectToDB from "@/configs/db";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { id } = body;

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });
    }

    const newRole = user.role === "USER" ? "ADMIN" : "USER";
    await UserModel.findByIdAndUpdate(id, { role: newRole });

    return NextResponse.json(
      { message: "نقش کاربر با موفقیت تغییر کرد", role: newRole },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در تغییر نقش کاربر", message: error.message },
      { status: 500 }
    );
  }
}
