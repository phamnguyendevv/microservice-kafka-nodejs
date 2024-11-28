import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  theFunc: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export default asyncHandler;
