import User from "../models/accounts";
import { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";

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
        username: newUser.username,
      },
      accessTokenSecret,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
      },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, accessTokenOptions);
    res.cookie("refresh", refreshToken, refreshTokenOptions);
    return res.status(201).json({
      username: newUser.username,
      id: newUser._id,
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
          username: findUser.username,
        },
        accessTokenSecret,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          userId: findUser._id,
          username: findUser.username,
        },
        refreshTokenSecret,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", accesstoken, accessTokenOptions);
      res.cookie("refresh", refreshToken, refreshTokenOptions);
      return res.status(200).json({
        username: findUser.username,
        id: findUser._id,
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
    const { id } = req.user;
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({ username: user.username, id: user._id });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
