"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
// Product Route
const router = express_1.default.Router();
// create single product route
router.post("/create-product", product_controller_1.ProductController.createProduct);
// get all products route
router.get("/", product_controller_1.ProductController.getAllProducts);
// get single product route
router.get("/:productId", product_controller_1.ProductController.getSingleProductFromDB);
// update single product route
router.put("/:productId", product_controller_1.ProductController.updateProduct);
// Delete product route
router.delete("/:productId", product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
