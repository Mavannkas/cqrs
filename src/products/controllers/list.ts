import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Product } from "../model";

const MIN_LIMIT = 1;
const MIN_OFFSET = 0;
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export const listSchema = Joi.object({
  limit: Joi.number().min(MIN_LIMIT).default(DEFAULT_LIMIT),
  offset: Joi.number().min(MIN_OFFSET).default(DEFAULT_OFFSET),
});

export async function listHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Casted because Joi changes the type of the query object
    const { limit, offset } = req.query as unknown as Record<string, number>;
    const result = await Product.find().limit(limit).skip(offset);

    res.json(result);
  } catch (err) {
    next(err);
  }
}
