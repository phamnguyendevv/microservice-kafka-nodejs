import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import {STATUS_CODES} from "./status-codes";

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
    const status = STATUS_CODES.NOT_FOUND;

    res.status(status).json({ message, status });
  };

export default validate;
