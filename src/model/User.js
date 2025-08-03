import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "/images/avatar.png",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "USER",
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", schema);
export default User;
