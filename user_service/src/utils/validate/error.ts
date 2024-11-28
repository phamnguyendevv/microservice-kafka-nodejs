// utils/CustomError.ts
export interface CustomError extends Error {
  statusCode?: number; // Optional, since it may not be set on all errors
}

export default class ErrorHandler extends Error implements CustomError {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }
}
