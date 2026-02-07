import { model, Schema } from "mongoose";

import { IServiceRequest, ServiceRequestStatus } from "@types";

const ServiceRequestSchema = new Schema<IServiceRequest>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },
    assignedStaff: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ServiceRequestStatus,
      required: true,
      default: ServiceRequestStatus.PENDING,
    },
  },
  { timestamps: true },
);

export const ServiceRequest = model<IServiceRequest>(
  "ServiceRequest",
  ServiceRequestSchema,
  "serviceRequests",
);
