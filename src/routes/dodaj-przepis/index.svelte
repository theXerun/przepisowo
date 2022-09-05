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
	interface quantity {
		quantity: number;
	}
	import type { Ingredients } from '@prisma/client';
	let selected: Ingredients | undefined;
	export let ingredients: Ingredients[];
	let selectedIngredients: (Ingredients & quantity)[] = [];
	let selectedIngredientId: number;
	let selectedIngredientQuantity: number;
    let recipeTitle: string;
	let recipeSteps: string;
	let errorText: string;

	const findIngredientName = (id: number) => {
		let i = ingredients.find((e) => e.ingredientID == selectedIngredientId);
		if (i) {
			return i.ingredientName;
		}
		return 'n';
	};
	const findIngredientQuantityType = (id: number) => {
		let i = ingredients.find((e) => e.ingredientID == selectedIngredientId);
		if (i) {
			return i.quantityType;
		}
		return 'g';
	};

	const addIngredient = () => {
		if (!selected) {
			errorText = 'Nie wybrałeś składnika';
			return;
		}
		if (isNaN(selectedIngredientQuantity)) {
			errorText = 'Wpisz liczbę';
			return;
		}
		selectedIngredientId = Number(selected.ingredientID);
		if (selectedIngredients.find((e) => e.ingredientID === selectedIngredientId)) {
			let index = selectedIngredients.findIndex((e) => e.ingredientID === selectedIngredientId);
			console.log(index);
			selectedIngredients[index].quantity = Number(selectedIngredientQuantity);
			console.log(selectedIngredients);
			return;
		}

		let selectedIngredient: (Ingredients & quantity) | undefined = {
			ingredientID: Number(selectedIngredientId),
			ingredientName: findIngredientName(selectedIngredientId),
			quantity: Number(selectedIngredientQuantity),
			quantityType: findIngredientQuantityType(selectedIngredientId)
		};

		selectedIngredients.push(selectedIngredient);

		// inaczej kompilator nie ogarnia że się coś zmieniło
		selectedIngredients = selectedIngredients;
		errorText = '';
		console.log(selectedIngredients);
	};
	const removeIngredient = (index: number) => {
		selectedIngredients.splice(index, 1);
		selectedIngredients = selectedIngredients;
	};
</script>

<main>
	{#if errorText}
		<p class="text-error">{errorText}</p>
	{/if}
    <h1>Nazwa przepisu:</h1>
    <div class="flex flex-row flex-wrap place-content-around content-center items-center justify-center">
        <input type="text" placeholder="Wpisz nazwę przepisu" bind:value={recipeTitle} class="input input-bordered input-primary w-full max-w-xs" />
    </div>
    
	<h1>Składniki:</h1>
	<div class="overflow-x-auto w-1/2 max-w-sm">
		<table class="table w-full">
			<tbody>
				{#each selectedIngredients as i, index}
					<tr>
						<th>{index + 1}</th>
						<td>{i.ingredientName}</td>
						<td>{i.quantity}{i.quantityType}</td>
						<td
							><button
								on:click={() => removeIngredient(index)}
								class="btn btn-circle btn-ghost inline-flex items-center justify-center text-gray-400"
								><svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg></button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div
		class="flex flex-row flex-wrap place-content-around content-center items-center justify-center pt-32"
	>
		<select bind:value={selected} class="select select-primary w-full max-w-xs">
			<option disabled selected value={undefined}>Wybierz składnik</option>
			{#each ingredients as ingredient}
				<option value={ingredient}>{ingredient.ingredientName}</option>
			{/each}
		</select>
		{#if selected === undefined}
			<input
				type="text"
				bind:value={selectedIngredientQuantity}
				placeholder="Ilość"
				class="input input-bordered input-primary w-full max-w-xs"
			/>
		{:else}
			<input
				type="text"
				bind:value={selectedIngredientQuantity}
				placeholder="Ilość w {selected.quantityType}"
				class="input input-bordered input-primary w-full max-w-xs"
			/>
		{/if}
		<button on:click={addIngredient} class="btn btn-primary">Dodaj</button>
	</div>
	<h1>Kroki:</h1>
	<div class="flex place-content-around content-center items-center justify-center pt-16">
		<textarea bind:value={recipeSteps}
			class="textarea textarea-primary w-1/2"
			placeholder="Tu wpisz jak zrobić ten przepis"
		/>
	</div>
    <div class="flex flex-row flex-wrap place-content-around content-center items-center justify-center pt-16">
        <button class="btn btn-primary">Dodaj Przepis</button>
    </div>
</main>
