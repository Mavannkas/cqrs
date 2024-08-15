import { Request, Response } from "express";
import Joi from 'joi';
import { createProductCommand } from "../commands/create";

export const createSchema = Joi.object({
})

export async function createHandler(req: Request, res: Response) {
    res.send("Creating a new item");
}