import { authUser } from "@/app/lib/authUser";
import connectToDB from "@/configs/db";
import User from "@/model/User";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectToDB().catch((err) => {
      console.error("Database Connection Error:", err);
      throw new Error("خطا در اتصال به دیتابیس");
    });

    const user = await authUser().catch((err) => {
      console.error("Auth Error:", err);
      return null;
    });
    if (!user) {
      return NextResponse.json(
        { message: "احراز هویت انجام نشد" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const img = formData.get("img");

    if (!img || !img.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "فایل معتبر نیست" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: "حجم فایل بیش از حد مجاز است (حداکثر 10 مگابایت)" },
        { status: 400 }
      );
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "avatars" }, (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return reject(error);
          }
          resolve(result);
        })
        .end(buffer);
    });

    await User.findByIdAndUpdate(user.id, {
      $set: { avatar: result.secure_url },
    });

    return NextResponse.json({
      message: "عکس پروفایل آپلود شد",
      avatar: result.secure_url,
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { message: "خطا در سرور", error: err.message },
      { status: 500 }
    );
  }
}