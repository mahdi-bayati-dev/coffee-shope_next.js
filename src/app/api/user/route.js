import connectToDB from "@/configs/db";
import UserModel from "@/model/User";
import { authUser } from "@/app/lib/authUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser(); // اطمینان از پارامت
    console.log(user);
    

    if (!user) {
      return NextResponse.json({ message: "احراز هویت انجام نشد" }, { status: 401 });
    }
    console.log("authUser:", user);


    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ message: "تمام فیلدها الزامی هستند" }, { status: 400 });
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
    return NextResponse.json({ message: err.message || "خطا در سرور" }, { status: 500 });
  }
}
