import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/badRequestException";
import { createOrderCommand, OrderCommandData } from "../commands/order";
import { Product } from "../../products/model";

export const orderSchema = Joi.object({
  customerId: Joi.string()
    .required()
    .custom((value, helper) => {
      return isValidObjectId(value)
        ? value
        : helper.message({ custom: `Customer id "${value}" is not valid` });
    }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .required()
          .custom((value, helper) => {
            return isValidObjectId(value)
              ? value
              : helper.message({
                  custom: `Product id "${value}" is not valid`,
                });
          }),
        quantity: Joi.number().required().min(1),
      })
    )
    .required()
    .unique((a, b) => a.productId === b.productId, {})
    .message("Duplicate product ids are not allowed")
    .min(1),
});

async function validateProductOrders(input: OrderCommandData) {
  for (const productData of input.products) {
    console.log(productData);
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
