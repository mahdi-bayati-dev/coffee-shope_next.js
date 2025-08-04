import WishlistModel from "@/model/Wishlist";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { authUser } from "@/app/lib/authUser";

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

export async function GET(req) {
  try {
    await connectToDB();

    // دریافت کاربر از session یا توکن
    const user = await authUser(); // این تابع باید کاربر را بر اساس کوکی یا توکن برگرداند

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // واکشی wishlist کاربر
    const wishes = await WishlistModel.find({ user: user.id })
      .populate("product", "name price score img") // فیلدهایی که لازم داری
      .sort({ _id: -1 })
      .lean();

    return NextResponse.json({ wishes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist", details: error.message },
      { status: 500 }
    );
  }
}
