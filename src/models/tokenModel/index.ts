import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: "string",
      trim: true,
      required: true,
    },
    type: {
      type: "string",
      trim: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceRequest",
    },
  },
  { timestamps: true },
);

export default model("token", tokenSchema);
