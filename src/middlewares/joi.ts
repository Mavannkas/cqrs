import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateRequest(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req.method === "GET" ? req.query : req.body;

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((x) => x.message) });
    }

    if (req.method === "GET") {
      req.query = value;
    } else {
      req.body = value;
    }

    next();
  };
}