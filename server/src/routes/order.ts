import { Router } from "express";
import { getOrders, createOrder } from "../controllers/order";
import { authenticateToken } from "../middlewares/cookie";

const orderRouter = Router();

orderRouter.post("/add-order", authenticateToken, createOrder);
orderRouter.get("/get-orders", authenticateToken, getOrders);

export default orderRouter;
