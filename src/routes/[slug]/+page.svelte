<script lang="ts">
	import MiniCards from "$lib/MiniCards.svelte";
	import Search from "$lib/Search.svelte";
	import { page } from "$app/stores";
	import * as tlds from "./tlds.json";
  
	let tldList: string[] = tlds.top150;
	$: domain = $page.params.slug;
  </script>
  
  <div class="root">
	<div class="search">
	  <Search inputValue={domain} />
	</div>
	<ol class="container">
	  {#each tldList as tld}
		<li class="mini-cards">
		  <MiniCards {domain} {tld} />
		</li>
	  {/each}
	</ol>
  </div>
  
  <style>
	.root {
	  font-family: "Space Grotesk", sans-serif;
	  display: flex;
	  flex-direction: column;
	  align-items: center; /* Center items horizontally */
	}
  
	.container {
	  display: flex;
	  flex-direction: row;
	  justify-content: center; /* Distribute items evenly */
	  width: 80vw; /* Limit width for better readability */
	  flex-wrap: wrap;
	  gap: 1rem;
	  padding: 0; /* Remove default padding */
	  margin: 0; /* Remove default margin */
	  list-style: none; /* Remove list bullets */
	}
  
	.search {
	  margin-bottom: 1rem; /* Add some spacing between search and cards */
	  width: 100%;
	  display: flex;
	  justify-content: center;
	}
  </style>
  