import { Router } from "express";
import { requireAuth, requireRole } from "../MiddleWare/auth";
import { createStore, getAllMerchants, getAllStores, getMyStore, onboardMerchant, toggleStoreStatus, updateMyStore } from "../Store/storeController";

const storeRouter = Router();

storeRouter.post("/", requireAuth, createStore);
storeRouter.post("/onboard-merchant", requireAuth, onboardMerchant);
storeRouter.get("/me", requireAuth, getMyStore);
storeRouter.put("/me", requireAuth, updateMyStore);

storeRouter.get("/admin/all", requireAuth, requireRole(["admin"]), getAllStores);
storeRouter.get("/admin/merchants", requireAuth, requireRole(["admin"]), getAllMerchants);
storeRouter.patch("/admin/:storeId/status", requireAuth, requireRole(["admin"]), toggleStoreStatus);

export default storeRouter;