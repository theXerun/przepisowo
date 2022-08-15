<script lang="ts">
	import type { Recipes } from "@prisma/client";

	export let allRecipes: Recipes[];

	const randomRecipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];
</script>

<main>
	<h1>Losowo wybrany przepis</h1>
	<div class="flex flex-wrap gap-4 justify-center p-4">
		<div class="card w-72 h-72 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{randomRecipe.recipeDescription}</h2>
				<p>{randomRecipe.recipeDescription}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Zrób ten przepis!</button>
				</div>
			</div>
		</div>
	</div>
	<h1>Przepisy do wypróbowania:</h1>
	<div class="flex flex-wrap gap-4 justify-center p-4">
		{#each allRecipes.slice(0, 20) as recipe}
			<div class="card w-72 h-72 bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{recipe.recipeDescription}</h2>
					<p>{recipe.recipeDescription}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Zrób ten przepis!</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>