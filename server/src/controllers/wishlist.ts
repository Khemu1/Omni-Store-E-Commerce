import Product from "../models/product";
import WishList from "../models/wishlist";
import { Request, Response } from "express";
import { ProductProps, WishListProps } from "../types";

export async function getWishList(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const wishList: WishListProps[] = await WishList.find({
      userId: user._id,
    });
    const products: ProductProps[] = [];

    for (const wish of wishList) {
      const product: ProductProps | null = await Product.findById(
        wish.productId
      );
      if (product) {
        products.push(product);
      }
    }

    return res.status(200).json({ wishlist: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function toggleWishList(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.query;
    console.log(id);
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

export async function removeWishListItem(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;
    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24 ||
      typeof id !== "string"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await WishList.findOneAndDelete({ productId: id });
    return res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function clearWishList(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const cartItems = await WishList.find({ userId: user._id });
    if (cartItems.length > 0) {
      await WishList.deleteMany({ userId: user._id });
      return res.status(200).json({ message: "wishlist cleared" });
    }
    return res.status(400).json({ message: "wishlist is already empty" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
