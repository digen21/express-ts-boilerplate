import { Router } from "express";

import {
  createService,
  getService,
  getServices,
  updateService,
} from "@controllers";
import { cacheByQuery, hasAccess, validate } from "@middlewares";
import { Permissions } from "@types";
import {
  createServiceSchema,
  getServiceSchema,
  getServicesQuerySchema,
  updateServiceSchema,
} from "@validators";

const serviceRouter = Router();

serviceRouter.get(
  "/:id",
  hasAccess(Permissions.SERVICE_READ),
  validate(getServiceSchema),
  getService,
);

serviceRouter.get(
  "/",
  hasAccess(Permissions.SERVICE_READ),
  validate(getServicesQuerySchema),
  cacheByQuery("service:search"),
  getServices,
);

serviceRouter.post(
  "/",
  hasAccess(Permissions.SERVICE_CREATE),
  validate(createServiceSchema),
  createService,
);

serviceRouter.put(
  "/:id",
  hasAccess(Permissions.SERVICE_UPDATE),
  validate(updateServiceSchema),
  updateService,
);

export default serviceRouter;
