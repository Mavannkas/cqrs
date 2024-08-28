import { Router } from "express";
import { validateRequest } from "../middlewares/joi";
import { orderHandler, orderSchema } from "./controllers";

const router = Router();

router.post("/", validateRequest(orderSchema), orderHandler);

export default router;
