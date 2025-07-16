import connectToDB from "@/configs/db";
import DiscountModel from "@/model/Discount";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { code, percent, maxUse } = await req.json();

    if (!code || !percent) {
      return NextResponse.json(
        { error: "Code and percent are required" },
        { status: 400 }
      );
    }

    await DiscountModel.create({
      code,
      percent,
      maxUse,
    });

    return NextResponse.json({
      message: "Discount created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create discount" },
      { status: 500 }
    );
  }
}
