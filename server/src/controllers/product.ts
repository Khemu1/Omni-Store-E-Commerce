import Product from "../models/product";
import { ProductProps } from "../types/index";
async function getAllProducts(req, res) {
  try {
    const products: ProductProps[] = await Product.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export { getAllProducts };
