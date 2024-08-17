import { Command } from "../../middlewares/eventBus";
import { CommandData } from "../../middlewares/eventBus/commandActions";

export interface ProductData {
  productId: string;
  quantity: number;
}
export interface OrderCommandData extends CommandData {
  customerId: string;
  products: ProductData[];
}

export function createOrderCommand(
  data: OrderCommandData
): Command<OrderCommandData> {
  return {
    type: "order",
    data: data,
  };
}
