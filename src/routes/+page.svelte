<script>
	import Search from '$lib/Search.svelte';
</script>

<div class="root">
	<Search />
</div>

<style>
	.root {
		/* Removed height: 88vh; */
		width: 100%; /* Take full width */
		max-width: 800px; /* Limit content width */
		margin: 0 auto; /* Center the content */
		padding: 2rem; /* Add padding */
	}
</style>
