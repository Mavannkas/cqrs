import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createProductCommand, ProductCommandData } from "../commands";

const MIN_PRICE = 0;
const MIN_STOCK = 0;
const MAX_LENGTH = 50;

export const createSchema = Joi.object({
  name: Joi.string().max(MAX_LENGTH).required(),
  description: Joi.string().max(MAX_LENGTH).required(),
  price: Joi.number().min(MIN_PRICE).required(),
  stock: Joi.number().min(MIN_STOCK).required(),
});

export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, price, stock } = req.body;
    const input: ProductCommandData = {
      name,
      description,
      price,
      stock,
    };

    req.eventBus.send(createProductCommand(input));

    res.status(202).json({ message: "Product creation was initiated" });
  } catch (err) {
    next(err);
  }
}
