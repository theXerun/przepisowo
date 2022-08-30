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
	import type { Fridges, IngredientList, Ingredients, Recipes } from '@prisma/client';
	import { goto } from '$app/navigation';
	export let recipe: Recipes;
	export let ingredients: (IngredientList & {
		Ingredients: Ingredients;
	})[];
	export let fridgeContent: Fridges[];

    const removeFromFridge = async () => {
        const response = await fetch("/api/updateFridge", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipe.recipeId)
		});
        if (response.ok){
            console.log("OK")
			await goto("/")
        }
    }

	let findIngredientQuantityInFridge = (ingredientId: number) => {
		let f = fridgeContent.find(e => e.ingredientId === ingredientId);
		if (f) {
			return f.ingredientQuantity;
		}
		return 0;
	}


	let isRecipeDoable = () => {
		if (ingredients.length != fridgeContent.length) {
			return false
		}
		for (const element of ingredients) {
			if (element.ingredientQuantity > findIngredientQuantityInFridge(element.ingredientId)) {
				return false;
			}
		}
		return true
	}
</script>

<main>
	<h1>{recipe.recipeDescription}</h1>
	<div class="p-6">
		<h2>Składniki:</h2>
		{#each ingredients as ingredient}
			{#if ingredient.ingredientQuantity > findIngredientQuantityInFridge(ingredient.ingredientId)}
				<p class="text-error">
					{ingredient.Ingredients.ingredientName} - {ingredient.ingredientQuantity}{ingredient
						.Ingredients.quantityType} brakuje {ingredient.ingredientQuantity -
						findIngredientQuantityInFridge(ingredient.ingredientId)}{ingredient.Ingredients
						.quantityType}
				</p>
			{:else}
				<p>
					{ingredient.Ingredients.ingredientName} - {ingredient.ingredientQuantity}
					{ingredient.Ingredients.quantityType}
				</p>
			{/if}
		{/each}
	</div>
	<div class="p-6">
		<h2>Kroki:</h2>
		<p>{recipe.recipeSteps}</p>
	</div>
	{#if isRecipeDoable()}
		<div class="p-6">
			<button on:click={removeFromFridge} class="btn btn-primary">Zrobione!</button>
			<p class="text-sm">
				Kliknięcie powyższego przycisku oznacza, że przepis został już wykonany i można odjąć
				wymagane składniki z lodówki.
			</p>
		</div>
	{/if}
</main>
