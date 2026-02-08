import { Request, Response } from "express";
import httpStatus from "http-status";

import { vehicleManagementService } from "@service";
import { buildQuery, catchAsync } from "@utils";
import { redis } from "@config";

export const createService = catchAsync(async (req: Request, res: Response) => {
  const service = await vehicleManagementService.create(req.body);

  return res.status(httpStatus.CREATED).json({
    success: true,
    data: service,
  });
});

export const getServices = catchAsync(async (req: Request, res: Response) => {
  const { where, options } = buildQuery(req.query);

  if (where.name) {
    where.name = {
      $regex: `^${where.name}`,
      $options: "i",
    };
  }

  const services = await vehicleManagementService.find(
    where,
    { name: 1, price: 1, currencyCode: 1, isAvailable: 1 },
    options,
  );

  if (res.locals.cacheKey) {
    await redis.setex(
      res.locals.cacheKey,
      res.locals.cacheTTL,
      JSON.stringify(services),
    );
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: services,
  });
});

export const getService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const services = await vehicleManagementService.findById(id as string);

  return res.status(httpStatus.OK).json({
    success: true,
    data: services,
  });
});

export const updateService = catchAsync(async (req: Request, res: Response) => {
  const updatedVehicleManagement = await vehicleManagementService.update(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    },
  );

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Service updated",
    data: updatedVehicleManagement,
  });
});

export const deleteService = catchAsync(async (req: Request, res: Response) => {
  await vehicleManagementService.delete({ _id: req.params.id });

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Service deleted",
  });
});
