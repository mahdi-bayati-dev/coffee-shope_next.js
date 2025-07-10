import connectToDB from "@/configs/db";
import BanModel from "@/model/Ban";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectToDB();
  const body = await req.json();
  const { email, phone } = body;

  await BanModel.create({ email, phone });
  return NextResponse.json({ message: "add to user Ban" });
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در افزودن کاربر به لیست مسدود شده", message: error.message },
      { status: 500 }
    );
    
  }
}
