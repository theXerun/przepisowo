<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let login: String = '';
	let password: String = '';
	let confirmPassword: String = '';
	let error: String;

	function submit() {
		if (password !== confirmPassword) {
			error = 'Hasła się nie zgadzają';
			return;
		}
		dispatch('submit', {
			login,
			password
		});
	}
</script>

<form on:submit|preventDefault={submit} class="form-control {$$props.class}">
	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}
	<label class="label">
		<span class="label-text">Podaj swoje dane do rejestracji.</span>
	</label>
	<label class="input-group max-w-sm">
		<span class="w-24 justify-center">Login</span>
		<input
			type="text"
			name="login"
			id="login"
			placeholder="aniakowalska123"
			class="input input-bordered"
			bind:value={login}
			required
		/>
	</label>
	<label class="input-group max-w-sm">
		<span class="w-24 justify-center">Hasło</span>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="********"
			bind:value={password}
			class="input input-bordered"
			required
		/>
	</label>
	<label class="input-group max-w-sm">
		<span class="w-24 justify-center">Potwierdź</span>
		<input
			type="password"
			name="confirmPassword"
			id="confirmPassword"
			placeholder="********"
			bind:value={confirmPassword}
			class="input input-bordered"
			required
		/>
	</label>
	<button class="btn btn-primary max-w-sm" type="submit">Zarejestruj się</button>
	<a href="/login" class="btn btn-secondary max-w-sm">Zaloguj się</a>
</form>
