import { Product } from "../../../products/model";
import { Order } from "../../model";
import { OrderCommandData } from "..";

async function getProducts({ products }: OrderCommandData) {
  return Product.find({
    _id: { $in: products.map(({ productId }) => productId) },
  });
}

const getProductById = ({ products }: OrderCommandData, id: string) => {
  return products.find((product) => product.productId === id);
};

export async function orderImplementation(data: OrderCommandData) {
  try {
    console.log("orderImplementation", data);

    const products = await getProducts(data);

    for (const product of products) {
      const productData = getProductById(data, product._id.toString());
      if (!productData) {
        throw new Error(
          `Product data not found for product ID: ${product._id}`
        );
      }
      if (product.stock < productData.quantity) {
        throw new Error(`Not enough stock for product ID: ${product._id}`);
      }
    }

    for (const product of products) {
      const productData = getProductById(data, product._id.toString());
      product.stock -= productData!.quantity;
      await product.save();
    }

    const order = new Order({
      customerID: data.customerId,
      products: data.products,
    });
    await order.save();
  } catch (err) {
    console.error("orderImplementation", err);
  }
}
