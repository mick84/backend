import express from "express";
import cors from "cors";
import productRouter from "./routes/ProductRouter.js";
import mongoose from "mongoose";
export const PATHS = { PRODUCTS: "/products" };
const URL = `mongodb://127.0.0.1:27017${PATHS.PRODUCTS}`;
mongoose.connect(URL, (error, connection) => {
  if (error) {
    return console.log(error);
  }
  if (!process.env.NODE_ENV) {
    const { host, port, name } = connection;
    console.log({ host, port, name });
  }
});
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello from app!"));
app.use(PATHS.PRODUCTS, productRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
