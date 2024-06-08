import express, { Request, Response } from "express";
import { ProductController } from "./product.controller";
import Products from "./product.model";

const router = express.Router();

// Create single product route
router.post("/", ProductController.createProduct);

// Get all products route
router.get("/", async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  if (searchTerm) {
    try {
      const regex = new RegExp(searchTerm as string, "i"); // Case-insensitive regex
      const products = await Products.find({
        $or: [{ name: regex }],
      });

      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching products",
        error,
      });
    }
  } else {
    // If no searchTerm is provided, return all products
    return ProductController.getAllProducts(req, res);
  }
});

// Get single product route
router.get("/:productId", ProductController.getSingleProductFromDB);

// Update single product route
router.put("/:productId", ProductController.updateProduct);

// Delete product route
router.delete("/:productId", ProductController.deleteProduct);

export const ProductRoutes = router;
