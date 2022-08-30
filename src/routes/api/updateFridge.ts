import { PrismaClient, type Ingredients, type Recipes } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";
const prisma = new PrismaClient();

export const POST: RequestHandler =async ({params, request, locals}) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const referedRecipeId: number = await request.json()

    //Przepis ze strony
    const recipe = await prisma.recipes.findUnique({
        where: {
            recipeId: Number(referedRecipeId)
        }
    });

    if (!recipe) {
        return {
            status: 404
        }
    }

    // składniki przepisu wraz z ilościami
    const ingredients = await prisma.ingredientList.findMany({
        where: {
            ingredientListId: recipe?.ingredientListId
        }
    })
    // loop zabierający odpowiednią ilość składników z lodówki
    ingredients.forEach(async ingredient => {
        const updateFridge = await prisma.fridges.updateMany({
            where: {
                ingredientListId: userId,
                ingredientId: ingredient.ingredientId
            },
            data: {
                ingredientQuantity: {
                    decrement: ingredient.ingredientQuantity
                }
            }
        });
        
    });
    

    //console.log(updateFridge);
    
    
    return {
        status: 200
    }
}