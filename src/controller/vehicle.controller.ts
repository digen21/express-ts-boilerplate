import { Request, Response } from "express";
import httpStatus from "http-status";

import { vehicleService } from "@service";
import { IUser, Roles } from "@types";
import { catchAsync } from "@utils";

export const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const vehicle = await vehicleService.create({
    ...req.body,
    customer: req.body.customerId, // staff can create for user
    createdBy: user._id,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    data: vehicle,
    status: httpStatus.CREATED,
  });
});

export const getVehicle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const vehicle = await vehicleService.findOne(
    { _id: id },
    {},
    {
      populate: [
        {
          path: "customer",
          select: "name email phone",
        },
        {
          path: "createdBy",
          select: "name email",
        },
      ],
    },
  );

  return res.status(httpStatus.OK).json({
    success: true,
    data: vehicle,
    status: httpStatus.OK,
  });
});

export const getVehicles = catchAsync(async (req, res) => {
  const { role, id: userId } = req.user as IUser;
  const { take, skip, sortBy, order, ...filters } = req.query;

  const where: any = {};
  if (role === Roles.CUSTOMER) where.customer = userId;

  Object.assign(where, filters); // only allowed filters

  const vehicles = await vehicleService.find(req.query, null, {
    populate: [
      {
        path: "customer",
        select: "name email phone",
      },
      {
        path: "createdBy",
        select: "name email",
      },
    ],
    limit: Number(take) || 20,
    skip: Number(skip) || 0,
    sort: { createdAt: -1 },
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: vehicles,
    status: httpStatus.OK,
  });
});

export const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const vehicle = await vehicleService.update({ _id: id }, req.body, {
    new: true,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: vehicle,
    status: httpStatus.OK,
  });
});
