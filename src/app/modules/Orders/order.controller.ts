import { Request, Response } from "express";
import { orderServices } from "./order.service";
import ordersValidationSchema from "./order.validation";
import { IAnyObject } from "../products/product.interface";

const createOrders = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.send({
      success: false,
      messaeg: "No content found",
    });
  }
  const { data, error } = ordersValidationSchema.safeParse(body);
  console.log(data);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  const result = await orderServices.createOrderIntoDB(data, res);
  return result;
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const find: IAnyObject = {};
    if (email) {
      find.email = email;
    }

    const result = await orderServices.getAllOrderIntoDB(find);

    const response: IAnyObject = {
      success: result.length > 0,
      message:
        result.length > 0
          ? `Orders fetched successfully for user ${email || ""}`
          : "Order Not found",
    };

    if (result.length > 0) {
      response.data = result;
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};
export const orderController = {
  createOrders,
  getAllOrders,
};
