import { Prisma, PrismaClient, type Recipes } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ locals }) => {

    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    
    // Nienatywne zapytanie ze względu na jego złożoność
    // Dodatkowo rzutowane na typ Recipes[]
    const allRecipes: Recipes[] = await prisma.$queryRaw`SELECT DISTINCT "recipeId", "recipeSteps", "recipeDescription", R."ingredientListId" FROM public."Recipes" R JOIN "IngredientList" IL on R."ingredientListId" = IL."ingredientListId" JOIN "Fridges" F on IL."ingredientId" = F."ingredientId" WHERE F."ingredientQuantity" >= IL."ingredientQuantity" AND F."ingredientListId" = ${userId}`;

    
    return {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: { allRecipes }
    };
}