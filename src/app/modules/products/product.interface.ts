//create type or interface

import { Model } from "mongoose";

export type Variant = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
};
//  query
export interface IAnyObject {
  [key: string]: any;
}

// for creating static
export interface ProductModel extends Model<Product> {
  isProductExists(id: string): Promise<Product>;
}
export default Product;
