import connectToDB from "@/configs/db";
import ProductModel from "@/model/Product";
// import fs from "fs";
import { mkdir,writeFile } from "fs/promises";
import path from "path";

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
    const filename = Date.now() + img.name;

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const imgPath = path.join(uploadDir, filename);
    await writeFile(imgPath, buffer);

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      img: `http://localhost:3000/uploads/${filename}`,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
