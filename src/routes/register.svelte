<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import RegisterForm from '$lib/RegisterForm.svelte';

	let error: string;

	async function handleSubmit({ detail: { login, password } }) {
		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({ login, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			$session = body;
			await goto('/');
		}
		error = body.message;
	}
</script>

<div class="flex-col">
	{#if error}
		<p class="mt-3 text-red-500 text-center font-semibold">{error}</p>
	{/if}
	<RegisterForm class="max-w-xl mx-auto mt-8" on:submit={handleSubmit} />
</div>
