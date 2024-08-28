import { Command } from "../../middlewares/eventBus";
import { CommandData } from "../../middlewares/eventBus/commandActions";

export interface RestockProductCommandData extends CommandData {
  productId: string;
  amount: number;
}

export function createRestockProductCommand(
  data: RestockProductCommandData
): Command<RestockProductCommandData> {
  return {
    type: "restockProduct",
    data: data,
  };
}
