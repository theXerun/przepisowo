<script lang="ts">
	import { page } from '$app/stores';

	const nav = [
		{ title: 'Strona Główna', path: '/' },
		{ title: 'Moja Lodówka', path: '/lodowka' },
		{ title: 'Przepisy', path: '/przepisy' }
	];
</script>

<nav>
	{#each nav as item}
		<a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
	{/each}
</nav>

<style lang="postcss">
	nav {
		@apply flex shadow-md py-4 mb-4 justify-center content-center;
	}
	a {
		@apply flex flex-row p-4 mx-4 font-bold bg-white rounded-xl items-center text-center min-w-[48px] min-h-[48px];
	}
	a:hover {
		@apply bg-blue-400 text-white transition-colors;
	}
	a.active {
		@apply bg-blue-500 text-white;
	}
</style>
