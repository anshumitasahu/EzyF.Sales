import { Router } from "express";
import { requireAuth, requireRole } from "../MiddleWare/auth";
import { getMerchantAnalytics, getPlatfromAnalytics } from "./AnalyticsController";

const analyticsRouter = Router()

analyticsRouter.get("/merchant", requireAuth, requireRole(["merchant"]), getMerchantAnalytics);
analyticsRouter.get("/platfrom", requireAuth, requireRole(["admin"]), getPlatfromAnalytics);

export default analyticsRouter;