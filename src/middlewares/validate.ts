import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";

const formatErrors = (details: Joi.ValidationErrorItem[]) =>
  details.map((d) => ({
    field: d.path.slice(1).join("."),
    message: d.message.replace(/"/g, ""),
  }));

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(
      { body: req.body, params: req.params, query: req.query },
      { abortEarly: false, stripUnknown: true },
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: formatErrors(error.details),
      });
    }

    Object.assign(req, value); // sanitized data
    next();
  };
};
