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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.default.findOne({ name: productData.name });
    if (existingProduct) {
        throw new Error(`Product already exists`);
    }
    const result = yield product_model_1.default.create(productData);
    return result;
});
// get all products DB
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find();
    console.log(result);
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getAllProductsFromDB,
};
