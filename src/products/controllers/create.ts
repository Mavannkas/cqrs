import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createProductCommand, ProductCommandData } from "../commands/create";

export const createSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
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
