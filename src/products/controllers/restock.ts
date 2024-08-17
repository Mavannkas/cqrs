import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  createRestockProductCommand,
  RestockProductCommandData,
} from "../commands";
import { tryToGetProductById } from "../utils";

const MIN_AMOUNT = 0;

export const restockSchema = Joi.object({
  amount: Joi.number().min(MIN_AMOUNT).required(),
});

export async function restockHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await tryToGetProductById(id);

    const input: RestockProductCommandData = {
      productId: id,
      amount: req.body.amount,
    };

    req.eventBus.send(createRestockProductCommand(input));

    res.status(202).json({ message: "Product restocking was initiated" });
  } catch (err) {
    next(err);
  }
}
