import User from "../models/accounts";
import { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import WishList from "../models/wishlist";
import Product from "../models/product";
import { CartProps, ProductProps, WishListProps } from "../types";
import Cart from "../models/cart";
import Address from "../models/address";
import { AddressProps } from "../types/index";

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
    if (!user || !user._id || typeof user._id.toString() !== "string") {
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

export async function getCheckoutData(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [cartItems, defaultAddress] = await Promise.all([
      Cart.find({ userId: user._id }).lean(),
      Address.findOne({ userId: user._id, default: true }),
    ]);

    if (!cartItems || !defaultAddress) {
      return res
        .status(404)
        .json({ message: "Cart items or default address not found" });
    }

    const products: ProductProps[] = (
      await Promise.all(  // somthing new
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
    return res.status(200).json({ products, defaultAddress });
  } catch (error) {
    console.error("Error getting checkout data:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
