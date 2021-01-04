import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export default function (req: any, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const token: any = authHeader.split(" ")[1];

      const decoded_token: any = jwt.verify(
        token,
        process.env.SECRET || "secret"
      );
      if (decoded_token) {
        req.userId = decoded_token.userId;
        next();
      } else {
        const error: any = new Error("Unauthorized User!");
        error.statusCode = 401;
        throw error;
      }
    } else {
      const error: any = new Error("Unauthorized User!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
