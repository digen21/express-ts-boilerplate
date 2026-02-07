import { Schema, model } from "mongoose";

import { IUser } from "@types";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: "string",
      trim: true, // will remove white space
    },
    name: {
      type: "string",
      trim: true, // will remove white space
    },
    email: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
    },
    avatar: {
      type: "string",
    },
    password: {
      type: "string",
      trim: true,
    },
    isVerified: {
      type: "boolean",
      default: false,
    },
    provider: {
      type: "string",
      required: true,
      default: "local",
    },
    providerId: {
      type: "string",
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserSchema, "users");
