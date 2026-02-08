import compression from "compression";
import cors from "cors";
import express from "express";

import { connectToDatabase, env } from "@config";
import "@events";
import {
  generalLimiter,
  globalErrorHandler,
  googleAuth,
  passportAuth,
  requestLogger,
  useHelmet,
} from "@middlewares";
import useRouter from "@routes";
import { logger } from "@utils";

const app = express();
const { PORT } = env;

// Apply security headers
useHelmet(app);

// Apply general rate limiting to all requests
app.use(generalLimiter);

app.use(requestLogger);
app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  return res.send({
    status: "UP",
    code: 200,
  });
});

app.use(compression());

useRouter(app);

connectToDatabase();
passportAuth(app);
googleAuth(app);

app.use(globalErrorHandler);

app.listen(PORT, () =>
  logger.info(`Server Started On http://localhost:${PORT} 🚀`),
);
