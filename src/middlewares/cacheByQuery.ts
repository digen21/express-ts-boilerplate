import { NextFunction, Request, Response } from "express";

import { redis } from "@config";

const cacheByQuery =
  (prefix: string, ttl = 300) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const keyPart = req.query.name?.toString().toLowerCase();
    if (!keyPart) return next();

    const cacheKey = `${prefix}:${keyPart}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: JSON.parse(cached),
        source: "cache",
      });
    }

    res.locals.cacheKey = cacheKey;
    res.locals.cacheTTL = ttl;
    next();
  };

export default cacheByQuery;
