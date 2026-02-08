import { IToken } from "@types";
import { Schema, model } from "mongoose";

const tokenSchema = new Schema<IToken>(
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

const Token = model<IToken>("Token", tokenSchema, "tokens");
export default Token;
