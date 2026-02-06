import Joi from "joi";

export const registerValidator = Joi.object({
  body: Joi.object({
    username: Joi.string().trim().min(3).max(30).optional(),
    name: Joi.string().trim().min(1).max(50).optional(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional(), // basic phone validation
    bio: Joi.string().max(500).optional(),
    avatar: Joi.string().uri().optional(),
    city: Joi.string().max(50).optional(),
    country: Joi.string().max(50).optional(),
    password: Joi.string().min(6).required(),
  }),
});

export const loginValidator = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const verifyMailValidator = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
});

export const googleAuthValidator = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
});
