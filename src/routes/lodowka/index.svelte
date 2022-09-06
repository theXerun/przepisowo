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
			if (updatedIngredient.ingredientQuantity <= 0) {
				userIngredients.splice(index,1)
				
			} else {
				userIngredients[index] = updatedIngredient;
			}
		}
	};
	
</script>

<main>
	<h1>Lodówka</h1>
	<p>Tutaj możesz modyfikować ilości składników. Wpisanie 0 jest równoznaczne z usunięciem.</p>
	{#each userIngredients as i, index}
		<div class="card w-auto bg-base-100 shadow-xl">
			<div class="card-body">
				{#if (errorText[index] && newValues[index]) }
					{errorText[index]}
				{/if}
				<div class="flex flex-row flex-wrap place-content-around content-center items-center text">
					<p>{index+1}</p><p>{i.Ingredients.ingredientName}</p>
					<input
						type="text"
						bind:value={newValues[index]}
						placeholder="{i.ingredientQuantity} {i.Ingredients.quantityType}"
						class="input input-bordered input-primary w-auto"
					/>
					{#if (newValues[index])}
						<p class="pl-3">{i.Ingredients.quantityType}</p>
						<button on:click={() => updateQuantity(index)} class="btn btn-primary">Potwierdź</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
	<div class="flex w-full items-center content-center justify-center p-10"><a href="/lodowka/dodaj" class="btn btn-primary">Dodaj</a></div>
</main>
