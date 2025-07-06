import WishlistModel from "@/model/Wishlist";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // اتصال به پایگاه داده
    await connectToDB();

    // خواندن بدنه درخواست
    const body = await req.json();
    const { user, product } = body;

    if (!user || !product) {
      return NextResponse.json(
        { error: "User and product IDs are required" },
        { status: 400 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(product)
    ) {
      return NextResponse.json(
        { error: "Invalid user or product ID" },
        { status: 400 }
      );
    }

    await WishlistModel.create({ user, product });

    console.log("User ID:", user);
    console.log("Product ID:", product);

    return NextResponse.json(
      { message: "Product added to wishlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    // مدیریت خطای تکراری (duplicate key)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Product already exists in wishlist" },
        { status: 409 } // Conflict
      );
    }

    // مدیریت خطاهای عمومی
    return NextResponse.json(
      { error: "Failed to add product to wishlist", details: error.message },
      { status: 500 }
    );
  }
}

