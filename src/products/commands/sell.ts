import { Command } from "../../middlewares/eventBus";

export interface SellProductCommandData {

}

export function createSellProductCommand(data: SellProductCommandData): Command<SellProductCommandData> {
    return {
        type: "sellProduct",
        data: data
    };
}