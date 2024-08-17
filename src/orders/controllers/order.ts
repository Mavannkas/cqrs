import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestException } from "../../exceptions";
import { createOrderCommand, OrderCommandData } from "../commands";
import { Product } from "../../products/model";

const MIN_QUANTITY = 1;
const MIN_PRODUCTS = 1;
const MAX_ID_LENGTH = 24;

export const orderSchema = Joi.object({
  customerId: Joi.string().hex().length(MAX_ID_LENGTH).required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(MAX_ID_LENGTH).required(),
        quantity: Joi.number().required().min(MIN_QUANTITY),
      })
    )
    .required()
    .unique((a, b) => a.productId === b.productId, {})
    .message("Duplicate product ids are not allowed")
    .min(MIN_PRODUCTS),
});

async function validateProductOrders(input: OrderCommandData) {
  for (const productData of input.products) {
    const product = await Product.findById(productData.productId);

    if ((product?.stock ?? 0) < productData.quantity) {
      throw new BadRequestException(
        `Not enough stock for product with id ${productData.productId}`
      );
    }
  }
}

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

    await validateProductOrders(input);
    req.eventBus.send(createOrderCommand(input));

    res.status(202).json({ message: "Order creation was initiated" });
  } catch (err) {
    next(err);
  }
}
