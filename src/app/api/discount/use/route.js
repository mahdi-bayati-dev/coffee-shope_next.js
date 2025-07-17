import connectToDB from "@/configs/db";
import DiscountModel from "@/model/Discount";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { code } = body;

    const discount = await DiscountModel.findOne({ code });

    if (!discount) {
      return NextResponse.json({ message: "کد تخفیف یافت نشد" }, { status: 404 });
    }

    if (discount.uses === discount.maxUse) {
      return NextResponse.json({ message: "سقف استفاده از کد تخفیف پر شده" }, { status: 422 });
    }

    return NextResponse.json({ message: "کد معتبر است" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در بررسی کد", error: error.message },
      { status: 500 }
    );
  }
}
