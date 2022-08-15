import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/api/_db';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = { login: session.login };
			return resolve(event);
		}
	}

	event.locals.user = null;
	return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	return event?.locals?.user
		? {
				user: {
					login: event.locals.user.login,
				},
		  }
		: {};
}