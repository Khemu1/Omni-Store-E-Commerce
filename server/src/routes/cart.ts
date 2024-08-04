import { Router } from "express";
import {
  ChangeCartAmount,
  addProductToCart,
  getCartItems,
  clearCart,
} from "../controllers/cart";
import { authenticateToken } from "../middlewares/cookie";

const cartRouter = Router();

cartRouter.get("/user-cart", authenticateToken, getCartItems);
cartRouter.post("/add-to-cart", authenticateToken, addProductToCart);
cartRouter.post("/change-cart-amount", authenticateToken, ChangeCartAmount);
cartRouter.delete("/clear-cart", authenticateToken, clearCart);

export default cartRouter;
