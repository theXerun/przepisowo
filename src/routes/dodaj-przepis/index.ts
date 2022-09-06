import { Prisma, PrismaClient, type IngredientList, type Ingredients } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();
interface quantity {
    quantity: number;
}

export const GET: RequestHandler = async ({request, locals}) => {
    
    const ingredients = await prisma.ingredients.findMany({
        orderBy: {
            ingredientName: 'asc'
        }
    });
    return {
        body: {ingredients}
    }
}

export const POST: RequestHandler = async ({request, locals}) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;

    const data: {
        recipeTitle: string,
        recipeSteps: string,
        selectedIngredients: (Ingredients & quantity)[]
    } = await request.json();

    const maxRecipeId = await prisma.recipes.aggregate({
        _max: {
            recipeId: true
        }
    })
    const maxIngredientListId = await prisma.ingredientList.aggregate({
        _max: {
            ingredientListId: true
        }
    })
    if (!maxRecipeId._max.recipeId) {
        return {
            status: 500
        }
    }
    if (!maxIngredientListId._max.ingredientListId) {
        return {
            status: 500
        }
    }
    const newRecipe = await prisma.recipes.create({
        data: {
            recipeId: maxRecipeId._max.recipeId + 1,
            recipeSteps: data.recipeSteps,
            recipeDescription: data.recipeTitle,
            ingredientListId: maxIngredientListId._max.ingredientListId + 1,
            ownerId: userId
        }
    });
    
    
    let dataIngredientList: {
        ingredientListId: number,
        ingredientId: number,
        ingredientQuantity: number
    }[] = [];

    data.selectedIngredients.forEach(element => {
        let i = {
            ingredientListId: newRecipe.ingredientListId,
            ingredientId: element.ingredientID,
            ingredientQuantity: element.quantity
        };
        dataIngredientList.push(i)
    });
    const newIngredientList = await prisma.ingredientList.createMany({
        data: dataIngredientList
    });
    

    return {
        status: 200
    }
}