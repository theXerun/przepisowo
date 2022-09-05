import { Prisma, PrismaClient, type Fridges, type Recipes } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler =async ({request, locals}) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const ingredients = await prisma.ingredients.findMany({
        orderBy: {
            ingredientName: 'asc'
        }
    });
    return {
        body: {ingredients}
    }
}