import { Command } from "../../middlewares/eventBus";
import { CommandData } from "../../middlewares/eventBus/commandActions";

export interface ProductCommandData extends CommandData {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export function createProductCommand(
  data: ProductCommandData
): Command<ProductCommandData> {
  return {
    type: "createProduct",
    data: data,
  };
}
