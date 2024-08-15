import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({});

export const order = mongoose.model("Order", orderSchema);