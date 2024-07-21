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
    console.error("Validation errors:", errors);
    res.status(400).json({ errors: transformYupErrorsIntoObject(errors) });
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
    console.error("Validation errors:", errors);
    res.status(400).json({ errors: transformYupErrorsIntoObject(errors) });
  }
}
