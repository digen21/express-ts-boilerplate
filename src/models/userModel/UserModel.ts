import { Schema, model } from "mongoose";

import { IUser } from "@types";
import Role from "@models/role.model";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: "string",
      trim: true, // will remove white space
      index: true,
    },
    name: {
      type: "string",
      trim: true, // will remove white space
      index: true,
    },
    email: {
      type: "string",
      required: true,
      index: { unique: true },
    },
    phoneNumber: {
      type: "string",
      index: true,
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
      index: true,
    },
    provider: {
      type: "string",
      required: true,
      default: "local",
      index: true,
    },
    providerId: {
      type: "string",
      index: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      index: true, // Existing index
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Compound index for common queries (isActive and isVerified)
UserSchema.index({ isActive: 1, isVerified: 1 });

UserSchema.pre("save", async function () {
  if (!this.isModified("role")) return;

  const role = await Role.findOne({ _id: this.role });
  if (!role) {
    throw new Error("Invalid role");
  }

  this.role = role._id;
});

export default model<IUser>("User", UserSchema, "users");
