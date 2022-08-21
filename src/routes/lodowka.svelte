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
	export let userIngredients: {
		Ingredients: Ingredients;
		ingredientQuantity: number;
	}[];
	let errorText: String[] = [];
	let newValues: string[] = [];

	const updateQuantity = async (index: number) => {
		if (isNaN(Number(newValues[index]))){
			errorText[index] = "Podana wartość nie jest liczbą"
			return;
		}
		let updatedIngredient = userIngredients[index]
		updatedIngredient.ingredientQuantity = Number(newValues[index]);
		const response = await fetch('/lodowka', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( updatedIngredient )
		});
		newValues[index] = '';
		
		if (response.ok) {
			userIngredients[index] = updatedIngredient;
		}
	};
	
</script>

<main>
	<h1>Lodówka</h1>
	<p>Tu będą produkty wraz z ilościami i możliwość ich dodawania, usuwania itd</p>
	{#each userIngredients as i, index}
		<div class="card w-auto bg-base-100 shadow-xl">
			<div class="card-body">
				{#if errorText[index]}
					{errorText[index]}
				{/if}
				<div class="flex flex-row place-content-around content-center items-center text">
					<p>{index+1}</p><p>{i.Ingredients.ingredientName}</p>
					<input
						type="text"
						bind:value={newValues[index]}
						placeholder="{i.ingredientQuantity} {i.Ingredients.quantityType}"
						class="input input-ghost text-opacity-100 w-auto"
					/>
					{#if (newValues[index])}
						<button on:click={() => updateQuantity(index)} class="btn btn-primary">Potwierdź</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</main>
