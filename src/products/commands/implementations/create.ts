import { Product } from "../../model";
import { ProductCommandData } from "..";
import { log } from "../../../middlewares/pino";

export async function createProductImplementation(data: ProductCommandData) {
  try {
    log.info(data, "createProductImplementation");
    
    const product = new Product({
      name: data.name,
      description: data.description,
      stock: data.stock,
      price: data.price,
    });

    await product.save();
  } catch (err) {
    log.error(err, "createProductImplementationError");
  }
}
