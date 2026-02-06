import "dotenv/config";
import Joi from "joi";

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  JWT_TOKEN: Joi.string().required(),
  EXPIRY_TIME: Joi.string().default("10d"),
  MONGO_URI: Joi.string().uri().required(),
  MONGO_URI_TEST: Joi.string().uri().required(),
  GOOGLE_CLIENT_ID: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  GOOGLE_CLIENT_SECRET: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  GOOGLE_CALLBACK_URL: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  MAIL_HOST: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  MAIL_PASSWORD: Joi.when("NODE_ENV", {
    is: "test",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
  EMAIL_FROM: Joi.string(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const env = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGODB_URI: envVars.MONGO_URI,
  MONGO_URI_TEST: envVars.MONGO_URI_TEST,
  GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: envVars.SESSION_SECRET,
  GOOGLE_CALLBACK_URL: envVars.GOOGLE_CALLBACK_URL,
  isProd: envVars.NODE_ENV === "production",
  isDev: envVars.NODE_ENV === "development",
  isTest: envVars.NODE_ENV === "test",
  JWT_TOKEN: envVars.JWT_TOKEN,
  MAIL_HOST: envVars.MAIL_HOST,
  MAIL_PORT: envVars.MAIL_PORT,
  MAIL_USER: envVars.MAIL_USER,
  MAIL_PASSWORD: envVars.MAIL_PASSWORD,
  EMAIL_FROM: envVars.EMAIL_FROM || "no-reply@travel-buddy",
  EXPIRY_TIME: envVars.EXPIRY_TIME || "10d",
};

export default env;
