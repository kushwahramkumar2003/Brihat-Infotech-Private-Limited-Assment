import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
    console.log("[db]: Database connected");
  } catch (error) {
    console.log("[db]: Database could not connect");
    process.exit(1);
  }
};

export default connectDB;
