<script lang="ts">
    import type { IngredientList, Ingredients, Recipes } from "@prisma/client";
    export let recipe: Recipes;
    export let ingredients: (IngredientList & {
    Ingredients: Ingredients;
})[];

</script>
<main>
<h1>{recipe.recipeDescription}</h1>

<h2>Składniki:</h2>

{#each ingredients as ingredient}
    <p>{ingredient.Ingredients.ingredientName} - {ingredient.ingredientQuantity} {ingredient.Ingredients.quantityType}</p>
{/each}

<h2>Kroki:</h2>
<p>{recipe.recipeSteps}</p>
</main>