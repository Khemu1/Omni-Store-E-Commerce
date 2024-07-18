import Product from "../models/product";
import { ProductProps, SortQuery } from "../types/index";
async function getAllProducts(req, res) {
  let sortQuery: SortQuery = { title: "asc" };
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy.toLowerCase();
    switch (sortBy) {
      case "az":
        sortQuery = { title: 1 };
        break;
      case "za":
        sortQuery = { title: -1 };
        break;
      case "lowtohigh":
        sortQuery = { price: 1 };
        break;
      case "hightolow":
        sortQuery = { price: -1 };
        break;
      default:
        sortQuery = { title: 1 };
        break;
    }
  }

  let filterQuery: any = {};
  if (req.query.search) {
    const searchQuery = req.query.search.toLowerCase().replace(/\s+/g, "");
    const regexPattern = `\\b${searchQuery}\\b`;
    filterQuery = {
      $or: [
        { title: { $regex: regexPattern, $options: "i" } },
        { category: { $regex: regexPattern, $options: "i" } },
        { description: { $regex: regexPattern, $options: "i" } },
      ],
    };
  }

  if (req.query.category) {
    const category = req.query.category.toLowerCase().replace(/\s+/g, "");
    filterQuery.category = {
      $regex: new RegExp(
        `\\b${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "i"
      ),
    };
  }
  if (req.query.priceRange) {
    const price = req.query.priceRange.split("-");
    const minPrice = parseInt(price[0], 10);
    const maxPrice = parseInt(price[1], 10);
    filterQuery.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };
  }

  try {
    const products: ProductProps[] = await Product.find(filterQuery).sort(
      sortQuery
    );
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.query;
    if (id.length !== 24) {
      res.status(404).json({ message: "Product not found" });
    }
    const product: ProductProps | null = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export { getAllProducts, getProduct };
