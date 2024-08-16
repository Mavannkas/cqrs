import { isValidObjectId } from "mongoose";
import { Product } from "./model";
import { BadRequestException } from "../exceptions/badRequestException";
import { NotFoundException } from "../exceptions/notFoundException";

export async function tryToGetProductById(id: string): Promise<InstanceType<typeof Product>> {
  if (!isValidObjectId(id)) {
    throw new BadRequestException("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new NotFoundException("Product not found");
  }

  return product;
}
