import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { redis } from "@config";
import { loadFromDB } from "@service";
import { IRole, IUser, Permissions } from "@types";
import { ServerError } from "@utils";

const sanitizeArray = <T>(arr: (T | null | undefined)[]) =>
  arr?.filter(Boolean);

const hasAccess =
  (permission: Permissions) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const role = user.role as IRole;

    const redisKey = `role:${role._id}:permissions`;

    let permissions;

    const cached = await redis.get(redisKey);
    if (cached) {
      permissions = sanitizeArray(JSON.parse(cached));
    }

    if (!permissions || permissions.length === 0) {
      const dbPermissions = await loadFromDB(role._id); // must return string[]
      console.log("dbPermissions :: ", dbPermissions);

      if (!dbPermissions.length) {
        throw new ServerError({
          message: "Forbidden",
          status: httpStatus.FORBIDDEN,
          success: false,
        });
      }

      permissions = dbPermissions;
      await redis.set(redisKey, JSON.stringify(permissions));
    }

    if (!permissions.includes(permission)) {
      throw new ServerError({
        message: "Forbidden",
        status: httpStatus.FORBIDDEN,
        success: false,
      });
    }

    next();
  };

export default hasAccess;
