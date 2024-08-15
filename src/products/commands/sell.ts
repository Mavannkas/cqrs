import { Command } from "../../middlewares/eventBus";

export interface SellProductCommandData {
    productId: string;
    amount: number;
}

export function createSellProductCommand(data: SellProductCommandData): Command<SellProductCommandData> {
    return {
        type: "sellProduct",
        data: data
    };
}