import { Router } from "express";
import { createCategory, deleteCategory, getCategories } from "./categoryController";
import { requireAuth, requireRole } from "../MiddleWare/auth";

const categoryRouter = Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/", requireAuth, requireRole(["merchant"]), createCategory)
categoryRouter.delete("/:id", requireAuth, requireRole(["merchant"]), deleteCategory)

export default categoryRouter;