import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose"
import { findNeonUser } from "../NeonUser";
import { prisma } from "../../lib/prisma";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "merchant" | "customer";
    stored_id?: number | null;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthUser;
}

const NEON_AUTH_JWKS_URL = process.env.NEON_AUTH_JWKS_URL;
const NEON_AUTH_BASE_URL = process.env.NEON_AUTH_BASE_URL;


let neonJWKS: ReturnType<typeof createRemoteJWKSet> | null = null;
let neonIssuer = "";

try {
    if (NEON_AUTH_JWKS_URL) {
        neonJWKS = createRemoteJWKSet(new URL(NEON_AUTH_JWKS_URL))
    }
    if (NEON_AUTH_BASE_URL) {
        neonIssuer = new URL(NEON_AUTH_BASE_URL).origin;
    }
} catch (error) {
    console.warn("Neon Auth JWKS initialization waring:", error);
}

export const VerifyAuthToken = async (token: string): Promise<AuthUser | null> => {
    if (!token || !neonJWKS || !neonIssuer) return null;
    try {
        const { payload } = await jwtVerify(token, neonJWKS, { issuer: neonIssuer })
        if (!payload || (!payload.sub && !payload.email)) {
            return null;
        }
        const userEmail = String(payload.email || "").toLowerCase();
        const userId = String(payload.sub || payload.id)
        const u = await findNeonUser({
            ...(userId ? { id: userId } : {}),
            ...(userEmail ? { email: userEmail } : {}),
        });

        const effectiveId = u?.id || userId;
        const effectiveName = u?.name || String(payload.name || userEmail.split("@")[0]);
        const effectiveEmail = u?.email || userEmail;

        const store = await prisma.stores.findFirst({ where: { merchant_id: effectiveId } })

        let role: "admin" | "merchant" | "customer" = "customer";
        if (u?.role === "admin" || payload.role === "admin" || effectiveEmail.includes("admin@")) {
            role = "admin";
        } else if (store || u?.role === "merchant" || payload.role === "merchant") {
            role = "merchant"
        }

        return {
            id: effectiveId,
            name: effectiveName,
            email: effectiveEmail,
            role,
            stored_id: role === "admin" ? null : store?.id || null,
        }

    } catch {
        return null;
    }
}

export const requrieAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
        return;
    }

    const token = authHeader.split(" ")[1];
    const user = await VerifyAuthToken(token);

    if (!user) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
        return;
    }

    req.user = user;
    next()
}

export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const user = await VerifyAuthToken(token);
        if (user) {
            req.user = user;
        }
    }
    next()
}

export const requrieRole = async (roles: Array<"admin" | "merchant" | "customer">) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: "Forbidden: Access denied" });
            return;
        }
        next();
    }
}