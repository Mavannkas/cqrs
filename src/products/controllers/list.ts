import { Request, Response } from "express";
import Joi from "joi";

export const listSchema = Joi.object({
})

export async function listHandler(req: Request, res: Response) {
    res.send("Listing all items");
}