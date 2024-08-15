import { Request, Response } from "express";
import Joi from 'joi';

export const orderSchema = Joi.object({
})

export async function orderHandler(req: Request, res: Response) {
    res.send("Create new order");
}