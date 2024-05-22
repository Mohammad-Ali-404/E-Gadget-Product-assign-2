import { Response } from "express";
import { Order } from "./order.model";
import Products from "../products/product.model";
import { IAnyObject } from "../products/product.interface";
import orders from "./order.interface";

const createOrderIntoDB = async (orderData: orders, res: Response) => {
  try {
    const productId = orderData.productId;
    const response = {
      success: false,
      message: "",
    };

    // return if the order quantity is 0
    if (orderData.quantity < 1) {
      response.message = "Insufficient order quantity";
      response.success = false;
      return res.status(400).send(response);
    }

    // find the product
    const product = await Products.findById(productId);
    if (!product) {
      response.message = "Invalid product id";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the product quantity
    const productObj = product.toObject();
    const availableQntt = productObj.inventory.quantity;
    const isStock = productObj.inventory.inStock;
    if (!isStock || orderData.quantity > availableQntt) {
      response.message = "Insufficient quantity available in inventory";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the quantity is equal to available quantity
    const isEqualQuantity =
      productObj.inventory.quantity === orderData.quantity;

    //   update the isStock property
    if (isEqualQuantity) {
      await Products.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true }
      );
    } else {
      // set new product Quantity
      await Products.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productObj.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true }
      );
    }

    //   set the order
    const result = await Order.create(orderData);

    response.message = "Order created successfully!";
    response.success = true;
    res.json({
      ...response,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cant't create order",
    });
  }
};

const getAllOrderIntoDB = async (find: IAnyObject) => {
  const result = await Order.find(find);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
};
