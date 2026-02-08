import { ServiceRequestStatus } from "@types";
import Joi from "joi";
import joiObjectId from "joi-objectid";

const JoiObjectId = joiObjectId(Joi);

export const createServiceRequestValidator = Joi.object({
  body: Joi.object({
    vehicle: JoiObjectId().required(),
    service: JoiObjectId().required(),
    customer: JoiObjectId().optional(), // required when staff creates
  }),
  params: Joi.object({}),
});

export const getServiceRequestsValidator = Joi.object({
  query: Joi.object({
    take: Joi.number().integer().min(1).max(50).default(20),
    skip: Joi.number().integer().min(0).default(0),
  }),
  params: Joi.object({}),
});

export const getServiceRequestValidator = Joi.object({
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
});

export const updateServiceStatusValidator = Joi.object({
  body: Joi.object({
    status: Joi.string()
      .valid(...Object.values(ServiceRequestStatus))
      .required(),
    staffId: JoiObjectId().optional(),
  }),
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
});

export const deleteServiceRequestValidator = Joi.object({
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
});
