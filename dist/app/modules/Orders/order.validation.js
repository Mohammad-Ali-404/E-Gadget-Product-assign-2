"use strict";
// order zod validation
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ordersValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.default = ordersValidationSchema;
