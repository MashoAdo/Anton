import { NextFunction, Request, Response } from "express";

export default function Logger(req: Request, res: Response, next: NextFunction) {
  const time_now = new Date().toLocaleTimeString();
  const date_today = new Date().toLocaleDateString();

  console.log(`${date_today} : ${time_now} : ${req.method} : ${req.originalUrl}`);

  next();
}
