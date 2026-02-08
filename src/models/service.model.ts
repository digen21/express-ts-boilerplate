import { model, Schema } from "mongoose";

import { IService } from "@types";

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
    currencyCode: { type: String, required: true, uppercase: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Service = model<IService>("Service", ServiceSchema, "services");

export default Service;
