import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  products: {
    type: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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

export const Order = mongoose.model("Order", orderSchema);
