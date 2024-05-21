import express from "express";
import { ProductControllers } from "./product.controller";

//will call controller function

const router = express.Router();

router.post("/create-product", ProductControllers.createProduct);

export const ProductsRoute = router;
