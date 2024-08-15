import { Command } from "../../middlewares/eventBus";

export interface OrderCommandData {
    customerId: string;
    products: {
        productId: string;
        quantity: number;
    }[];
}

export function createOrderCommand(data: OrderCommandData): Command<OrderCommandData> {
    return {
        type: "order",
        data: data
    };
}