import {
  generateAccessToken,
  refreshAccessToken,
  ValidationEmail,
  ValidationPassword,
  verifyPassword,
} from "@/utils/auth";
import UserModel from "../../../../../model/User";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { email, password } = body;

  if (!ValidationEmail(email) || !ValidationPassword(password)) {
    return NextResponse.json(
      { message: " password not valid" },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "Email o is incorrect " },
      { status: 401 }
    );
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Email or password is incorrect" },
      { status: 401 }
    );
  }
  console.log("email:", email, ValidationEmail(email));
console.log("password:", password, ValidationPassword(password));


  const accessToken = generateAccessToken({ email, id: user._id });
  const refreshToken = refreshAccessToken({ email, id: user._id });

  const response = NextResponse.json(
    { message: "User logged in successfully" },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: accessToken,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  return response;
}
