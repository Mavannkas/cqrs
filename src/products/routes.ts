import { Router } from "express";

import { validateRequest } from "../middlewares/joi";
import {
  createHandler,
  createSchema,
  listHandler,
  listSchema,
  restockHandler,
  restockSchema,
  sellHandler,
  sellSchema,
} from "./controllers";

const router = Router();

router.get("/", validateRequest(listSchema), listHandler);
router.post("/", validateRequest(createSchema), createHandler);
router.post("/:id/restock", validateRequest(restockSchema), restockHandler);
router.post("/:id/sell", validateRequest(sellSchema), sellHandler);

export default router;
