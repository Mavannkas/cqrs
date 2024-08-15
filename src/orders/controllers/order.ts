import { Request, Response } from "express";
import Joi from "joi";

export const orderSchema = Joi.object({
  customerId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required().min(1),
      })
    )
    .required()
    .min(1),
});

export async function orderHandler(req: Request, res: Response) {
  res.send("Create new order");
}
