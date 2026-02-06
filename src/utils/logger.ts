import { createLogger, format, transports, addColors } from "winston";
import "winston-daily-rotate-file";
import path from "path";
import util from "util";

import { env } from "@config";

const { combine, timestamp, json, printf, colorize, errors } = format;

const customColors = {
  info: "blue",
  error: "red",
  warn: "yellow",
  debug: "green",
};

addColors(customColors);

// Custom format for local development
const logFormat = printf(({ level, message, timestamp, context, ...meta }) => {
  const metaString =
    Object.keys(meta).length > 0
      ? ` ${util.inspect(meta, { depth: null, colors: false })}`
      : "";

  return `${timestamp} ${level.toUpperCase()}${
    context ? ` [${context}]` : ""
  } ${message}${metaString}`;
});

const logger = createLogger({
  level: env.isProd ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    env.isProd ? logFormat : combine(colorize({ all: true }), logFormat),
  ),
  transports: [new transports.Console()],
});

// Only add file transports in production to avoid cluttering local dev with files
if (env.isProd) {
  logger.add(
    new transports.DailyRotateFile({
      filename: path.join("logs", "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  );

  logger.add(
    new transports.DailyRotateFile({
      filename: path.join("logs", "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  );
}

export default logger;
