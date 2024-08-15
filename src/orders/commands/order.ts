import { Command } from "../../middlewares/eventBus";
import { CommandData } from "../../middlewares/eventBus/commandActions";

export interface OrderCommandData extends CommandData {
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