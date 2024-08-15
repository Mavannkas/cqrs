import { Command } from "../../middlewares/eventBus";

export interface OrderCommandData {

}

export function createOrderCommand(data: OrderCommandData): Command<OrderCommandData> {
    return {
        type: "order",
        data: data
    };
}