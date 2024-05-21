import express from "express";
import { ProductController } from "./product.controller";
// Product Route

const router = express.Router();

// create single product route

router.post("/create-product", ProductController.createProduct);

// get all products router

router.get("/", ProductController.getAllProducts);

// get single product route
router.get("/:productId", ProductController.getSingleProductFromDB);

// update single product route
router.put("/:productId", ProductController.updateProduct);

export const ProductRoutes = router;
