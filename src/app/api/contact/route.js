import connectToDB from "@/configs/db";
import ContactModel from "@/model/Contact";

import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, name, company, phone, message } = body;
    if (!email || !name || !phone || !message) {
      return NextResponse.json({ message: "filed nit found" }, { status: 400 });
    }
    const contact = await ContactModel.create({
      email,
      name,
      company,
      phone,
      message,
    });
    return NextResponse.json(
      { message: "Contact created successfully", data: contact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
