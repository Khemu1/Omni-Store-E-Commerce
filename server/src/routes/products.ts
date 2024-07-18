import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product";

const productsRouter = Router();

productsRouter.get("/product", getProduct);
productsRouter.get("/", getAllProducts);

export default productsRouter;
