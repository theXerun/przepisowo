import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function get() {
    const allRecipes = await prisma.recipes.findMany();
    return {
        body: { allRecipes }
    };
}