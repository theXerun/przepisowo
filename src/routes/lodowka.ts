import { Prisma, PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export async function GET() {
    const userIngredients = await prisma.ingredients.findMany();
    return {
        body: { userIngredients }
    };
}