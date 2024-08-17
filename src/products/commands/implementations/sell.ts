import { Product } from "../../model";
import { SellProductCommandData } from "..";

export async function sellProductImplementation(data: SellProductCommandData) {
  try {
    console.log("sellProductImplementation", data);
    const product = await Product.findOne({ _id: data.productId });
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < data.amount) {
      throw new Error("Not enough stock");
    }

    product.stock -= data.amount;

    await product.save();
  } catch (err) {
    console.error(err);
  }
}
