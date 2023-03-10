import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGOOSE_URI || "mongodb://localhost:27017/mydb";

if (!uri) {
  throw new Error("MONGOOSE_URI environment variable not set");
}

export async function mongoDBConnect() {
  try {
    await mongoose.connect(uri, { maxPoolSize: 10 });
    console.log("**** Successfully connected to Database (-_-) ****");
  } catch (error) {
    console.error({ message: "Failed to connect to MongoDB (<>X<>)", error });
    throw new Error("Failed to connect to MongoDB");
  }
}
