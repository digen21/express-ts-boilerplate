import { logger, ServerError } from "@utils";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: Error | ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error("Error : ", {
    context: "Global Error Handler",
    error: err,
  });

  if (err instanceof ServerError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message, status: err.status });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error", status: 500 });
};

export default globalErrorHandler;
