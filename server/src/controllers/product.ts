import Product from "../models/product";
import WishList from "../models/wishlist";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ProductProps, SortQuery } from "../types/index";
import User from "../models/accounts";
import Cart from "../models/cart";

const accessTokenSecret =
  process.env.JWT_ACCESS_SECRET || "your-access-token-secret";

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
    let user: { _id: string } | null = null;
    const { refresh, jwt: token } = req.cookies;
    if (token && refresh) {
      const decodedAccessToken = jwt.verify(token, accessTokenSecret) as {
        userId: string;
      };
      user = await User.findById(decodedAccessToken.userId).lean();
    }

    const { id } = req.query;

    if (!id || typeof id !== "string" || id.length !== 24) {
      return res.status(404).json({ message: "Product not found" });
    }

    let have = false;

    const product: ProductProps | null = await Product.findById(id).lean(); // the lean function converts the MongoDB doc into a JS object

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (user && user._id) {
      const wishList = await WishList.findOne({
        userId: user._id,
        productId: id,
      }).lean(); // Lean the result for consistency
      have = !!wishList;
    }

    const productWithHave: ProductWithHave = { ...product, have };
    res.status(200).json(productWithHave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
async function toggleWishList(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.query;
    if (!id || typeof id !== "string" || id.length !== 24) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingWishListItem = await WishList.findOne({
      userId: user._id,
      productId: id,
    });
    if (existingWishListItem) {
      await WishList.findByIdAndDelete(existingWishListItem._id);
      return res.status(200).json({ have: false });
    } else {
      await WishList.create({ userId: user._id, productId: id });
      return res.status(200).json({ have: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function removeWishListItem(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;
    if (!user || !user._id || typeof id !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await WishList.findOneAndDelete({ productId: id });
    return res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function addProductToCart(req: Request, res: Response) {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    if (
      !user ||
      !user._id ||
      typeof productId !== "string" ||
      productId.length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product: ProductProps | null = await Product.findById(
      productId
    ).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await Cart.findOne({
      userId: user._id,
      productId: productId,
    });

    if (cartItem) {
      if (cartItem.quantity + quantity <= 5) {
        cartItem.quantity += quantity;
        cartItem.price = cartItem.quantity * product.price;
        await cartItem.save();
      } else {
        return res
          .status(400)
          .json({ message: "Maximum quantity limit reached" });
      }
    } else {
      const price = quantity * product.price;
      await Cart.create({
        userId: user._id,
        productId: productId,
        quantity,
        price,
      });
    }

    return res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function ChangeCartAmount(req: Request, res: Response) {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    if (
      !user ||
      !user._id ||
      typeof productId !== "string" ||
      productId.length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized from controller" });
    }

    if (typeof quantity !== "number" || (quantity < 0 && quantity > 5)) {
      return res.status(400).json({ message: "Invalid quantity amount" });
    }
    const product: ProductProps | null = await Product.findById(
      productId
    ).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await Cart.findOne({
      userId: user._id,
      productId: productId,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Amount Changed" });
    }

    if (quantity !== 0) {
      cartItem.quantity = quantity;
      cartItem.price = cartItem.quantity * product.price;
      await cartItem.save();
    } else {
      await Cart.findByIdAndDelete(cartItem._id);
    }

    return res.status(200).json({ message: "Item deleted from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export {
  getAllProducts,
  getProduct,
  toggleWishList,
  removeWishListItem,
  addProductToCart,
  ChangeCartAmount,
};
