import { Router } from "express";
import { authenticateToken } from "../middlewares/cookie";
import { getCheckoutData } from "../controllers/checkout";

const checkoutRouter = Router();

checkoutRouter.get("/get-checkout-data", authenticateToken, getCheckoutData);

export default checkoutRouter;
