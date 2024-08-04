import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product";
import { isLoggedIn } from "../middlewares/account";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/product", isLoggedIn, getProduct);

export default productsRouter;
