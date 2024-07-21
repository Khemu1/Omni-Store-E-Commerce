import mongoose from "mongoose";
import User from "../models/accounts";

declare global {
  namespace Express {
    interface Request {
      user: typeof User;
    }
  }
}
