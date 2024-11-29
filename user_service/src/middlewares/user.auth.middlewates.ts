import ErrorHandler from "../utils/validate/error";
import { Response, NextFunction } from "express";
import asyncHandler from "../utils/validate/handlers";
import { CustomRequest } from "../types/user.type";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { access_token } = req.headers;
    if (!access_token || typeof access_token !== "string") {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }
    const decodedData = jwt.verify(
      access_token,
      process.env.JWT_SECRET as string
    );
    req.user = decodedData;
    next();
  }
);

export const authorizeRoles = (roles: Number) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (roles !== req.user.role_id) {
      return next(
        new ErrorHandler(`User is not allowed to access this resouce `, 403)
      );
    }
    next();
  };
};
