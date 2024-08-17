import { Product } from "../../model";
import { RestockProductCommandData } from "..";

export async function restockProductImplementation(
  data: RestockProductCommandData
) {
  try {
    console.log("restockProductImplementation", data);

    const product = await Product.findById(data.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.stock += data.amount;
    await product.save();
  } catch (err) {
    console.error("restockProductImplementation", err);
  }
}
