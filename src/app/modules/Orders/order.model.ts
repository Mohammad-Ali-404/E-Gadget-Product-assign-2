import { model, Schema } from "mongoose";
import orders from "./order.interface";

const orderSchema = new Schema<orders>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Order = model("Order", orderSchema);
