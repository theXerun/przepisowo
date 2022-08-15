<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ props, session }) => {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {
			props: {
				...props,
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
import type { Recipes } from "@prisma/client";

import Przepisy from "./przepisy.svelte";
export let allRecipes: Recipes[];
</script>

<Przepisy {allRecipes} />