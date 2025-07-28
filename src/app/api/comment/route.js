import { NextResponse } from "next/server";
import connectToDB from "@/configs/db"; // یادت نره اتصال به DB
import CommentModel from "../../../model/Comments";
import ProductModel from "../../../model/Product";

export async function POST(req) {
  try {
   

    const reqBody = await req.json(); // ✅

    const { userName, email, body, score, date, ProductId, user } = reqBody;

    const comment = await CommentModel.create({
      name: userName,
      email,
      body,
      score,
      date,
      ProductId,
      user,
    });

    await ProductModel.findByIdAndUpdate(
      ProductId,
      {
        $push: { Comments: comment._id },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Comment created successfully", data: comment },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST comment error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const comments = await CommentModel.find({}).populate("Product");

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("GET comment error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
