import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { logger, ServerError } from "@utils";

const globalErrorHandler = (
  err: Error | ServerError,
  _req: Request, // underscore = intentionally unused
  res: Response,
  _next: NextFunction, // underscore = intentionally unused
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

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
    status: httpStatus.INTERNAL_SERVER_ERROR,
  });
};

export default globalErrorHandler;
