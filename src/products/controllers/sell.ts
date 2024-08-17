import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createSellProductCommand, SellProductCommandData } from "../commands";
import { tryToGetProductById } from "../utils";

export const sellSchema = Joi.object({
  amount: Joi.number().min(0).required(),
});

export async function sellHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await tryToGetProductById(id);

    const input: SellProductCommandData = {
      productId: id,
      amount: req.body.amount,
    };

    req.eventBus.send(createSellProductCommand(input));

    res.status(202).json({ message: "Product selling was initiated" });
  } catch (err) {
    next(err);
  }
}
