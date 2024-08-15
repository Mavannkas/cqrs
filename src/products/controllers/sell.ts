import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/badRequestException";
import { NotFoundException } from "../../exceptions/notFoundException";
import { Product } from "../model";
import {
  createSellProductCommand,
  SellProductCommandData,
} from "../commands/sell";

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
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid product id");
    }
    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

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
