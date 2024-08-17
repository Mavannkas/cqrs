import { isValidObjectId } from "mongoose";
import { Product } from "./model";
import { NotFoundException, BadRequestException } from "../exceptions";

export async function tryToGetProductById(
  id: string
): Promise<InstanceType<typeof Product>> {
  if (!isValidObjectId(id)) {
    throw new BadRequestException("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new NotFoundException("Product not found");
  }

  return product;
}
