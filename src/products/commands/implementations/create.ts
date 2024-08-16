import { Product } from "../../model";
import { ProductCommandData } from "../create";

export async function createProductImplementation(data: ProductCommandData) {
  try {
    console.log("createProductImplementation", data);

    const product = new Product({
      name: data.name,
      description: data.description,
      stock: data.stock,
      price: data.price,
    });

    await product.save();
  } catch (err) {
    console.error("createProductImplementation", err);
  }
}
