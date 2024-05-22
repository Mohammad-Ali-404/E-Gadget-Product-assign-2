import express from "express";
import { orderController } from "./order.controller";
// order Route

const router = express.Router();

// create single order route

router.post("/", orderController.createOrders);

// get all order route

router.get("/", orderController.getAllOrders);

export const OrdersRoutes = router;
