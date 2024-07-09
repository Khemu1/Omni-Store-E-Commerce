import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState > 1) return;

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI || "none", {
      dbName: "Omni_Store",
    });
    console.log("database connected");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
};

export  { connectDb };
