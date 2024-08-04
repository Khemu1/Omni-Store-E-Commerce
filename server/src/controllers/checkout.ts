import { Request, Response } from "express";
import Address from "../models/address";
import Cart from "../models/cart";
import Card from "../models/cards";
import { CardProps, ProductProps } from "../types";
import Product from "../models/product";

export async function getCheckoutData(req: Request, res: Response) {
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
    const [cartItems, addresses, allCards] = await Promise.all([
      Cart.find({ userId: user._id }).lean(),
      Address.find({ userId: user._id }).select("-country  -zipcode").lean(),
      Card.find({ userId: user._id }).select("-cvc -userId").lean(),
    ]);

    if (
      cartItems.length === 0 ||
      addresses.length === 0 ||
      allCards.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "Missing Address , products or credit card" });
    }

    const products: ProductProps[] = (
      await Promise.all(
        // somthing new
        cartItems.map(async (item) => {
          const product = await Product.findById(item.productId).lean();
          if (product) {
            return {
              ...product,
              totalPrice: item.price,
              quantity: item.quantity,
            } as ProductProps;
          }
          return null;
        })
      )
    ).filter((product): product is ProductProps => product !== null); // better Approach

    const cards = allCards as CardProps[];
    const maskedCards = cards.map((card) => ({
      ...card,
      number: "•••• •••• •••• " + card.last4Numbers,
    }));
    return res.status(200).json({ products, addresses, cards: maskedCards });
  } catch (error) {
    console.error("Error getting checkout data:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
