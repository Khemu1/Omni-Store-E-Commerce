import { Router } from "express";
import { getAllProducts } from "../controllers/product";

const productRouter = Router();

productRouter.get("/", getAllProducts);

export default productRouter;
