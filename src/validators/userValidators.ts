import { Roles } from "@types";
import { PASSWORD_REGEX, PHONE_REGEX } from "@utils";
import Joi from "joi";

export const updateUserValidator = Joi.object({
  body: Joi.object({
    username: Joi.string().trim().min(3).max(30).optional(),
    name: Joi.string().trim().min(1).max(50).optional(),
    phoneNumber: Joi.string().pattern(PHONE_REGEX).optional(),
    bio: Joi.string().max(500).optional(),
    avatar: Joi.string().uri().optional(),
    city: Joi.string().max(50).optional(),
    country: Joi.string().max(50).optional(),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(PASSWORD_REGEX, "password")
      .optional(),
    role: Joi.string()
      .valid(...Object.values(Roles))
      .optional()
      .default(Roles.CUSTOMER),
    // Note: email, isVerified, provider, providerId are not allowed to be updated via this endpoint
  }),
});
