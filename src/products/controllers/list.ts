import { Request, Response } from "express";
import Joi from "joi";

export const listSchema = Joi.object({
    limit: Joi.number().min(0).required(),
    offset: Joi.number().min(0).required(),
})

export async function listHandler(req: Request, res: Response) {
    res.send("Listing all items");
}