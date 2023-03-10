import { Router, Request, Response } from "express";
const router = Router();

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: `User details with id ${req.params.id}` });
});

router.post("/login", (req: Request, res: Response) => {
  const req_body = req.body;
  console.log({ req_body });

  res.status(200).json({ message: "User logged in" });
});

router.post("/register", (req: Request, res: Response) => {
  const req_body = req.body;
  console.log({ req_body });

  res.status(200).json({ message: "User registered" });
});

export default router;
