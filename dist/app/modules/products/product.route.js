"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const product_model_1 = __importDefault(require("./product.model"));
const router = express_1.default.Router();
// Create single product route
router.post("/create-product", product_controller_1.ProductController.createProduct);
// Get all products route
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (searchTerm) {
        try {
            const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex
            const products = yield product_model_1.default.find({
                $or: [{ name: regex }],
            });
            return res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: products,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while fetching products",
                error,
            });
        }
    }
    else {
        // If no searchTerm is provided, return all products
        return product_controller_1.ProductController.getAllProducts(req, res);
    }
}));
// Get single product route
router.get("/:productId", product_controller_1.ProductController.getSingleProductFromDB);
// Update single product route
router.put("/:productId", product_controller_1.ProductController.updateProduct);
// Delete product route
router.delete("/:productId", product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
