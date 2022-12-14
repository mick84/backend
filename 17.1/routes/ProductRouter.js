import { Router } from "express";
import { Product } from "../models/Product.js";
const router = Router();
router.get("/", (req, res) => {
  res.send("products");
});
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json(error);
  }
});
export default router;
