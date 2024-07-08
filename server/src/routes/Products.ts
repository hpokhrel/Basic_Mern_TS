import express from "express";
const productRoute = express.Router();
import {
  postProducts,
  getProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
  getFilteredProducts,
} from "../controllers/Products";

productRoute.post("/postproducts", postProducts);
productRoute.get("/getproducts", getProducts);
productRoute.patch("/updateProducts/:id", updateProducts);
productRoute.delete("/deleteProducts/:id", deleteProducts);
productRoute.get("/getproducts/:id", getProductsById);

productRoute.get("/filtered", getFilteredProducts);

export default productRoute;
