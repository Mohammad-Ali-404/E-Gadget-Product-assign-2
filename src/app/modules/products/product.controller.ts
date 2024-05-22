import { Request, Response } from "express";
import Products from "./product.model";

export const ProductController = {
  // Create a new product
  createProduct: async (req: Request, res: Response) => {
    try {
      const product = new Products(req.body);
      await product.save();
      res.status(201).json({
        success: true,
        message: "Product created successfully!",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to create product",
        error,
      });
    }
  },

  // Get all products
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.find();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error,
      });
    }
  },

  // Get a single product by ID
  getSingleProductFromDB: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error,
      });
    }
  },

  // Update a single product by ID
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await Products.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update product",
        error,
      });
    }
  },

  // Delete a single product by ID
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await Products.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error,
      });
    }
  },
};
