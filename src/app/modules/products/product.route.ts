import express from "express";
import { ProductController } from "./product.controller";
// Product Route

const router = express.Router();

// create single product route

router.post("/create-product", ProductController.createProduct);

// get all products route

export const ProductRoutes = router;
