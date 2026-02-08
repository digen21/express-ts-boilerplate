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
    vehicleNo: { type: String, required: true, uppercase: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // STAFF or ADMIN
    },
  },
  { timestamps: true },
);

VehicleSchema.index({ customer: 1, vehicleNo: 1 }, { unique: true });

const Vehicle = model<IVehicle>("Vehicle", VehicleSchema, "vehicles");

export default Vehicle;
