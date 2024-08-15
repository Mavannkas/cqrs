import { Router } from "express";
import { validateRequest } from "../middlewares/joi";
import { orderHandler, orderSchema } from "./controllers/order";

const router = Router();

router.post("/", validateRequest(orderSchema), orderHandler);

export default router;
