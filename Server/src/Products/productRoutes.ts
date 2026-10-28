import { Router } from "express";
import { requireAuth, requireRole } from "../MiddleWare/auth";
import { createProduct, deleteProduct, getProducts, updateProduct } from "./productControllers";

const productRouter = Router();

productRouter.get("/", requireAuth, requireRole(["merchant"]), getProducts)
productRouter.post("/", requireAuth, requireRole(["merchant"]), createProduct);
productRouter.put("/:id", requireAuth, requireRole(["merchant"]), updateProduct);
productRouter.delete("/:id", requireAuth, requireRole(["merchant"]), deleteProduct);

export default productRouter;