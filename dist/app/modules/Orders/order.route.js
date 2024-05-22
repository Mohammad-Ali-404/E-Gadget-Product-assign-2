"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
// order Route
const router = express_1.default.Router();
// create single order route
router.post("/", order_controller_1.orderController.createOrders);
// get all order route
router.get("/", order_controller_1.orderController.getAllOrders);
exports.OrdersRoutes = router;
