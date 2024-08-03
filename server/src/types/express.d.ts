// express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username?: string;
      };
      address?: {
        name: string;
        street: string;
        city: string;
        country: string;
        zipCode: string;
      };
      card?: {
        name: string;
        number: string;
        type: string;
        cvc: string;
        expiry: string;
      };
    }
  }
}
