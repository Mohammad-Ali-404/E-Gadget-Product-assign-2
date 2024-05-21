import Product from "./product.interface";
import Products from "./product.model";

const createProductIntoDB = async (productData: Product) => {
  const existingProduct = await Products.findOne({ name: productData.name });
  if (existingProduct) {
    throw new Error(`Product already exists`);
  }
  const Result = await Products.create(productData);
  return Result;
};
export const ProductService = {
  createProductIntoDB,
};
