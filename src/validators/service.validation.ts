import Joi from "joi";
import joiObjectId from "joi-objectid";

const JoiObjectId = joiObjectId(Joi);

export const createServiceSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    currencyCode: Joi.string().length(3).uppercase().required(),
    isAvailable: Joi.boolean().optional(),
  }),
});

export const updateServiceSchema = Joi.object({
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    isActive: Joi.boolean().optional(),
    currencyCode: Joi.string().length(3).uppercase().optional(),
    isAvailable: Joi.boolean().optional(),
  }),
});

export const getServicesQuerySchema = Joi.object({
  query: Joi.object({
    // pagination
    take: Joi.number().integer().min(1).max(100).default(20),
    skip: Joi.number().integer().min(0).default(0),

    // sorting
    sortBy: Joi.string()
      .valid("createdAt", "price", "name")
      .default("createdAt"),
    order: Joi.string().valid("asc", "desc").default("desc"),

    // filters (dynamic but controlled)
    name: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    currencyCode: Joi.string().length(3).uppercase(),
    isAvailable: Joi.boolean().optional(),
  }).unknown(false),
});

const idParam = Joi.object({
  id: JoiObjectId().required(),
});

export const deleteServiceSchema = Joi.object({
  params: idParam,
});

export const getServiceSchema = Joi.object({
  params: idParam,
});
