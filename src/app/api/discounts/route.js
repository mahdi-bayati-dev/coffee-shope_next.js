import connectToDB from "@/configs/db";
import DiscountModel from "@/model/Discount";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { code, percent, maxUse } = body;

    // Validation can be added here

    await DiscountModel.create({ code, percent, maxUse });

    return NextResponse.json(
      { message: "Discount code created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
