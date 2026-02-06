import mongoose from "mongoose";

import { logger } from "@utils";
import { env } from "@config";

const { MONGODB_URI, MONGO_URI_TEST, isTest } = env;

const MONGO_URI = isTest ? MONGO_URI_TEST : MONGODB_URI;

export default () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        logger.info("Connected To Database...💾");
      })
      .catch((e) =>
        logger.error("Failed To Connect: ", {
          error: e,
          context: "Database connection",
        }),
      );
  } catch (error) {
    logger.error("Error Occurred While connecting database: ", { error });
    process.exit();
  }
};
