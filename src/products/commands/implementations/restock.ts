import { Product } from "../../model";
import { RestockProductCommandData } from "..";
import { NotFoundException } from "../../../exceptions";

export async function restockProductImplementation(
  data: RestockProductCommandData
) {
  try {
    console.log("restockProductImplementation", data);

    const product = await Product.findById(data.productId);
    if (!product) {
      throw new NotFoundException(
        `Product not found with id ${data.productId}`
      );
    }

    product.stock += data.amount;
    await product.save();
  } catch (err) {
    console.error("restockProductImplementation", err);
  }
}
