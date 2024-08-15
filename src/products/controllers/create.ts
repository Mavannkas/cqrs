import { Request, Response } from "express";
import Joi from 'joi';

export const createSchema = Joi.object({
    name: Joi.string()
        .max(50)
        .required(),
    description: Joi.string()
        .max(50)
        .required(),
    price: Joi.number()
        .min(0)
        .required(),
    stock: Joi.number()
        .min(0)
        .required(),
})

export async function createHandler(req: Request, res: Response) {
    res.send("Creating a new item");
}