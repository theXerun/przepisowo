<script lang="ts">
	import type { Recipes } from "@prisma/client";

	export let doableRecipes: Recipes[];
	const randomRecipe = doableRecipes[Math.floor(Math.random() * doableRecipes.length)];
</script>

<main>
	{#if doableRecipes.length === 0}
		<h1>Brak przepisów :C</h1>
		<p>Dodaj rzeczy do lodówki żeby móc coś ugotować</p>
	{:else}
	<h1>Losowo wybrany przepis</h1>
	<div class="flex flex-wrap gap-4 justify-center p-4">
		<div class="card w-72 h-72 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{randomRecipe.recipeDescription.slice(0,22)}</h2>
				<p>{randomRecipe.recipeSteps.slice(0, 100)}</p>
				<div class="card-actions justify-end">
					<a href="/przepis/{randomRecipe.recipeId}" class="btn btn-primary">Zrób ten przepis!</a>
				</div>
			</div>
		</div>
	</div>
	<h1>Przepisy do wypróbowania:</h1>
	<div class="flex flex-wrap gap-4 justify-center p-4">
		{#each doableRecipes.slice(0, 20) as recipe}
			<div class="card w-72 h-72 bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{recipe.recipeDescription.slice(0,22)}</h2>
					<p>{recipe.recipeSteps.slice(0, 100)}</p>
					<div class="card-actions justify-end">
						<a href="/przepis/{recipe.recipeId}" class="btn btn-primary">Zrób ten przepis!</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
	{/if}
</main>