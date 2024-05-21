import Product from "./product.interface";
import Products from "./product.model";

const createProductIntoDB = async (productData: Product) => {
  const existingProduct = await Products.findOne({ name: productData.name });
  if (existingProduct) {
    throw new Error(`Product already exists`);
  }
  const result = await Products.create(productData);
  return result;
};

// get all products DB
const getAllProductsFromDB = async () => {
  const result = await Products.find();
  return result;
};
//get single product from DB

const getSingleProductFromDB = async (id: string) => {
  const result = await Products.find({ _id: id });
  console.log(result, "single product data");
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
