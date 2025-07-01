import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB ✅");
      return true;
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to MongoDB ✅");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB❌:", error);
    return false;
  }
};

export default connectToDB;
