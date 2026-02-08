import { Router } from "express";

import {
  confirmServiceRequest,
  createServiceRequest,
  deleteServiceRequest,
  getServiceRequest,
  getServiceRequests,
  updateServiceStatus,
} from "@controllers";
import { hasAccess, validate } from "@middlewares";
import { Permissions } from "@types";
import {
  createServiceRequestValidator,
  deleteServiceRequestValidator,
  getServiceRequestsValidator,
  getServiceRequestValidator,
  updateServiceStatusValidator,
} from "@validators";

const serviceRequestRouter = Router();

serviceRequestRouter.post(
  "/",
  hasAccess(Permissions.SERVICE_REQUEST_CREATE),
  validate(createServiceRequestValidator),
  createServiceRequest,
);

serviceRequestRouter.get(
  "/",
  hasAccess(Permissions.SERVICE_REQUEST_READ),
  validate(getServiceRequestsValidator),
  getServiceRequests,
);

serviceRequestRouter.get(
  "/:id",
  hasAccess(Permissions.SERVICE_REQUEST_READ),
  validate(getServiceRequestValidator),
  getServiceRequest,
);

serviceRequestRouter.patch(
  "/:id/status",
  hasAccess(Permissions.SERVICE_REQUEST_UPDATE),
  validate(updateServiceStatusValidator),
  updateServiceStatus,
);

serviceRequestRouter.delete(
  "/:id",
  hasAccess(Permissions.SERVICE_REQUEST_DELETE),
  validate(deleteServiceRequestValidator),
  deleteServiceRequest,
);

export default serviceRequestRouter;
