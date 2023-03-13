import { Router, Request, Response } from "express";
import { SUCCESS_MESSAGE } from "../config/api-response";
const router = Router();

import LoginTask from "../Tasks/login";
import RegisterUserTask from "../Tasks/register-user";

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `User details with id ${req.params.id}` });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await new LoginTask().run({ email, password });

    res.status(201).json({ success: true, success_message: SUCCESS_MESSAGE.USER_LOGGED_IN, token });
  } catch (err) {
    //Type assertion
    const error = err as Error;
    console.log("Failed to login in ", error);

    res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.FAILED_LOGGED_IN, error: error.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const token = await new RegisterUserTask().run(payload);

    res.status(200).json({ success: true, success_message: SUCCESS_MESSAGE.USER_REGISTERED_SUCCESSFULLY, token });
  } catch (err) {
    //type assertion
    const error = err as Error;

    console.log("Error when registering a user:", error);
    res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.USER_REGISTRATION_FAILED, error });
  }
});

export default router;
