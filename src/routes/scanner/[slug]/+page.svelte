
<script lang="ts">
    import MiniCards from "$lib/MiniCards.svelte";
    import Search from "$lib/Search.svelte";
    import { page } from '$app/stores';
    import * as tlds from './tlds.json'

    // let tldList: string[] = tlds.allTlds;
    let tldList: string[] = tlds.top100;
    let domain = $page.params.slug;
</script>

<div class="root">
    <div class="search">
        <Search inputValue={domain}/>
    </div>
    <ol class="container">
        {#each tldList as tld}
        <li class="mini-cards"><MiniCards {domain} {tld} />
        {/each}
    </ol>
</div>

<style>
    .root{
        /* height: 88vh; */
        font-family: "Space Grotesk", sans-serif;
    }

    .container{
        display: flex;
        flex-direction: row;
        width: 100vw;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 0 auto;
    }
</style>