import User from "../models/accounts";
import { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import WishList from "../models/wishlist";
import Product from "../models/product";
import Order from "../models/orders";

import {
  CardFormProps,
  CardProps,
  CartProps,
  ProductProps,
  WishListProps,
} from "../types";
import Cart from "../models/cart";
import Address from "../models/address";
import { AddressProps } from "../types/index";
import Card from "../models/cards";

const accessTokenSecret =
  process.env.JWT_ACCESS_SECRET || "your-access-token-secret";
const refreshTokenSecret =
  process.env.JWT_REFRESH_TOKEN || "your-refresh-token-secret";

const accessTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 3600000,
  sameSite: "strict",
};

const refreshTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 604800000,
  sameSite: "strict",
};

export async function registerUser(req: Request, res: Response) {
  const { email, password, username, mobileNumber } = req.body.data;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(400)
        .json({ errors: { email: "Email already exists" } });
    }
    const user = new User({ username, email, password, mobileNumber });
    const newUser = await user.save();
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      accessTokenSecret,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        userId: newUser._id,
      },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, accessTokenOptions);
    res.cookie("refresh", refreshToken, refreshTokenOptions);
    return res.status(201).json({
      username: newUser.username,
      id: newUser._id,
      email: findUser.email,
      mobileNumber: findUser.mobileNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { emailOrMobile, password } = req.body.data;
  try {
    const findUser = await User.findOne({
      $or: [
        { email: emailOrMobile, password },
        { mobileNumber: emailOrMobile, password },
      ],
    });
    if (findUser) {
      const accesstoken = jwt.sign(
        {
          userId: findUser._id,
        },
        accessTokenSecret,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          userId: findUser._id,
        },
        refreshTokenSecret,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", accesstoken, accessTokenOptions);
      res.cookie("refresh", refreshToken, refreshTokenOptions);
      return res.status(200).json({
        username: findUser.username,
        id: findUser._id,
        email: findUser.email,
      });
    }
    return res.status(400).json({ errors: { message: "Invalid Credentials" } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getUserInfo(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const findUser = await User.findById(user._id);

    if (findUser) {
      const { username, email, password, mobileNumber } = findUser;

      return res.status(200).json({ username, email, password, mobileNumber });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateUsername(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { username } = req.body;

    const findUser = await User.findByIdAndUpdate(
      user._id,
      { username },
      { new: true }
    );

    if (findUser) {
      return res.status(200).json({ username: findUser.username });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateEmail(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { email } = req.body;

    const findUser = await User.findByIdAndUpdate(
      user._id,
      { email },
      { new: true }
    );

    if (user) {
      return res.status(200).json({ email: findUser.email });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;

    const findUser = await User.findById(user._id).select("password");
    if (findUser.password === currentPassword) {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { password: newPassword },
        { new: true }
      );
      if (updatedUser) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    }
    return res.status(400).json({ message: "Incorrect current password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateMobileNumber(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { mobileNumber } = req.body;

    const findUser = await User.findByIdAndUpdate(
      user._id,
      { mobileNumber },
      { new: true }
    );

    if (user) {
      return res.status(200).json({ mobileNumber: findUser.mobileNumber });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getWishList(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
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

export async function getCartItems(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
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

export async function addAddress(req: Request, res: Response) {
  try {
    const address = req.address;
    const user = req.user;

    if (!address || !user) {
      return res
        .status(400)
        .json({ message: "Address or user information is missing" });
    }

    const allAddresses = await Address.find({ userId: user._id });

    const isDefault = allAddresses.length === 0;

    const newAddress = new Address({
      ...address,
      userId: user._id,
      default: isDefault,
    });

    await newAddress.save();

    return res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getAddresses(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const addresses: AddressProps[] | [] = await Address.find({
      userId: user._id,
    });

    return res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error getting addresses:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function setAddressAsDefault(req: Request, res: Response) {
  try {
    const { id: addressId } = req.query;
    const user = req.user;
    if (!addressId || !user || typeof user._id.toString() !== "string") {
      return res
        .status(400)
        .json({ message: "Address ID or user information is missing" });
    }
    await Address.updateMany(
      { userId: user._id, default: true },
      { $set: { default: false } }
    );
    const address = await Address.findByIdAndUpdate(
      addressId,
      { default: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json({ message: "Address set as default", address });
  } catch (error) {
    console.error("Error setting address as default:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getAddress(req: Request, res: Response) {
  try {
    const { id: addressId } = req.query;
    if (
      !addressId ||
      typeof addressId !== "string" ||
      addressId.length !== 24
    ) {
      return res.status(400).json({ message: "Invalid address ID" });
    }
    const address = await Address.findById(addressId);
    return res.status(200).json(address);
  } catch (error) {
    console.error("Error getting address:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateAddress(req: Request, res: Response) {
  try {
    const { id: addressId, address: newAddress } = req.body;
    console.log(req.body);
    if (
      !addressId ||
      typeof addressId !== "string" ||
      addressId.length !== 24 ||
      !newAddress
    ) {
      return res
        .status(400)
        .json({ message: "Invalid address id or new address" });
    }
    const address = await Address.findByIdAndUpdate(addressId, newAddress);
    return res.status(200).json(address);
  } catch (error) {
    console.error("Error getting address:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteAddress(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;

    if (!user || !id || typeof id !== "string" || id.length !== 24) {
      return res.status(400).json({ message: "Invalid user or address ID" });
    }

    const addressToDelete = await Address.findById(id);

    if (
      !addressToDelete ||
      addressToDelete.userId.toString() !== user._id.toString()
    ) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.findByIdAndDelete(id);

    if (addressToDelete.default) {
      const remainingAddresses = await Address.find({ userId: user._id });

      if (remainingAddresses.length > 0) {
        const newDefaultAddress = remainingAddresses[0];
        newDefaultAddress.default = true;
        await newDefaultAddress.save();
      }
    }

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function addCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const card = req.card;
    if (!user || !card) {
      return res
        .status(400)
        .json({ message: "User or card information is missing" });
    }

    const [allCards, serach] = await Promise.all([
      Card.find({ userId: user._id }),
      Card.findOne({ userId: user._id, number: card.number }),
    ]);

    if (serach) {
      return res.status(400).json({ message: "Card already exists" });
    }
    if (allCards.length === 0) {
      const newCard = await new Card({
        userId: user._id,
        ...card,
        default: true,
      });
      newCard.save();
      return res
        .status(201)
        .json({ message: "Card added successfully", newCard });
    }

    const newCard = await new Card({
      userId: user._id,
      ...card,
    });
    newCard.save();
    return res
      .status(201)
      .json({ message: "Card added successfully", newCard });
  } catch (error) {
    console.error("Error adding card:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}
export async function getCards(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid user data" });
    }

    const [cardsData] = await Promise.all([
      Card.find({ userId: user._id }).select("-cvc").lean(),
    ]);

    const cards: CardProps[] = cardsData as CardProps[];

    const maskNumber = (number: string) => "•••• •••• •••• " + number.slice(-4);

    const maskedCards = cards.map((card) => ({
      ...card,
      number: maskNumber(card.number),
    }));

    const defaultCard = maskedCards.find((card) => card.default === true);

    return res.status(200).json({ cards: maskedCards, defaultCard });
  } catch (error) {
    console.error("Error getting cards:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
export async function getCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id: cardId } = req.query;
    if (!user) {
      return res.status(401).json({ message: "Invalid user data" });
    }

    const cardData = await Card.findOne({ _id: cardId, userId: user._id })
      .select("-userId -type")
      .lean();

    return res.status(200).json(cardData);
  } catch (error) {
    console.error("Error getting cards:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function setCardDefault(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.body;
    if (!user || !id) {
      return res.status(400).json({ message: "Invalid user or card ID" });
    }
    await Card.updateMany({ userId: user._id }, { $set: { default: false } });
    await Card.findByIdAndUpdate(id, { $set: { default: true } });
    return res.status(200).json({ message: "Card set as default" });
  } catch (error) {
    console.error("Error setting card as default:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id: cardId } = req.query;
    const { name, number, cvc, expiry, type }: CardFormProps = req.body;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      typeof cardId !== "string" ||
      cardId.length !== 24
    ) {
      return res.status(401).json({ message: "Invalid user data" });
    }
    await Card.findByIdAndUpdate(cardId, {
      name,
      number,
      cvc,
      expiry,
      type,
    });
    return res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    console.error("Error updating card:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;

    if (!user || !id || typeof id !== "string" || id.length !== 24) {
      return res.status(400).json({ message: "Invalid user or card ID" });
    }

    const cardToDelete = await Card.findById(id);

    if (
      !cardToDelete ||
      cardToDelete.userId.toString() !== user._id.toString()
    ) {
      return res.status(404).json({ message: "Card not found" });
    }

    await Card.findByIdAndDelete(id);

    if (cardToDelete.default) {
      const remainingCards = await Card.find({ userId: user._id });

      if (remainingCards.length > 0) {
        const newDefaultCard = remainingCards[0];
        newDefaultCard.default = true;
        await newDefaultCard.save();
      }
    }

    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getCheckoutData(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
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
      number: "•••• •••• •••• " + card.number.slice(-4),
    }));
    return res.status(200).json({ products, addresses, cards: maskedCards });
  } catch (error) {
    console.error("Error getting checkout data:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id || typeof user._id.toString() !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Retrieve the products in the user's cart
    const cartItems = await Cart.find({ userId: user._id });
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Retrieve the address and card details from the request body
    const { addressId, cardId } = req.body;
    if (!addressId || !cardId) {
      return res
        .status(400)
        .json({ message: "Address or card information is missing" });
    }

    const address = await Address.findById(addressId);
    const card = await Card.findById(cardId);

    if (!address || !card) {
      return res.status(404).json({ message: "Address or card not found" });
    }

    // Calculate the total price
    let totalPrice = 0;
    const products = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId).lean();
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      const totalItemPrice = item.price * item.quantity;
      totalPrice += totalItemPrice;

      products.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // Create a new order
    const newOrder = new Order({
      userId: user._id,
      products,
      totalPrice,
      AddressId: addressId,
      cardId: cardId,
      orderDate: new Date(),
    });

    await newOrder.save();

    // Clear the user's cart
    await Cart.deleteMany({ userId: user._id });

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
