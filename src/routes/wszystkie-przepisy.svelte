<script lang="ts">
import type { Recipes } from "@prisma/client";

    export let allRecipes: Recipes[];

</script>

<main>

    <h1>Wszystkie Przepisy:</h1>

<div class="flex flex-wrap gap-4 justify-center p-4">
    {#each allRecipes.slice(0, 20) as recipe}
        <div class="card w-72 h-72 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{recipe.recipeDescription}</h2>
                <p>{recipe.recipeDescription}</p>
                <div class="card-actions justify-end">
                    <a href="/przepis/{recipe.recipeId}" class="btn btn-primary">Zrób ten przepis!</a>
                </div>
            </div>
        </div>
    {/each}
</div>
</main>