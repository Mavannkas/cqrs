import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import productsRoutes from "./products/routes";
import ordersRoutes from "./orders/routes";
import eventBus from "./middlewares/eventBus";
import { HttpException } from "./exceptions";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();

app.use(json());
mongoose.connect(MONGO_URI);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.eventBus = eventBus;
  next();
});

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return res.status(err.code).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
