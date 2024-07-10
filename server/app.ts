import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import productRouter from "./src/routes/products";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/products", productRouter);
export default app;
