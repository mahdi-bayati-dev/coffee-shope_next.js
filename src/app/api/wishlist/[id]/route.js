import { authUser } from "@/app/lib/authUser";
import WishlistModel from "@/model/Wishlist";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const result = await WishlistModel.findOneAndDelete({
      user: user.id,
      product: productId,
    });

    if (!result) {
      return NextResponse.json(
        { message: "محصول در لیست علاقه‌مندی‌ها یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "محصول با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    return NextResponse.json(
      {
        error: "Failed to remove product from wishlist",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
