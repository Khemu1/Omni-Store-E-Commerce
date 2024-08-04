import { NextFunction,Request,Response } from "express";
import { CardFormProps } from "../types";
import { getCardSchema, transformYupErrorsIntoObject } from "../utils/utils";
import { ValidationError } from "yup";

export async function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, number, type, cvc, expiry }: CardFormProps = req.body;
    await getCardSchema().validate(
      {
        name,
        number,
        type,
        cvc,
        expiry,
      },
      { abortEarly: false }
    );
    req.card = { name, number, type, expiry, cvc };
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
