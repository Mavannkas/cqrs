import { Command } from "../../middlewares/eventBus";

export interface ProductCommandData {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export function createProductCommand(data: ProductCommandData): Command<ProductCommandData> {
    return {
        type: "createProduct",
        data: data
    };
}