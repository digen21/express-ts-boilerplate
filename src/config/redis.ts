import Redis from "ioredis";
import env from "./envVariable";
import { logger } from "@utils";

const redis = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  // password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => logger.info("Redis connected"));
redis.on("error", (err) =>
  logger.error("Redis error", { context: "Redis", error: err }),
);

export default redis;
