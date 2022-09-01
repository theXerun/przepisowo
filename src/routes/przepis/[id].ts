import { Prisma, PrismaClient, type Ingredients, type Recipes } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params, locals }) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })
    const recipe = await prisma.recipes.findUnique({
        where: {
            recipeId: Number(params.id)
        }
    });

    if (!recipe) {
        return {
            status: 404
        }
    }
    
    const ingredients = await prisma.ingredientList.findMany({
        where: {
            ingredientListId: recipe?.ingredientListId
        },
        include: {
            Ingredients: true
        }
    })

    let ingredientIds: number[] = [];
    ingredients.forEach(i => {
        ingredientIds.push(i.ingredientId)
    })

    const fridgeContent = await prisma.fridges.findMany({
        where: {
            ingredientListId: user?.fridgeIngredientsId,
            ingredientId: {
                in: ingredientIds
            }
        }
    })

    return {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: { recipe, ingredients, fridgeContent }
    };
}