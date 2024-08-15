import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Product } from "../model";

export const listSchema = Joi.object({
  limit: Joi.number().min(1).default(10),
  offset: Joi.number().min(0).default(0),
});

export async function listHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Product.find({
      limit: req.query.limit,
      offset: req.query.offset,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
