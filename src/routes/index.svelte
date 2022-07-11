<script lang="ts">
	// asynchroniczne + lazy loading
	let recipes = [
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'},
		{name: 'Przepis', description: 'Krótki opis'}
	]	
</script>

<main>
	<h1>Może masz ochotę na:</h1>
	<div class="przepiscard">
		<h1>Losowo wybrany przepis</h1>
		<p>Z tych możliwych do zrobienia</p>
	</div>
	<h2>Inne przepisy do wypróbowania:</h2>
	<div class="przepisycontainer">
		{#each recipes as recipe}
		<div class="przepiscard">
			<h1>{recipe.name}</h1>
			<p>{recipe.description}</p>
		</div>
		{/each}
		
	</div>
</main>

<style lang="postcss">
	.przepiscard {
		@apply flex flex-col p-4 my-4 shadow-md rounded-md max-w-3xl;
	}
	.przepisycontainer {
		@apply flex flex-col my-4 py-4 px-2;
	}
</style>