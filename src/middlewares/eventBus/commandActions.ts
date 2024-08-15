import { orderImplementation } from "../../orders/commands/implementations/order";
import { createProductImplementation } from "../../products/commands/implementations/create";
import { restockProductImplementation } from "../../products/commands/implementations/restock";
import { sellProductImplementation } from "../../products/commands/implementations/sell";

export interface CommandData {}
export type SupportedCommands =
  | "createProduct"
  | "restockProduct"
  | "sellProduct"
  | "order";

export const supportedCommands: Record<SupportedCommands, unknown> = {
  createProduct: createProductImplementation,
  restockProduct: restockProductImplementation,
  sellProduct: sellProductImplementation,
  order: orderImplementation,
};
