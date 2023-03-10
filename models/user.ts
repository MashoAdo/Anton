import mongoose from "mongoose";
import { UserInterface } from "../interface";

const { Schema } = mongoose;

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
