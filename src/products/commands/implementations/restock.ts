import { Product } from "../../model";
import { RestockProductCommandData } from "..";
import { NotFoundException } from "../../../exceptions";
import { log } from "../../../middlewares/pino";

export async function restockProductImplementation(
  data: RestockProductCommandData
) {
  try {
    log.info(data, "restockProductImplementation");

    const product = await Product.findById(data.productId);
    if (!product) {
      throw new NotFoundException(
        `Product not found with id ${data.productId}`
      );
    }

    product.stock += data.amount;
    await product.save();
  } catch (err) {
    log.error(err, "restockProductImplementationError");
  }
}
