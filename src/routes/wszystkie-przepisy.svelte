<script lang="ts">
	import type { Recipes } from '@prisma/client';
	interface Doable {
		doable: boolean;
	}
	export let recipes: (Recipes & Doable)[];
</script>

<main>
	<h1>Wszystkie Przepisy:</h1>

	<div class="flex flex-wrap gap-4 justify-center p-4">
		{#each recipes as recipe}
            {#if !recipe.doable}
            <div class="card w-72 h-72 bg-base-100 shadow-xl border-2 border-red-400">
				<div class="card-body">
					<h2 class="card-title">{recipe.recipeDescription}</h2>
					<p>{recipe.recipeDescription}</p>
					<div class="card-actions justify-end">
						<a href="/przepis/{recipe.recipeId}" class="btn btn-primary">Zrób ten przepis!</a>
					</div>
				</div>
			</div>
            {:else}
            <div class="card w-72 h-72 bg-base-100 shadow-xl border-2 border-green-400">
				<div class="card-body">
					<h2 class="card-title">{recipe.recipeDescription}</h2>
					<p>{recipe.recipeDescription}</p>
					<div class="card-actions justify-end">
						<a href="/przepis/{recipe.recipeId}" class="btn btn-primary">Zrób ten przepis!</a>
					</div>
				</div>
			</div>
            {/if}
		{/each}
	</div>
</main>
