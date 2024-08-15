import { Request, Response } from "express";
import Joi from "joi";

export const sellSchema = Joi.object({
})

export async function sellHandler(req: Request, res: Response) {
    res.send("Sell item");
}