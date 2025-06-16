import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌿 MongoDB database connected successfully.");
  } catch (error) {
    console.log(`❌ MongoDB database Failed to connect: ${error}`);
    process.exit(1); // exit with failure
  }
};
