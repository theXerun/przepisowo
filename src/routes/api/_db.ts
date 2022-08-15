import { v4 as uuidv4, type V4Options } from 'uuid';
import { Prisma, PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
export const prisma = new PrismaClient();
export type Session = {
    id: string
    login: String
}
export let sessions: Session[] = [];

export const authenticate = async (login: String, password: String) => {
    let existingUser = await prisma.users.findFirst({
        where: {
            username: login.toString(),
            password: password.toString()
        }
    });
    if (!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
};

// export const registerUser = (user) => {
//     const existingUser = users.find((u) => u.email === user.email);
//     if (!!existingUser) return Promise.reject(new Error('User already exists'));
//     users.push(user);
//     return Promise.resolve(user);
// };

export const createSession = (login: String) => {
    const session: Session = {
     id: uuidv4(),
     login,
    };
    sessions.push(session);
    return Promise.resolve(session);
};

export const getSession = (id: string) => {
    const session = sessions.find((session) => session.id === id);
    if (!session) return Promise.resolve(null);
    return Promise.resolve(session);
};

export const removeSession = (id: string) => {
    const session = sessions.find((session) => session.id === id);
    if (!session) return Promise.reject(new Error('Session not found'));
    sessions = sessions.filter((session) => session.id !== id);
    return Promise.resolve(session);
};