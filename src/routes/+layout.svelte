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
	<p>Made with &lt3 by <a href="https://twitter.com/myNameArnav" target="_blank">me</a></p>
</div>

<style>
	.header {
		height: 7vh;
		display: flex;
		font-size: 2rem;
		font-family: 'Playwrite DE Grund', cursive;
	}

	.header > a > p {
		margin: auto auto auto 2rem;
	}

	.footer {
		height: 5vh;
		display: flex;
		font-size: 1rem;
		font-family: 'Space Grotesk', sans-serif;
	}

	.footer > p {
		margin: auto;
	}
</style>
