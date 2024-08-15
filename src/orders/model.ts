import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  products: {
    type: [
      {
        productID: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const order = mongoose.model("Order", orderSchema);
