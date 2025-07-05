import { cookies } from "next/headers";
import UserModel from "../../model/User";
import { verifyAccessToken } from "@/utils/auth";

export async function authUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  const tokenPayload = verifyAccessToken(token);

  if (tokenPayload) {
    const foundUser = await UserModel.findOne({ email: tokenPayload.email });
    user = foundUser
      ? {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        }
      : null;
  }

  return user;
}
