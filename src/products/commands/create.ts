import { Command } from "../../middlewares/eventBus";

export interface ProductCommandData {

}

export function createProductCommand(data: ProductCommandData): Command<ProductCommandData> {
    return {
        type: "createProduct",
        data: data
    };
}