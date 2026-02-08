import { Types } from "mongoose";
import { roleService } from "./base.service";
import { IPermission } from "@types";

export async function loadFromDB(
  roleId: string | Types.ObjectId,
): Promise<string[]> {
  const role = await roleService.findById(
    roleId,
    { permissions: 1 },
    { populate: { path: "permissions", select: "key" } },
  );

  if (!role || !role.permissions) return [];

  return role.permissions.map((p) => p.key);
}
