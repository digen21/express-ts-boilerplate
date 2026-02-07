import { model, Schema } from "mongoose";

import { IVehicle } from "@types";

const VehicleSchema = new Schema<IVehicle>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    regNumber: { type: String, required: true, unique: true, uppercase: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

const Vehicle = model<IVehicle>("Vehicle", VehicleSchema, "vehicles");

export default Vehicle;
