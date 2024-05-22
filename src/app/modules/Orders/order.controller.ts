import { Request, Response } from "express";
import { orderServices } from "./order.service";
import ordersValidationSchema from "./order.validation";

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

// const getAllOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderServices.getAllOrderFromDB();
//     res.status(200).json({
//       success: true,
//       message: "Orders fetched successfully!",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "something went wrong",
//       error: error,
//     });
//   }
// };
export const orderController = {
  createOrders,
};
