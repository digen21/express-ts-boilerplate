import { model, Schema } from "mongoose";

import { IRole, Roles } from "@types";

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Roles,
      required: true,
      unique: true,
      uppercase: true,
    },
    permissions: [
      { type: Schema.Types.ObjectId, ref: "Permission", required: true },
    ],
  },
  { timestamps: true },
);

const Role = model<IRole>("Role", RoleSchema, "roles");

export default Role;
