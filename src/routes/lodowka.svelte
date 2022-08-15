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
import type { Ingredients } from "@prisma/client";
export let userIngredients: Ingredients[];
</script>

<main>
    <h1>Lodówka</h1>
    <p>Tu będą produkty wraz z ilościami i możliwość ich dodawania, usuwania itd</p>
    {#each userIngredients as i}
        <p>{i.ingredientName}</p>
    {/each}
</main>
