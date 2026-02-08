import { Schema, model } from "mongoose";

import { IUser } from "@types";
import Role from "@models/role.model";

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
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      index: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("role")) return;

  const role = await Role.findOne({ _id: this.role });
  if (!role) {
    throw new Error("Invalid role");
  }

  this.role = role._id;
});

export default model<IUser>("User", UserSchema, "users");
