import { orderImplementation } from "../../orders/commands";
import {
  createProductImplementation,
  restockProductImplementation,
  sellProductImplementation,
} from "../../products/commands";

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
