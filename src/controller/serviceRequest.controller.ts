import { Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

import { handleServiceRequestStateTransition } from "@fsm/serviceRequest.fsm";
import tokenModel from "@models/tokenModel";
import { serviceRequestService } from "@service";
import { IRole, IUser, Roles, ServiceRequestStatus } from "@types";
import { catchAsync, logger, ServerError } from "@utils";
import { sendServiceRequestConfirmationMail } from "src/middlewares/transporter";

const getServiceRequestPopulateOptions = [
  { path: "vehicle", select: "vehicleNo model type" },
  { path: "service", select: "name price currencyCode" },
  { path: "assignedStaff", select: "name email" },
  { path: "customer", select: "name email" },
];

export const createServiceRequest = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const role = user.role as IRole;

    const customerId =
      role.name === Roles.CUSTOMER ? user._id : req.body.customer;

    if (!customerId)
      throw new ServerError({
        message: "Customer required",
        status: httpStatus.BAD_REQUEST,
      });

    const request = await serviceRequestService.create({
      vehicle: req.body.vehicle, // ID
      service: req.body.service, // ID
      customer: customerId,
      createdBy: role.name !== Roles.CUSTOMER ? user._id : undefined,
      status: ServiceRequestStatus.PENDING,
    });

    try {
      await sendServiceRequestConfirmationMail(
        user,
        request._id as Types.ObjectId,
      );
    } catch (error) {
      logger.error("Failed to send service request confirmation mail: ", {
        context: "sendServiceRequestConfirmationMail",
        error,
      });
    }

    return res
      .status(httpStatus.CREATED)
      .json({ success: true, data: request, status: httpStatus.CREATED });
  },
);

export const getServiceRequests = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const role = user.role as IRole;
    const where: any = {};

    if (role.name === Roles.CUSTOMER) {
      where.customer = user._id;
    }

    const requests = await serviceRequestService.find(where, null, {
      sort: { createdAt: -1 },
      limit: Number(req.query.take) || 20,
      skip: Number(req.query.skip) || 0,
    });

    res
      .status(httpStatus.OK)
      .json({ success: true, data: requests, status: httpStatus.OK });
  },
);

export const updateServiceStatus = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const role = user.role as IRole;
    const { status: nextStatus, staffId } = req.body;

    const request = await serviceRequestService.findOne({ _id: req.params.id });
    if (!request) {
      throw new ServerError({
        message: "Not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    const { status, assignedStaff, lastUpdatedAt, updatedBy } =
      handleServiceRequestStateTransition({
        currentStatus: request.status,
        nextStatus,
        role: role.name,
        actorId: user._id,
        staffId,
        currentAssignedStaff: request.assignedStaff,
        requestConfirmedAt: request.requestConfirmedAt,
        requestSentAt: request.requestSentAt,
      });

    const updatedService = await serviceRequestService.update(
      { _id: request._id },
      {
        status,
        assignedStaff,
        lastUpdatedAt,
        updatedBy,
      },
      {
        new: true,
        populate: getServiceRequestPopulateOptions,
      },
    );

    return res.status(httpStatus.OK).json({
      success: true,
      data: updatedService,
      status: httpStatus.OK,
    });
  },
);

export const deleteServiceRequest = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;

    const request = await serviceRequestService.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!request)
      throw new ServerError({
        message: "Not found",
        status: httpStatus.NOT_FOUND,
      });

    if (request.status !== ServiceRequestStatus.PENDING)
      throw new ServerError({
        message: "Cannot delete after work started",
        status: httpStatus.FORBIDDEN,
      });

    await serviceRequestService.update(
      { _id: request._id },
      { isDeleted: true, deletedAt: new Date(), deletedBy: user._id },
    );

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Request deleted",
      status: httpStatus.OK,
    });
  },
);

export const getServiceRequest = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const role = user.role as IRole;

    const where: any = { _id: req.params.id, isDeleted: false };
    if (role.name === Roles.CUSTOMER) where.customer = user._id;

    const request = await serviceRequestService.findOne(where, null, {
      populate: getServiceRequestPopulateOptions,
    });

    if (!request)
      throw new ServerError({
        message: "Not found",
        status: httpStatus.NOT_FOUND,
      });

    res.status(httpStatus.OK).json({ success: true, data: request });
  },
);

export const confirmServiceRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { token } = req.query as { token: string };

    const tokenDoc = await tokenModel.findOne({
      token,
      type: "SERVICE_REQUEST_CONFIRM",
    });

    if (!tokenDoc || (tokenDoc.expiresAt && tokenDoc.expiresAt < new Date())) {
      throw new ServerError({
        message: "Invalid or expired token",
        status: httpStatus.BAD_REQUEST,
      });
    }

    await serviceRequestService.update(
      { _id: tokenDoc.referenceId },
      {
        status: ServiceRequestStatus.ACCEPTED,
        requestConfirmedAt: new Date(),
      },
    );

    await tokenModel.deleteOne({ _id: tokenDoc._id });

    res.json({ success: true, message: "Service request confirmed" });
  },
);
