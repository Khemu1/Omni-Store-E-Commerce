import { Request, Response, NextFunction, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import User from "../models/accounts";

const accessTokenSecret =
  process.env.JWT_ACCESS_SECRET || "your-access-token-secret";
const refreshTokenSecret =
  process.env.JWT_REFRESH_TOKEN || "your-refresh-token-secret";

const accessTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // Set to true in production
  maxAge: 3600000, // 1 hour
  sameSite: "strict",
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.jwt;
    const refreshToken = req.cookies.refresh;

    if (!accessToken) {
      if (refreshToken) {
        try {
          const decodedRefreshToken: any = jwt.verify(
            refreshToken,
            refreshTokenSecret
          );

          if (decodedRefreshToken) {
            const newAccessToken = jwt.sign(
              {
                userId: decodedRefreshToken.userId,
              },
              accessTokenSecret,
              { expiresIn: "1h" }
            );

            res.cookie("jwt", newAccessToken, accessTokenOptions);
            req.headers.authorization = `Bearer ${newAccessToken}`;
            return res.status(200).json("New access token issued");
          }
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      } else {
        return res.status(401).json({ message: "Token not provided" });
      }
    }

    try {
      const decodedAccessToken: any = jwt.verify(
        accessToken,
        accessTokenSecret
      );
      if (!decodedAccessToken) {
        return res
          .status(403)
          .json({ message: "Invalid or expired access token" });
      }

      const user = await User.findById(decodedAccessToken.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (accessError) {
      console.error("Access token verification error:", accessError);
      return res
        .status(403)
        .json({ message: "Invalid or expired access token" });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
