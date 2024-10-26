import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";



// Định nghĩa middleware xử lý lỗi
export const HandleErrorWithLogger: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  // Xử lý các lỗi đã biết
  [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      data = error.message;
    }
  });

  if (reportError) {
    // Ghi lại lỗi
    logger.error(error);
    // Trả về phản hồi lỗi
    res.status(status).json({ message: data });
  } else {
    logger.warn(error); // Ghi lại các lỗi không nghiêm trọng
    // Trả về phản hồi lỗi cho người dùng
    res.status(status).json({ message: data });
  }

  // Không cần trả về gì, chỉ cần dừng tại đây
};


export const HandleUnCaughtException = async (error: Error) => {
  // error report / monitoring tools
  logger.error(error);
  // recover
  process.exit(1);
};
