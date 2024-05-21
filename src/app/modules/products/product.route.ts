import express from "express";
import { ProductController } from "./product.controller";
// Product Route

const router = express.Router();

// create single product route

router.post("/create-product", ProductController.createProduct);

// get all products router

router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
