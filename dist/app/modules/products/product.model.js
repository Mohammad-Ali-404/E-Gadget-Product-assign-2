"use strict";
//create a schema for students
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
const mongoose_1 = require("mongoose");
// Variants schema
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "Color is required"],
    },
    value: {
        type: String,
        required: [true, "Value is required"],
    },
});
// Inventory schema
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "inStock is required"],
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    tags: {
        type: [String],
        required: [true, "tags is required"],
    },
    variants: [variantSchema],
    inventory: {
        type: inventorySchema,
        required: [true, "inventory is required"],
    },
});
//  Middleware Query
productSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// creating custom static method
productSchema.statics.isUserExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield Products.findOne({ name });
        return existingProduct;
    });
};
const Products = (0, mongoose_1.model)("Product", productSchema);
exports.default = Products;
