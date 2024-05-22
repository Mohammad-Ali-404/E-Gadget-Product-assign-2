//create a schema for students

import { model, Schema } from "mongoose";
import Product, { Inventory, Variant, ProductModel } from "./product.interface";

// Variants schema

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, "Color is required"],
  },
  value: {
    type: String,
    required: [true, "Value is required"],
  },
});

// Inventory schema

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "inStock is required"],
  },
});

const productSchema = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  tags: {
    type: [String],
    required: [true, "tags is required"],
  },
  variants: [variantSchema],
  inventory: {
    type: inventorySchema,
    required: [true, "inventory is required"],
  },
});
//  Middleware Query
productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating custom static method

productSchema.statics.isUserExists = async function (name: string) {
  const existingProduct = await Products.findOne({ name });
  return existingProduct;
};

const Products = model<Product, ProductModel>("Product", productSchema);

export default Products;
