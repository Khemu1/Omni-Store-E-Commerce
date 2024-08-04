import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import {
  accountRouter,
  productsRouter,
  wishListRouter,
  orderRouter,
  cardRouter,
  checkoutRouter,
} from "./src/routes/index";
import cartRouter from "./src/routes/cart";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/product", productsRouter);
app.use("/account", accountRouter);
app.use("/wishlist", wishListRouter);
app.use("/order", orderRouter);
app.use("/paytment-method", cardRouter);
app.use("/checkout", checkoutRouter);
app.use("/cart", cartRouter);





export default app;
