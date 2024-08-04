import { Request, Response } from "express";
import { CartProps, ProductProps } from "../types";
import Product from "../models/product";
import Cart from "../models/cart";

export async function addProductToCart(req: Request, res: Response) {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
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
        return res.status(400).json({
          message:
            "Maximum quantity limit for product reached, You can't have more than 5",
        });
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

export async function ChangeCartAmount(req: Request, res: Response) {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
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

export async function getCartItems(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      !user._id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res
        .status(401)
        .json({ message: "somthing is wrong with user form cart" });
    }
    const cartItems: CartProps[] = await Cart.find({
      userId: user._id,
    });
    const products: ProductProps[] = [];
    for (const item of cartItems) {
      const product: ProductProps | null = await Product.findById(
        item.productId
      ).lean();
      if (product)
        products.push({
          ...product,
          totalPrice: item.price,
          quantity: item.quantity,
        });
    }
    return res.status(200).json({ cartItems: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function clearCart(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const cartItems = await Cart.find({ userId: user._id });
    if (cartItems.length > 0) {
      await Cart.deleteMany({ userId: user._id });
      return res.status(200).json({ message: "Cart cleared" });
    }
    return res.status(400).json({ message: "Cart is already empty" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
