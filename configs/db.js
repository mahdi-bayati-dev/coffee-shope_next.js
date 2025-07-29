import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    console.log("🔄 Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "coffe-next",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      ssl: true, // اگر به Atlas وصل می‌شی لازمه
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error); // لاگ کامل
    throw error;
  }
};

export default connectToDB;
