import { Product } from "../../model";
import { SellProductCommandData } from "..";
import { BadRequestException, NotFoundException } from "../../../exceptions";
import { log } from "../../../middlewares/pino";

export async function sellProductImplementation(data: SellProductCommandData) {
  try {
    log.info(data, "sellProductImplementation");
    const product = await Product.findOne({ _id: data.productId });
    if (!product) {
      throw new NotFoundException(
        `Product not found with id ${data.productId}`
      );
    }

    if (product.stock < data.amount) {
      throw new BadRequestException(
        `Not enough stock for product with id ${data.productId}`
      );
    }

    product.stock -= data.amount;

    await product.save();
  } catch (err) {
    log.error(err, "sellProductImplementationError");
  }
}
