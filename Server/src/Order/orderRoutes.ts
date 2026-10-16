import { Router } from "express";
import { createOrder, getCustomerOrders, getMerchantOrders, getOrderRecipt, updateOrderStatus } from "./orderController";
import { optionalAuth, requireAuth, requireRole } from "../MiddleWare/auth";

const orderRouter = Router();

orderRouter.post("/checkout", optionalAuth, createOrder);
orderRouter.get("/receipt/:orderIdentifier", getOrderRecipt);
orderRouter.get("/customer/myOrders", requireAuth, getCustomerOrders);
orderRouter.get("/merchant", requireAuth, requireRole(["merchant"]), getMerchantOrders);
orderRouter.patch("/merchant", requireAuth, requireRole(["merchant"]), updateOrderStatus);

export default orderRouter;