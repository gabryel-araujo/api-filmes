import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

interface JwtPayload {
  id: number;
  email: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  const splitted = authHeader.split(" ");
  if (splitted.length !== 2)
    return res.status(401).json({ message: "Token inválido" });

  const token = splitted[1];

  try {
    const decoded = jwt.verify(token, config.secretKey) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
};

declare module "express" {
  export interface Request {
    userId?: number;
  }
}
