import { TaskInterface, UserInterface } from "../interface";
import User from "../models/user";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { TOKEN_EXPIRY } from "../config/constants";
import env from "../config/env";

dotenv.config();

export default class LoginTask implements TaskInterface {
  public async run({ email, password }: UserInterface) {
    const user = await this.extraValidate({ email, password });

    const secret = env.jwtAccessSecret!;

    const token = jwt.sign({ email, password }, secret, { expiresIn: TOKEN_EXPIRY });

    await new User(user).save();

    return token;
  }

  private async extraValidate({ password, email }: UserInterface): Promise<UserInterface> {
    const user = new User({ email, password });

    // validate payload
    await user.validate();

    //check if user exists in db
    const found_user = await User.findOne({ email });

    if (!found_user) {
      throw new Error("User does not exist");
    }

    return found_user;
  }
}
