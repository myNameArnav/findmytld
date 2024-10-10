<script>
	import '../app.css';
</script>

<div class="header">
	<a href="/">
		<p>find my tld</p>
	</a>
</div>

<slot />

<div class="footer">
	<p>Made with &lt;3 by <a href="https://x.com/myNameArnav" target="_blank">me</a></p>
</div>

<style>
	.header {
		height: 8vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-family: 'Playwrite DE Grund', cursive;
	}

	.header > a {
		text-decoration: none;
		color: inherit;
	}

	.header > a > p {
		margin: 0;
		margin-bottom: 1vh;
	}

	.footer {
		height: 4vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-family: 'Space Grotesk', sans-serif;
	}

	.footer > p {
		margin: 0;
	}
</style>