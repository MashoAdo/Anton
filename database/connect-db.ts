import mongoose from "mongoose";
import env from "../config/env";

const uri = env.mongoDBConfig.uri!;

export async function mongoDBConnect() {
  try {
    await mongoose.connect(uri, { maxPoolSize: 10 });
    console.log("**** Successfully connected to Database (-_-) ****");
  } catch (error) {
    console.error({ message: "Failed to connect to MongoDB (<>X<>)", error });
    throw new Error("Failed to connect to MongoDB");
  }
}
