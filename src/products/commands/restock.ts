import { Command } from "../../middlewares/eventBus";

export interface RestockProductCommandData {
    productId: string;
    amount: number;
}

export function createRestockProductCommand(data: RestockProductCommandData): Command<RestockProductCommandData> {
    return {
        type: "restockProduct",
        data: data
    };
}