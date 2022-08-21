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
	import type { Ingredients } from '@prisma/client';
	import { goto } from '$app/navigation';

	export let availableIngredientTypes: Ingredients[];
	let quantityInput: string;
	let selected: Ingredients | undefined;
	let errorText: String;
	const addToFridge = async () => {
		if (isNaN(Number(quantityInput))){
			errorText = "Podana wartość nie jest liczbą"
			return;
		}
		if (selected === undefined) {
			errorText = "Wybierz składnik";
			return;
		}
		let quantity = Number(quantityInput);

		const response = await fetch('/lodowka/dodaj', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( { selected, quantity } )
		});
		
		if (response.ok) {
			await goto("/lodowka");
		}
	};
</script>

<main>
	{#if errorText}
		<p class="text-error">{errorText}</p>
	{/if}
	<div class="flex flex-row place-content-around content-center items-center justify-center">
		<select bind:value={selected} class="select select-primary w-full max-w-xs">
			<option disabled selected value={undefined}>Wybierz składnik</option>
			{#each availableIngredientTypes as ingredient}
				<option value={ingredient}>{ingredient.ingredientName}</option>
			{/each}
		</select>
		{#if (selected === undefined)}
		<input
			type="text"
			bind:value={quantityInput}
			placeholder="Ilość"
			class="input input-bordered input-primary w-full"
		/>
		{:else}
		<input
			type="text"
			bind:value={quantityInput}
			placeholder="Ilość w {selected.quantityType}"
			class="input input-bordered input-primary w-full"
		/>
		{/if}
		<button on:click|preventDefault={addToFridge} class="btn btn-primary">Dodaj</button>
	</div>
	
</main>
