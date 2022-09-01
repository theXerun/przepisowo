import { Prisma, PrismaClient, type Fridges, type Ingredients } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ locals }) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })
    const userIngredients: {
        Ingredients: Ingredients;
        ingredientQuantity: number;
    }[] = await prisma.fridges.findMany({
        where: {
            ingredientListId: user?.fridgeIngredientsId
        },
        select: {
            Ingredients: true,
            ingredientQuantity: true
        },
        orderBy: {
            Ingredients: {
                ingredientName: 'asc'
            }
        }
    });
    
    return {
        body: { userIngredients }
    };
}

export const POST: RequestHandler = async ( { request, locals }) => {
    const item: {
        Ingredients: Ingredients;
        ingredientQuantity: number;
    } = await request.json();

    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;

    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })

    if (item.ingredientQuantity <= 0) {
        const removeIngredient = await prisma.fridges.deleteMany({
            where: {
                ingredientId: item.Ingredients.ingredientID,
                ingredientListId: user?.fridgeIngredientsId
            }
        })
    }
    const updateIngredient = await prisma.fridges.updateMany({
        where: {
            ingredientId: item.Ingredients.ingredientID,
            ingredientListId: user?.fridgeIngredientsId
        },
        data: {
            ingredientQuantity: item.ingredientQuantity
        }
        
    })

    return {
        status: 200
    }
}