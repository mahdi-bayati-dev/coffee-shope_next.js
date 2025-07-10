import connectToDB from "@/configs/db";
import UserModel from "@/model/User";
import { authUser } from "@/app/lib/authUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser(); // اطمینان از پارامت

    if (!user) {
      return NextResponse.json(
        { message: "احراز هویت انجام نشد" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    await UserModel.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return NextResponse.json(
      { message: "اطلاعات با موفقیت ویرایش شد :))" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "خطا در سرور" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    await UserModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "کاربر با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در حذف کاربر", error: error.message },
      { status: 500 }
    );
  }
}
