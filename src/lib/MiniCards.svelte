<script lang="ts">
	export let domain = '';
	export let tld = '';

	let url = `${domain.toLowerCase()}.${tld.toLowerCase()}`;
	let status: boolean | null = null;

	$: getStatus(url).then((result) => {
		status = result;
	});

	function getStatus(url: string): Promise<boolean> {
		const myHeaders = new Headers();
		myHeaders.append('accept', 'application/dns-json');

		const requestOptions = {
			method: 'GET',
			headers: myHeaders
		};

		return fetch(`https://cloudflare-dns.com/dns-query?name=${url}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.Status === 0) return false;
				return true;
			})
			.catch((error) => {
				console.error(error);
				return false;
			});
	}
</script>

<div class="root">
	<div class="mini-cards-section">
		<div class="url">
			{tld.toLowerCase()}
		</div>
		<div class="status">
			{#if status === null}
				<span class="status-icon loading"></span>
			{:else if status}
				<span class="status-icon success"></span>
			{:else}
				<span class="status-icon failure"></span>
			{/if}
		</div>
	</div>
</div>

<style>
	.root {
		font-family: 'Space Grotesk', sans-serif;
	}

	.mini-cards-section {
		display: flex;
		justify-content: space-between;
		padding: 25px;
		border: 2px solid #ddd;
		outline: none;
		transition: all 0.3s ease;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		width: 15rem;
		height: 2.5rem;
		font-size: 1.25rem;
		background-color: white;
		border-radius: 10px;
		align-items: center;
	}

	.url {
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.status-icon {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}

	.success {
		background-color: #4caf50;
	}

	.failure {
		background-color: #f44336;
	}

	.failure {
		background-color: #36a8f4;
	}
</style>
