import express from "express";
import { AdminLogin } from "./AdminLoginController";

const router = express.Router();

router.post("/login", AdminLogin);

export default router;