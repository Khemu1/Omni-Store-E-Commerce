import { ValidationError } from "yup";
import {
  getAddressSchema,
  getValidateLoginSchema,
  getValidateRegisterSchema,
  transformYupErrorsIntoObject,
} from "../utils/utils";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/accounts";
import { count } from "console";
const accessTokenSecret =
  process.env.JWT_ACCESS_SECRET || "your-access-token-secret";

export async function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password, emailOrMobile } = req.body.data;
    await getValidateLoginSchema().validate(
      {
        emailOrMobile,
        password,
      },
      { abortEarly: false }
    );
    next();
  } catch (errors) {
    if (errors instanceof ValidationError) {
      console.error("Validation errors:", errors);
      res.status(400).json({ errors: transformYupErrorsIntoObject(errors) });
    } else {
      console.error("Unexpected error:", errors);
      res.status(500).json({ errors: "Internal server error" });
    }
  }
}

export async function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, username, mobileNumber, countryCode } =
      req.body.data;
    await getValidateRegisterSchema(countryCode, mobileNumber).validate(
      {
        password,
        mobileNumber,
        email,
        username,
      },
      { abortEarly: false }
    );
    next();
  } catch (errors) {
    if (errors instanceof ValidationError) {
      console.error("Validation errors:", errors);
      res.status(400).json({ errors: transformYupErrorsIntoObject(errors) });
    } else {
      console.error("Unexpected error:", errors);
      res.status(500).json({ errors: "Internal server error" });
    }
  }
}

export async function validateCurrentUser(req: Request, res: Response) {
  {
    try {
      const accessToken = req.cookies.jwt;

      if (!accessToken) {
        return res.status(401).json({ message: "Token not provided" });
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
        return res.status(200).json({ message: "valid access token" });
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
  }
}

export async function validateAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, street, city, zipCode, country } = req.body;
    await getAddressSchema().validate(
      {
        name,
        street,
        city,
        zipCode,
        country,
      },
      { abortEarly: false }
    );
    req.address = { name, street, city, zipCode, country };
    next();
  } catch (errors) {
    if (errors instanceof ValidationError) {
      console.error("Validation errors:", errors);
      res.status(400).json({ errors: transformYupErrorsIntoObject(errors) });
    } else {
      console.error("Unexpected error:", errors);
      res.status(500).json({ errors: "Internal server error" });
    }
  }
}
