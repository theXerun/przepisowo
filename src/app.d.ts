/// <reference types="@sveltejs/kit" />

interface SessionData {
	// Your session data
	views: number;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	//interface Locals {}
	// interface Platform {}
	interface Session {
		user?: {login: string}
	}
	// interface Stuff {}
}
