import { model, Schema } from "mongoose";

import { IServiceLog, ServiceRequestStatus } from "@types";

const ServiceLogSchema = new Schema<IServiceLog>(
  {
    serviceRequest: {
      type: Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true, // Index for action lookups
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for performer lookups
    },
    fromStatus: {
      type: String,
      enum: ServiceRequestStatus,
      index: true, // Index for status transitions
    },
    toStatus: {
      type: String,
      enum: ServiceRequestStatus,
      index: true, // Index for status transitions
    },
  },
  { timestamps: true },
);

// Compound indexes for common queries
ServiceLogSchema.index({ serviceRequest: 1, createdAt: -1 }); // For logs by service request sorted by date
ServiceLogSchema.index({ performedBy: 1, createdAt: -1 }); // For logs by performer sorted by date
ServiceLogSchema.index({ action: 1, createdAt: -1 }); // For logs by action sorted by date
ServiceLogSchema.index({ fromStatus: 1, toStatus: 1 }); // For status transition analysis

const ServiceLog = model<IServiceLog>(
  "ServiceLog",
  ServiceLogSchema,
  "serviceLogs",
);

export default ServiceLog;
