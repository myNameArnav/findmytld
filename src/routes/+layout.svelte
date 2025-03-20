<script>
	import '../app.css';
</script>

<div class="app-container">
	<header class="header">
		<a href="/" class="header-link">
			<p class="header-title">Find my TLD</p>
		</a>
	</header>

	<main class="content">
		<slot />
	</main>

	<footer class="footer">
		<p class="footer-text">
			Made with &lt;3 by <a href="https://x.com/myNameArnav" target="_blank" class="footer-link">me</a>
		</p>
	</footer>
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Ensure full height */
		background-color: #f9f9f9; /* Light background */
		color: #333; /* Darker text for readability */
		font-family: 'Space Grotesk', sans-serif; /* Consistent font */
	}

	.header {
		background-color: #fff; /* White header */
		padding: 1rem 0;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
	}

	.header-link {
		text-decoration: none;
		color: inherit;
	}

	.header-title {
		font-size: 2.25rem; /* Slightly larger */
		font-family: 'Playwrite DE Grund', cursive;
		margin: 0;
		margin-bottom: 0.5rem; /* Reduced margin */
		color: #3498db; /* Primary color */
	}

	.content {
		flex: 1; /* Take up remaining space */
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center; /* Center content horizontally */
	}

	.footer {
		background-color: #fff;
		padding: 1rem;
		text-align: center;
		font-size: 0.875rem; /* Smaller footer text */
		border-top: 1px solid #eee; /* Light border */
	}

	.footer-text {
		margin: 0;
	}

	.footer-link {
		color: #3498db; /* Primary color */
		text-decoration: none;
	}

	.footer-link:hover {
		text-decoration: underline;
	}
</style>
