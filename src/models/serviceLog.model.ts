import { model, Schema } from "mongoose";
import { IServiceLog } from "@types";

const ServiceLogSchema = new Schema<IServiceLog>(
  {
    serviceRequest: {
      type: Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
      index: true,
    },
    action: { type: String, required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const ServiceLog = model<IServiceLog>(
  "ServiceLog",
  ServiceLogSchema,
  "serviceLogs",
);

export default ServiceLog;
