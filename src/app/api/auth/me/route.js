import { cookies } from "next/headers";
import UserModel from "../../../../model/User";
import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // اتصال به دیتابیس
    await connectToDB();

    // دریافت توکن از کوکی‌ها
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // بررسی وجود توکن
    if (!token) {
      return NextResponse.json(
        { message: "لطفاً ابتدا وارد شوید" },
        { status: 401 }
      );
    }

    // اعتبارسنجی توکن
    const tokenPayload = verifyAccessToken(token);
    if (!tokenPayload || !tokenPayload.email) {
      return NextResponse.json(
        { message: "توکن نامعتبر است" },
        { status: 401 }
      );
    }

    // جستجوی کاربر در دیتابیس
    const user = await UserModel.findOne(
      { email: tokenPayload.email },
      "-__v -password"
    );

    // بررسی وجود کاربر
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    // پاسخ موفق
    return NextResponse.json(
      { data: { user }, message: "اطلاعات کاربر با موفقیت دریافت شد" },
      { status: 200 }
    );
  } catch (error) {
    // مدیریت خطاها
    console.error("Error in GET /api/user:", error);
    return NextResponse.json(
      { message: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
