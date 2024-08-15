import { Router } from "express";
import { listHandler, listSchema } from "./controllers/list";
import { createHandler, createSchema } from "./controllers/create";
import { restockHandler, restockSchema } from "./controllers/restock";
import { sellHandler, sellSchema } from "./controllers/sell";
import { validateRequest } from "../middlewares/joi";

const router = Router();

router.get("/", validateRequest(listSchema), listHandler);
router.post("/", validateRequest(createSchema), createHandler);
router.post("/:id/restock", validateRequest(restockSchema), restockHandler);
router.post("/:id/sell", validateRequest(sellSchema), sellHandler);

export default router;
