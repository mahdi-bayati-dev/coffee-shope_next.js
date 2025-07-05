import connectToDB from "@/configs/db";
import UserModel from "../../../../model/User"; // Ensure this path is correct
import { hashPassword, generateAccessToken } from "@/utils/auth";

// Define role constants
const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse request body
    const body = await req.json();
    const { name, password, email, phone } = body;

    // Validate input
    if (!name || !password || !email || !phone) {
      return Response.json(
        { message: "Name, password, email, and phone are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const isUserExist = await UserModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });

    if (isUserExist) {
      return Response.json(
        { message: "User already exists!" },
        { status: 422 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password); // Ensure hashPassword is async if using bcrypt

    // Generate access token
    const accessToken = generateAccessToken({ name, phone });

    // Check existing users to determine role
    const users = await UserModel.find({});
    const role = users.length > 0 ? ROLES.USER : ROLES.ADMIN;

    // Create new user
    await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Return success response with token
    return Response.json(
      { message: "User created successfully", accessToken },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/register:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}