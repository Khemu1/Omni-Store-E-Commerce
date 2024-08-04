import { Router } from "express";
import { authenticateToken } from "../middlewares/cookie";
import {
  getWishList,
  toggleWishList,
  removeWishListItem,
  clearWishList,
} from "../controllers/wishlist";

const wishListRouter = Router();

wishListRouter.get("/user-wishlist", authenticateToken, getWishList);
wishListRouter.post("/toggle-wishlist", authenticateToken, toggleWishList);
wishListRouter.delete(
  "/remove-from-wishlist",
  authenticateToken,
  removeWishListItem
);
wishListRouter.delete("/clear-wishlist", authenticateToken, clearWishList);

export default wishListRouter;
