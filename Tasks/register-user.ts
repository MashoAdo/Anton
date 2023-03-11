import { TaskInterface, UserInterface } from "../interface";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { TOKEN_EXPIRY } from "../config/constants";
import env from "../config/env";

export default class RegisterUserTask implements TaskInterface {
  public async run(payload: UserInterface) {
    const { name, email, password } = payload;

    const user = new User({ name, email, password });

    user.save({ timestamps: true, validateBeforeSave: true }).then((user) => {
      if (!user) {
        throw new Error("Failed to save user");
      }
    });

    const secret = env.jwtAccessSecret.secret!;

    try {
      const token = jwt.sign({ email, password }, secret, { expiresIn: TOKEN_EXPIRY });
      return token;
    } catch (err) {
      // type assertion
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
