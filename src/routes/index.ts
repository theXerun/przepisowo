import { Prisma, PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
    const allRecipes = await prisma.recipes.findMany();
    return {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: { allRecipes }
    };
}