import Product from "../models/product";
import WishList from "../models/wishlist";
import { Request, Response } from "express";
import { ProductProps, SortQuery } from "../types/index";

interface ProductWithHave extends ProductProps {
  have: boolean;
}
async function getAllProducts(req: Request, res: Response) {
  let sortQuery: SortQuery = { title: "asc" };
  if (req.query.sortBy && typeof req.query.sortBy === "string") {
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
  if (req.query.search && typeof req.query.search === "string") {
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

  if (req.query.category && typeof req.query.category === "string") {
    const category = req.query.category.toLowerCase().replace(/\s+/g, "");
    filterQuery.category = {
      $regex: new RegExp(
        `\\b${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "i"
      ),
    };
  }
  if (req.query.priceRange && typeof req.query.priceRange === "string") {
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

async function getProduct(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;

    if (!id || typeof id !== "string" || id.length !== 24) {
      return res.status(404).json({ message: "Product not found" });
    }

    let have = false;

    const product: ProductProps | null = await Product.findById(id).lean(); // the lean function converts the MongoDB doc into a JS object

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (user) {
      const wishList = await WishList.findOne({
        userId: user._id,
        productId: id,
      }).lean();
      if (wishList) have = true;
    }

    const productWithHave: ProductWithHave = { ...product, have };
    res.status(200).json(productWithHave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
export { getAllProducts, getProduct };
