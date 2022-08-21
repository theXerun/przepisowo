<script lang="ts">
	import { page } from '$app/stores';
	import ThemeChange from './themeChange.svelte';

	const nav = [
		{ title: 'Strona Główna', path: '/' },
		{ title: 'Moja Lodówka', path: '/lodowka' },
		{ title: 'Wszystkie Przepisy', path: '/wszystkie-przepisy' }
	];
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
	  <div class="dropdown">
		<label tabindex="0" class="btn btn-ghost md:hidden">
		  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
		</label>
		<ul tabindex="0" class="menu menu-normal dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
			{#each nav as item}
			<li><a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a></li>
			{/each}
		</ul>
	  </div>
	  <a class="btn btn-ghost normal-case text-xl" href="/">Przepisowo</a>
	</div>
	<div class="navbar-center hidden md:flex">
	  <ul class="menu menu-horizontal p-0">
		{#each nav as item}
		<li><a class:active={$page.url.pathname === item.path} href={item.path}>{item.title}</a></li>
		{/each}
	  </ul>
	</div>
	<div class="navbar-end px-4">
		<ThemeChange/>
	</div>
  </div>
