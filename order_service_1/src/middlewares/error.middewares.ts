import { ErrorHandler, CustomError } from "../utils/error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
    status: err.statusCode || 500,
  });
};

export default errorMiddleware;
