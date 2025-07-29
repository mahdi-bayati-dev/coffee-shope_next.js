import connectToDB from "@/configs/db";
import ProductModel from "@/model/Product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = JSON.parse(formData.get("tags"));
    const img = formData.get("img");

    if (!img) {
      return Response.json({ message: "تصویر ارسال نشده" }, { status: 400 });
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    console.log("Buffer size:", buffer.length);


    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      img: uploadResult.secure_url, // آدرس Cloudinary
    });

    return Response.json(
      { message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
