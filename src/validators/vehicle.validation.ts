import Joi from "joi";

import joiObjectId from "joi-objectid";

const JoiObjectId = joiObjectId(Joi);

export const createVehicleSchema = Joi.object({
  body: Joi.object({
    customerId: JoiObjectId().required(),
    vehicleNo: Joi.string().trim().required(),
    model: Joi.string().required(),
    type: Joi.string().required(),
  }),
});

export const getVehicleQuerySchema = Joi.object({
  query: Joi.object({
    id: Joi.string().optional(),
    take: Joi.number().integer().min(1).max(50).default(20),
    skip: Joi.number().integer().min(0).default(0),
    customerId: JoiObjectId().optional(), // staff use-case
    vehicleNo: Joi.string().trim(),
    model: Joi.string(),
    type: Joi.string(),
  }),
});

export const updateVehicleQuerySchema = Joi.object({
  body: Joi.object({
    vehicleNo: Joi.string().trim(),
    model: Joi.string(),
    type: Joi.string(),
  }),
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
});

export const getVehicleByIdSchema = Joi.object({
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
});
