import { TaskInterface, UserInterface } from "../interface";
import User from "../models/user";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export default class LoginTask implements TaskInterface {
  public async run({ email, password }: UserInterface) {
    const user = await this.extraValidate({ email, password });

    const secret = process.env.ACCESS_TOKEN_SECRET!;

    const token = jwt.sign(user, secret);

    await new User(user).save();

    return token;
  }

  private async extraValidate({ password, email }: UserInterface): Promise<UserInterface> {
    const user = new User({ email, password });

    // validate payload
    await user.validate();

    //check if user exists in db
    User.findOne({ email }, (err: any, user: UserInterface) => {
      if (err) {
        throw new Error(err);
      }

      if (user) {
        console.log(`User exists email:`, email);
      } else {
        throw new Error("User does not exists");
      }
    });

    return user;
  }
}
