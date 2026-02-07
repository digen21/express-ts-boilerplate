import { roleService } from "./base.service";

export async function loadFromDB(roleId: string): Promise<string[]> {
  const role = await roleService.findById(roleId);

  if (!role) return [];

  return role.permissions.map((p) => p.key) || [];
}
