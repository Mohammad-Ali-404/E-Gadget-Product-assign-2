import { Schema } from "mongoose";

interface orders {
  email: string;
  productId: string | Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

export default orders;
