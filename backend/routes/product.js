const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Get all products with pagination
router.get("/getAllProducts", async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 5;

    // Fetch products with pagination
    const products = await Product.find()
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalCount: totalProducts,
      productsData: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/addProduct", async (req, res) => {
  const { id, title, price, description, category, image, rating } = req.body;

  const newProduct = new Product({
    id,
    title,
    price,
    description,
    category,
    image,
    rating: {
      rate: rating.rate,
      count: rating.count,
    },
  });

  try {
    await newProduct.save();
    console.log("Product added successfully");
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

// Get product by ID
router.get("/getById/:id", async (req, res) => {
  const prodId = parseInt(req.params.id);

  try {
    const product = await Product.findOne({ id: prodId });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "No product found with this ID" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a product by ID
router.put("/updateProduct/:id", async (req, res) => {
  const prodId = parseInt(req.params.id);
  const { title, price, description, category, image, rating } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: prodId },
      {
        $set: {
          title,
          price,
          description,
          category,
          image,
          rating: {
            rate: rating.rate,
            count: rating.count,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } else {
      res
        .status(404)
        .json({ message: "No product found with this ID to update" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a product by ID
router.delete("/deleteProduct/:id", async (req, res) => {
  const prodId = parseInt(req.params.id);

  try {
    const deletedProduct = await Product.findOneAndDelete({ id: prodId });

    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "No product found with this ID to delete" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
