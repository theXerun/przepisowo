import { Prisma, PrismaClient, type Fridges, type Ingredients } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({locals}) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })
    const availableIngredientTypes = await prisma.ingredients.findMany({
        where:{
            Fridges: {
                none: {
                    ingredientListId: user?.fridgeIngredientsId
                }
            }
        },
        orderBy: {
            ingredientName: 'asc'
        }
    });
    
    return {
        body: { availableIngredientTypes }
    };
}

export const POST: RequestHandler = async ( {request, locals} ) => {
    let userId: number = (!locals.user?.userId) ? 1 : locals.user.userId;
    const newIngredient: {
        selected: Ingredients,
        quantity: number
    } = await request.json();
    
    const user = await prisma.users.findUnique({
        where: {
            uId: userId
        }
    })
    
    const addIngredient = await prisma.fridges.create({
        data: {
            ingredientListId: user?.fridgeIngredientsId,
            ingredientId: newIngredient.selected.ingredientID,
            ingredientQuantity: newIngredient.quantity,
        }
    })
    
    return {
        status: 200
    }
}