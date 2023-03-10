import { Request, Response, NextFunction } from "express";

export default async function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token) {
    console.log("Client authorized");
    next();
  }
  res.status(401).send("Client unauthorized");
  throw new Error("Client unauthorized");
}
