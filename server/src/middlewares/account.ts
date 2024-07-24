import { ValidationError } from "yup";
import {
  getValidateLoginSchema,
  getValidateRegisterSchema,
  transformYupErrorsIntoObject,
} from "../utils/utils";
import { Request, Response, NextFunction } from "express";

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
