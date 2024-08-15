import { Request, Response } from "express";
import Joi from "joi";

export const restockSchema = Joi.object({
})

export async function restockHandler(req: Request, res: Response) {
    res.send("Restock item");
}