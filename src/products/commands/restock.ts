import { Command } from "../../middlewares/eventBus";

export interface RestockProductCommandData {

}

export function createRestockProductCommand(data: RestockProductCommandData): Command<RestockProductCommandData> {
    return {
        type: "restockProduct",
        data: data
    };
}