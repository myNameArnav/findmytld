<script lang="ts">
	export let domain = "";
	export let tld = "";
	import { onMount } from "svelte";
	import { afterUpdate } from "svelte";
  
	let innerWidth = 1080;
	let urlElement: HTMLElement; // Reference to the .url element
  
	onMount(() => {
	  innerWidth = window.innerWidth;
	  fetchStatusAndUpdate(); // Call fetchStatus inside onMount
	});
  
	afterUpdate(() => {
	  updateMaxDomainLen(); // Update after each update cycle
	});
  
	$: url = `${domain.toLowerCase()}.${tld.toLowerCase()}`;
	let status: number | null = null;
	let maxDomainLen: number = 8; // Default value
  
	function calculateMaxDomainLen(): number {
	  if (!urlElement) return 8; // Fallback if element is not yet available
  
	  const cardWidth = urlElement.offsetWidth;
	  const tldWidthEstimate = tld.length * 8; // Estimate
	  const availableWidth = cardWidth - tldWidthEstimate - 20; // Subtract padding
	  let maxDomainChars = Math.floor(availableWidth / 7);
	  return Math.max(0, maxDomainChars);
	}
  
	function updateMaxDomainLen() {
	  if (urlElement) {
		maxDomainLen = calculateMaxDomainLen();
	  }
	}
  
	async function fetchStatus(url: string): Promise<number> {
	  const myHeaders = new Headers();
	  myHeaders.append("accept", "application/dns-json");
  
	  const requestOptions = {
		method: "GET",
		headers: myHeaders,
	  };
  
	  try {
		const response = await fetch(
		  `https://cloudflare-dns.com/dns-query?name=${url}`,
		  requestOptions
		);
		const result = await response.json();
		return parseInt(result.Status);
	  } catch (error) {
		console.error(error);
		return -1;
	  }
	}
  
	async function fetchStatusAndUpdate() {
	  const result = await fetchStatus(url);
	  status = result;
	}
  
	$: {
	  updateMaxDomainLen();
	}
  </script>
  
  <div class="root">
	<div class="mini-cards-section">
	  <div class="url" bind:this={urlElement}>
		{#if domain.length >= maxDomainLen && innerWidth > 480}
		  <span title="{domain.toLowerCase()}.{tld.toLowerCase()}">
			<strong>.{tld.toLowerCase()}</strong>
		  </span>
		{:else}
		  <span title="{domain.toLowerCase()}.{tld.toLowerCase()}">
			{domain.toLowerCase().substring(0, maxDomainLen)}
			<strong>.{tld.toLowerCase()}</strong>
		  </span>
		{/if}
	  </div>
	  <div class="status">
		{#if status === null}
		  <span class="status-icon loading" title="Loading" />
		{:else if status === 0}
		  <span class="status-icon failure" title="Not Available" />
		{:else if status === 2}
		  <span class="status-icon maybe" title="Server Failure" />
		{:else if status === 5}
		  <span class="status-icon maybe" title="Server Refused" />
		{:else}
		  <span class="status-icon success" title="Available" />
		{/if}
	  </div>
	</div>
  </div>
  
  <style>
	.root {
	  font-family: "Space Grotesk", sans-serif;
	}
  
	.mini-cards-section {
	  display: flex;
	  justify-content: space-between;
	  padding: 25px;
	  border: 2px solid #ddd;
	  outline: none;
	  transition: all 0.3s ease;
	  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	  width: 15rem; /* Fixed width, adjust as needed */
	  height: auto;
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
  
	.loading {
	  background-color: #36a8f4;
	}
  
	.maybe {
	  background-color: #f4f136;
	}
  
	/* Small mobile screens */
	@media (max-width: 480px) {
	  .root {
		margin-left: 0 auto;
	  }
  
	  .mini-cards-section {
		width: 70vw;
		font-size: 1rem;
		height: auto;
		padding: 15px;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
	  }
  
	  .url {
		margin-bottom: 10px;
		white-space: normal;
	  }
	  .url strong {
		display: block;
	  }
  
	  .status {
		align-self: flex-end;
	  }
	}
  </style>
