export type SupportedCommands =
  | "createProduct"
  | "restockProduct"
  | "sellProduct"
  | "order";

export const supportedCommands: Record<
  SupportedCommands,
  (data: unknown) => void
> = {
  createProduct: () => {},
  restockProduct: () => {},
  sellProduct: () => {},
  order: () => {},
};
