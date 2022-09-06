import { Prisma, PrismaClient, type Fridges, type Recipes } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ locals }) => {

    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const BreakError = {};
    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })

    const fridgeContent: Fridges[] = await prisma.fridges.findMany({
        where: {
            ingredientListId: user?.fridgeIngredientsId
        }
    })

    let findIngredientQuantityInFridge = (ingredientId: number) => {
        let f = fridgeContent.find(e => e.ingredientId === ingredientId);
        if (f) {
            return f.ingredientQuantity;
        }
        return 0;
    }

    const allRecipes: Recipes[] = await prisma.recipes.findMany({
        where: {
            ownerId: {
                in: [1, userId]
            }
        }
    })
    const doableRecipesPromise = async (): Promise<Recipes[]> => {
        let tempResults: Recipes[] = [];

        for (const recipe of allRecipes) {
            const ingredients = await prisma.ingredientList.findMany({
                where: {
                    ingredientListId: recipe.ingredientListId
                }
            });
            // Try catch żeby wyjść z pętli foreach
            try {
                ingredients.forEach(element => {
                    if (element.ingredientQuantity > findIngredientQuantityInFridge(element.ingredientId)) {
                        throw BreakError;
                    }
                });
            } catch (err) {
                if (err !== BreakError) throw err;
                continue;
            }
            tempResults.push(recipe);
        }
        return tempResults;
    };

    const doableRecipes = await doableRecipesPromise()

    return {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        body: { doableRecipes }
    };
}