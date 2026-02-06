import compression from "compression";
import cors from "cors";
import express from "express";

import { env } from "@config";
import {
  connectToDatabase,
  globalErrorHandler,
  googleAuth,
  passportAuth,
  requestLogger,
} from "@middlewares";
import useRouter from "@routes";
import { logger } from "@utils";

const app = express();
const { PORT } = env;

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
