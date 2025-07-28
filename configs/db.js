import mongoose from "mongoose";

const connectToDB = async () => {

  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "coffe-next",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectToDB;
