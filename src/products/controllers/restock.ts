import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Product } from "../model";
import { NotFoundException } from "../../exceptions/notFoundException";
import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/badRequestException";
import {
  createRestockProductCommand,
  RestockProductCommandData,
} from "../commands/restock";
import { tryToGetProductById } from "../utils";

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
