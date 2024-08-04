import { Request, Response } from "express";
import Cart from "../models/cart";
import Address from "../models/address";
import { AddressProps, CardProps, ProductProps } from "../types";
import Order from "../models/orders";
import Card from "../models/cards";
import Product from "../models/product";

export async function createOrder(req: Request, res: Response) {
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

    const cartItems = await Cart.find({ userId: user._id });
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { addressId, cardId } = req.body;
    if (!addressId || !cardId) {
      return res
        .status(400)
        .json({ message: "Address or card information is missing" });
    }

    const address: AddressProps | null = await Address.findById(
      addressId
    ).lean();
    const card: CardProps | null = await Card.findById(cardId).lean();

    if (!address || !card) {
      return res.status(404).json({ message: "Address or card not found" });
    }

    let totalPrice = 0;
    const products = [];

    for (const item of cartItems) {
      const product: ProductProps | null = await Product.findById(
        item.productId
      ).lean();
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      const totalItemPrice = product.price * item.quantity;
      totalPrice += parseFloat(totalItemPrice.toFixed(2));

      products.push({
        _id: product._id,
        quantity: item.quantity,
        price: product.price,
        title: product.title,
        image: product.image,
      });
    }

    const newOrder = new Order({
      userId: user._id,
      products,
      totalPrice,
      address: {
        name: address.name,
        street: address.street,
        city: address.city,
      },
      card: {
        name: card.name,
        last4Numbers: card.number.slice(-4),
        type: card.type,
      },
      orderDate: new Date(),
    });

    await newOrder.save();
    await Cart.deleteMany({ userId: user._id });

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getOrders(req: Request, res: Response) {
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

    const orders = await Order.find({ userId: user._id })
      .populate({
        path: "products", // Correct path to the product reference
        model: "Product",
      })
      .populate({
        path: "address", // Populate the addressId field
        model: "Address",
        select: "name street city -_id", // Select specific fields to return
      })
      .populate({
        path: "card", // Populate the cardId field
        model: "Card",
        select: "name type last4Numbers -_id", // Select specific fields to return
      })
      .lean();

    // Send the response
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
