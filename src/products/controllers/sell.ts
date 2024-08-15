import { Request, Response } from "express";
import Joi from "joi";

export const sellSchema = Joi.object({
    amount: Joi.number().min(0).required(),
})

export async function sellHandler(req: Request, res: Response) {
    res.send("Sell item");
}