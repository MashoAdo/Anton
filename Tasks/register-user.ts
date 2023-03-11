import { TaskInterface, UserInterface } from "../interface";
import User from "../models/user";
import jwt from "jsonwebtoken";

export default class RegisterUserTask implements TaskInterface {
  public async run(payload: UserInterface) {
    const { name, email, password } = payload;

    const user = new User({ name, email, password });

    user.save({ timestamps: true, validateBeforeSave: true }).then((user) => {
      if (!user) {
        throw new Error("Failed to save user");
      }
    });

    const secret = process.env.ACCESS_TOKEN_SECRET!;

    try {
      const token = jwt.sign({ email, password }, secret, { expiresIn: "20s" });
      return token;
    } catch (err) {
      // type assertion
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
