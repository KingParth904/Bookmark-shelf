import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_passkey } from "./extras/passwords";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const userMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }


  try {
    const decoded = jwt.verify(token, jwt_passkey) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
