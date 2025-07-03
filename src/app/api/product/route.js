import connectToDB from "@/configs/db";
import ProductModel from "../../../../model/Products";
import  CommentsMOdel from "../../../../model/Comments";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();

    const {
      name,
      price,
      shortDiscretion,
      longDiscretion,
      weight,
      SuitableFor,
      smell,
      tag,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDiscretion,
      longDiscretion,
      weight,
      SuitableFor,
      smell,
      tag,
    });

    return NextResponse.json(
      { message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error", error:message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB(); // یادت نره در GET هم باید دیتابیس رو وصل کنی

    const products = await ProductModel.find({}).populate("Comments");

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error); // لاگ دقیق در ترمینال
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
