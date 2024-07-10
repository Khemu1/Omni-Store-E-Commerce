import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState > 1) return;

  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/Omni_Store",
      {
        dbName: "Omni_Store",
      }
    );
    console.log("database connected");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
};

export { connectDb };
