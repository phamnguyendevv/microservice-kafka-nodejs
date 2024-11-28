import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import HTTP_STATUS from "../../constants/httpStatus";

const validate =
  (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const firstError = errors.array()[0];
    const message = firstError.msg; // Sửa lỗi ở đây
    const status = HTTP_STATUS.UNPROCESSABLE_ENTITY;

    res.status(status).json({ message, status });
  };

export default validate;
