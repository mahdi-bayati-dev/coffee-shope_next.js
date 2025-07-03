import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  return await hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

const generateAccessToken = (data) => {
  return sign({ ...data }, process.env.ACCESS_TOKEN, { expiresIn: "60d" });
};
const verifyAccessToken = (token) => {
  if (!token) {
    console.log("No token provided");
    return false;
  }

  try {
    const tokenPayload = verify(token, process.env.ACCESS_TOKEN, {
      expiresIn: "60d",
    });
    return tokenPayload;
  } catch (error) {
    console.log("verify Access Token ===>", error);
    return false;
  }
};

const refreshAccessToken = (data) => {
  return sign({ ...data }, process.env.REFRESH_TOKEN);
};

const ValidationEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const ValidationPhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const ValidationPassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return pattern.test(password);
};

export {
  verifyPassword,
  hashPassword,
  generateAccessToken,
  verifyAccessToken,
  refreshAccessToken,
  ValidationEmail,
  ValidationPhone,
  ValidationPassword,
};
