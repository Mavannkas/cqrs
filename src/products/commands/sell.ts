import { Command } from "../../middlewares/eventBus";
import { CommandData } from "../../middlewares/eventBus/commandActions";

export interface SellProductCommandData extends CommandData {
  productId: string;
  amount: number;
}

export function createSellProductCommand(
  data: SellProductCommandData
): Command<SellProductCommandData> {
  return {
    type: "sellProduct",
    data: data,
  };
}
