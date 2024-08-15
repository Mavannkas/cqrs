import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/badRequestException";
import { createOrderCommand, OrderCommandData } from "../commands/order";
import { Product } from "../../products/model";

export const orderSchema = Joi.object({
  customerId: Joi.string()
    .required()
    .custom((value) => {
      return isValidObjectId(value);
    }, "valid object id"),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .required()
          .custom((value) => {
            return isValidObjectId(value);
          }, "valid object id"),
        quantity: Joi.number().required().min(1),
      })
    )
    .required()
    .min(1),
});

export async function orderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input: OrderCommandData = {
      customerId: req.body.customerId,
      products: req.body.products,
    };

    for (const productData of input.products) {
      const product = await Product.findById(productData.productId);
      if (product?.stock ?? 0 < productData.quantity) {
        throw new BadRequestException(
          `Not enough stock for product with id ${productData.productId}`
        );
      }
    }
    req.eventBus.send(createOrderCommand(input));

    res.status(202).json({ message: "Order creation was initiated" });
  } catch (err) {
    next(err);
  }
}
