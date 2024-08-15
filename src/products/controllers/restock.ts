import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Product } from "../model";
import { NotFoundException } from "../../exceptions/notFoundException";
import { object } from "joi";
import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/badRequestException";
import {
  createRestockProductCommand,
  RestockProductCommandData,
} from "../commands/restock";

export const restockSchema = Joi.object({
  amount: Joi.number().min(0).required(),
});

export async function restockHandler(
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
