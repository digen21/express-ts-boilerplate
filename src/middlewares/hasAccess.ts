import { redis } from "@config";
import { loadFromDB } from "@service";
import { ServerError } from "@utils";

export const hasAccess = (permission: string) => async (req, _res, next) => {
  const { roleId } = req.user; // from JWT

  const key = `role:${roleId}:permissions`;
  let permissions = await redis.get(key);

  if (!permissions) {
    permissions = JSON.stringify(await loadFromDB(roleId)); // fallback once
    await redis.set(key, permissions);
  }

  if (!JSON.parse(permissions).includes(permission))
    throw new ServerError({ message: "Forbidden", status: 403 });

  next();
};


