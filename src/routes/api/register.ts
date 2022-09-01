import { createSession, authenticate, registerUser } from './_db';
import { serialize } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
    const { login, password } = await request.json();
    const user = await authenticate(login, password);

    if (user) {
        return {
            status: 401,
            body: {
                message: 'Użytkownik już istnieje',
            },
        };
    }
    const registeredUser = await registerUser(login, password);
    let uId = registeredUser.uId
    const { id } = await createSession(login, uId);
    return {
        status: 200,
        headers: {
            'Set-Cookie': serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 tydzień
            }),
        },
        body: {
            user: { login, uId }
        },
    };
}