//create a schema for students

import { model, Schema } from "mongoose";
import Product, { Inventory, Variant, ProductModel } from "./product.interface";

// Variants schema

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Inventory schema

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantSchema],
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

// creating custom static method

productSchema.statics.isUserExists = async function (name: string) {
  const existingProduct = await Products.findOne({ name });
  return existingProduct;
};

const Products = model<Product, ProductModel>("Product", productSchema);

export default Products;
