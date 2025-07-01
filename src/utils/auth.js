import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.ACCESS_TOKEN);
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.ACCESS_TOKEN);
    return tokenPayload;
  } catch (error) {
    console.log("verify Access Token ===>", error);
    return false;
  }
};

const refreshAccessToken = (data) => {
  const token = sign({ ...data }, process.env.REFRESH_TOKEN);
  return token;
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
