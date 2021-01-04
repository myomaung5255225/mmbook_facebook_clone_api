import { Request, Response, NextFunction } from "express";

export default function (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { data, message } = error;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ data, message });
  next();
}
