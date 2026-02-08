import { model, Schema } from "mongoose";

import { IVehicle } from "@types";

const VehicleSchema = new Schema<IVehicle>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    vehicleNo: {
      type: String,
      required: true,
      uppercase: true,
    },
    model: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // STAFF or ADMIN
      index: true,
    },
  },
  { timestamps: true },
);

// Compound index for common queries
VehicleSchema.index({ customer: 1, vehicleNo: 1 }, { unique: true });
VehicleSchema.index({ customer: 1, createdAt: -1 }); // For getting customer vehicles sorted by date
VehicleSchema.index({ type: 1, createdAt: -1 }); // For getting vehicles by type sorted by date

const Vehicle = model<IVehicle>("Vehicle", VehicleSchema, "vehicles");

export default Vehicle;
