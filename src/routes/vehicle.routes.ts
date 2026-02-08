import { Router } from "express";

import {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
} from "@controllers";
import { hasAccess, validate } from "@middlewares";
import { Permissions } from "@types";
import {
  createVehicleSchema,
  getVehicleByIdSchema,
  getVehicleQuerySchema,
  updateVehicleQuerySchema,
} from "@validators";

const vehicleRouter = Router();

vehicleRouter.post(
  "/",
  hasAccess(Permissions.VEHICLE_CREATE),
  validate(createVehicleSchema),
  createVehicle,
);

vehicleRouter.get(
  "/:id",
  hasAccess(Permissions.VEHICLE_READ),
  validate(getVehicleByIdSchema),
  getVehicle,
);

vehicleRouter.get(
  "/",
  hasAccess(Permissions.VEHICLE_READ),
  validate(getVehicleQuerySchema),
  getVehicles,
);

vehicleRouter.put(
  "/:id",
  hasAccess(Permissions.VEHICLE_UPDATE),
  validate(updateVehicleQuerySchema),
  updateVehicle,
);

export default vehicleRouter;
