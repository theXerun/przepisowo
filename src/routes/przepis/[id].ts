import { Prisma, PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
    
    const recipe = await prisma.recipes.findUnique({
        where: {
            recipeId: Number(params.id)
        }
    });
    
    const ingredients = await prisma.ingredientList.findMany({
        where: {
            ingredientListId: recipe?.ingredientListId
        },
        include: {
            Ingredients: true
        }
    })

    return {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: { recipe, ingredients }
    };
}