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

export async function getUserBasicInfo(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const user = await User.findById(id);

    if (user) {
      return res
        .status(200)
        .json({ username: user.username, id: user._id, email: user.email ,mobileNumber : user.mobileNumber});
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
export async function getUserInfo(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const user = await User.findById(id);

    if (user) {
      const { username, email, password, mobileNumber } = user;
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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const { username } = req.body;

    const user = await User.findByIdAndUpdate(id, { username }, { new: true });

    if (user) {
      return res.status(200).json({ username: user.username });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateEmail(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const { email } = req.body;

    const user = await User.findByIdAndUpdate(id, { email }, { new: true });

    if (user) {
      return res.status(200).json({ email: user.email });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const findUser = await User.findById(id).select("password");
    if (findUser.password === currentPassword) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user;
    const { mobileNumber } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { mobileNumber },
      { new: true }
    );

    if (user) {
      return res.status(200).json({ mobileNumber: user.mobileNumber });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
