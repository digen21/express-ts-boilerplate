import Joi from "joi";
import joiObjectId from "joi-objectid";

const JoiObjectId = joiObjectId(Joi);

export const updateUserValidator = Joi.object({
  body: Joi.object({
    username: Joi.string().trim().min(3).max(30).optional(),
    name: Joi.string().trim().min(1).max(50).optional(),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional(),
    bio: Joi.string().max(500).optional(),
    avatar: Joi.string().uri().optional(),
    city: Joi.string().max(50).optional(),
    country: Joi.string().max(50).optional(),
    password: Joi.string().min(6).optional(),
    // Note: email, isVerified, provider, providerId are not allowed to be updated via this endpoint
  }),
});
