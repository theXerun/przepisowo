/// <reference types="@sveltejs/kit" />

interface SessionData {
	// Your session data
	views: number;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user?: {
			login: string,
			userId: number
		}
	}
	// interface Platform {}
	interface Session {
		user?: {
			login: string,
			uid: number
		}
	}
	// interface Stuff {}
}
