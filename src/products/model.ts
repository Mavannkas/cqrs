import mongoose from "mongoose";
// (fields: name, description, price,
// stock; all required, max length 50).
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },

});

export const Product = mongoose.model("Product", productSchema);
