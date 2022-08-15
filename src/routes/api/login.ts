import { createSession, authenticate } from './_db';
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST( { request } ) {
    const { login, password } = await request.json();
    const user = await authenticate(login, password);

    if (!user) {
     return {
         status: 401,
         body: {
             message: 'Błędny login lub hasło',
         },
     };
    }

    const { id } = await createSession(login);
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
         user: login
     },
    };
}