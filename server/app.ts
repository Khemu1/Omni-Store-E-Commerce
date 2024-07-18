import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import {productsRouter,accountRouter} from "./src/routes/index";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/products", productsRouter);
app.use("account",accountRouter)
export default app;
