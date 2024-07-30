import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  toggleWishList,
  removeWishListItem,
  addProductToCart,
  ChangeCartAmount,
} from "../controllers/product";
import { authenticateToken } from "../middlewares/cookie";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/product", getProduct);
productsRouter.post("/toggle-wishlist", authenticateToken, toggleWishList);
productsRouter.delete(
  "/remove-from-wishlist",
  authenticateToken,
  removeWishListItem
);
productsRouter.post("/add-to-cart", authenticateToken, addProductToCart);

productsRouter.post(
  "/change-cart-amount",
  authenticateToken,
  ChangeCartAmount
);

export default productsRouter;
