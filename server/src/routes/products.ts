import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product";

const productRouter = Router();

productRouter.get("/product", getProduct);
productRouter.get("/", getAllProducts);

export default productRouter;
