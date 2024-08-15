import { Router } from "express";
import { listHandler, listSchema } from "./controllers/list";
import { createHandler, createSchema } from "./controllers/create";
import { restockHandler, restockSchema } from "./controllers/restock";
import { sellHandler, sellSchema } from "./controllers/sell";
import { validateRequest } from "../middlewares/joi";

const router = Router();

router.get("/", validateRequest(listSchema), listHandler);
router.post("/", validateRequest(createSchema), createHandler);
router.get("/:id/restock", validateRequest(restockSchema), restockHandler);
router.put("/:id/sell", validateRequest(sellSchema), sellHandler);

export default router;
