import { model, Schema } from "mongoose";

import { IPermission } from "@types";

const PermissionSchema = new Schema<IPermission>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Permission = model<IPermission>(
  "Permission",
  PermissionSchema,
  "permissions",
);

export default Permission;
