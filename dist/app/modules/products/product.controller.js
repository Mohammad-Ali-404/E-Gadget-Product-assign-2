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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: ProductData } = req.body;
        const zodParsedData = product_validation_1.productValidationSchema.parse(ProductData);
        const result = yield product_service_1.ProductService.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created succesfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
// Get all products from DB
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductService.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: "Products fetched succesfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
// Get Single products from DB
const getSingleProductFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err,
        });
    }
});
// Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const { body } = req;
        if (!body) {
            return res.status(400).json({
                success: false,
                message: "No data found",
            });
        }
        const result = yield product_service_1.ProductService.updateProductIntoDB(productId, req.body);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Couldn't update data",
            error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: "",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err,
        });
    }
});
// const searchProduct = async (req: Request, res: Response) => {};
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProductFromDB,
    updateProduct,
    deleteProduct,
    // searchProduct,
};
