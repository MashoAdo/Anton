import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { AuthenticatedRequest } from "../interface";

async function AuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const auth_header = req.headers.authorization;
  const token = auth_header?.split(" ")[1];

  if (!token) {
    res.status(401).send("Client unauthorized");
    return;
  }

  const secret = env.jwtAccessSecret!;

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    console.log("Request Authorized");
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
}

export default AuthMiddleware;
