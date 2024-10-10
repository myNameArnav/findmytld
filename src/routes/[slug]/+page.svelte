<script lang="ts">
	import MiniCards from '$lib/MiniCards.svelte';
	import Search from '$lib/Search.svelte';
	import { page } from '$app/stores';
	import * as tlds from './tlds.json';

	let tldList: string[] = tlds.newTop100;
	$: domain = $page.params.slug;
	</script>

<div class="root">
	<div class="search">
		<Search inputValue={domain} />
	</div>
	<ol class="container">
		{#each tldList as tld}
			<li class="mini-cards"><MiniCards {domain} {tld} /></li>
		{/each}
	</ol>
</div>

<style>
	.root {
		font-family: 'Space Grotesk', sans-serif;
	}

	.container {
		display: flex;
		flex-direction: row;
		width: 100vw;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0 10vw;
	}
</style>
