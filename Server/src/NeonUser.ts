import { prisma } from "../lib/prisma"

export interface NeonUserRecord {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    createdAt?: Date | null;
}

export const findNeonUser = async (filter: { id?: string, email?: string }): Promise<NeonUserRecord | null> => {
    try {
        if (filter.id) {
            const rows = await prisma.$queryRaw<NeonUserRecord[]>`
            SELECT id, name, email, role, "createdAt" as "createdAt"
            FROM neon_auth.user
            WHERE id = ${filter.id}::uuid
            LIMIT 1
            `;

            return rows[0] || null;
        }


        if (filter.email) {
            const rows = await prisma.$queryRaw<NeonUserRecord[]>`
            SELECT id, name, email, role, "createdAt" as "createdAt"
            FROM neon_auth.user
            WHERE LOWER(email) = ${filter.email?.trim().toLowerCase()}
            LIMIT 1
            `;
            return rows[0] || null;
        }


    } catch (error) {
        console.error(error);
    }

    return null;
}