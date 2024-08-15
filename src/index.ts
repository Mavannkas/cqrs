import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import productsRoutes from "./products/routes";
import ordersRoutes from "./orders/routes";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();

app.use(json());
mongoose.connect(MONGO_URI);

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// Fall back to 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
