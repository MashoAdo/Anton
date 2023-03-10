import { Router, Request, Response } from "express";
import { SUCCESS_MESSAGE } from "../config/api-response";
const router = Router();

import LoginTask from "../Tasks/login";

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `User details with id ${req.params.id}` });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await new LoginTask().run({ email, password });
    res.status(201).json({ success: true, success_message: SUCCESS_MESSAGE.USER_LOGGED_IN, token });
  } catch (error) {
    res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.FAILED_LOGGED_IN });
  }

  res.status(200).json({ message: "User logged in" }).end();
});

router.post("/register", (req: Request, res: Response) => {
  const req_body = req.body;
  console.log({ req_body });

  res.status(200).json({ message: "User registered" });
});

export default router;
