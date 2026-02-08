import { model, Schema } from "mongoose";

import { IService } from "@types";

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true, // Index for name lookups
    },
    description: {
      type: String,
      index: true, // Index for text searches in description
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true, // Index for price range queries
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, // Index for filtering active/inactive services
    },
    currencyCode: {
      type: String,
      required: true,
      uppercase: true,
      index: true, // Index for currency code lookups
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true, // Index for filtering available services
    },
  },
  { timestamps: true },
);

// Compound indexes for common queries
ServiceSchema.index({ isActive: 1, isAvailable: 1 }); // For filtering active and available services
ServiceSchema.index({ price: 1, isActive: 1 }); // For price range queries on active services

const Service = model<IService>("Service", ServiceSchema, "services");

export default Service;
