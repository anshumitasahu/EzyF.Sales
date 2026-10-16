import { Router } from "express";
import { requireAuth, requireRole } from "../MiddleWare/auth";
import { createProduct, deleteProduct, updateProduct } from "./productControllers";

const productRouter = Router();

productRouter.post("/", requireRole(["merchant"]), createProduct);
productRouter.put("/", requireAuth, requireRole(["merchant"]), updateProduct);
productRouter.delete("/", requireAuth, requireRole(["merchant"]), deleteProduct);

export default productRouter;