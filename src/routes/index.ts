import express, { Express } from "express";

import { confirmServiceRequest } from "@controllers";
import { isAuth } from "@middlewares";
import authRouter from "./auth.routes";
import serviceRouter from "./service.routes";
import serviceRequestRouter from "./serviceRequest.routes";
import userRouter from "./user.routes";
import vehicleRouter from "./vehicle.routes";

const API_PREFIX = "/api";

const useRouter = (app: Express) => {
  const apiRouter = express.Router();

  apiRouter.get("/service-requests/confirm", confirmServiceRequest);
  apiRouter.use("/auth", authRouter);
  apiRouter.use("/users", isAuth, userRouter);
  apiRouter.use("/services", isAuth, serviceRouter);
  apiRouter.use("/vehicles", isAuth, vehicleRouter);
  apiRouter.use("/service-requests", isAuth, serviceRequestRouter);

  app.use(API_PREFIX, apiRouter);
};

export default useRouter;
