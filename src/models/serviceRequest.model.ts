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
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    requestSentAt: { type: Date },
    requestConfirmedAt: { type: Date },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // optional
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    lastUpdatedAt: { type: Date },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const ServiceRequest = model<IServiceRequest>(
  "ServiceRequest",
  ServiceRequestSchema,
  "serviceRequests",
);
