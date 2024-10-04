<script lang="ts">
    export let inputValue: string = "";

    function isValidDomain(domain: string): boolean {
        const domainRegex = /^(?!\-)([a-zA-Z0-9\-]{1,63})(?<!\-)(\.[a-zA-Z0-9\-]{1,63})*$/;
        return domainRegex.test(domain);
    }
</script>

<div class="root">
    <form action={`/scanner/${inputValue}`} class="root-form" autocomplete="off">
        <input class="form-domain" type="text" bind:value={inputValue} id="domain" placeholder="Enter a domain name without TLD"/>
        <input class="form-submit" type="submit" value="" disabled="{!isValidDomain(inputValue)}"/>
    </form>
</div>

<style>
    /* General styles */
    .root {
        font-family: "Space Grotesk", sans-serif;
        display: flex;
        margin-bottom: 2rem;
    }

    .root-form {
        margin: 0 auto;
    }

    /* Form input styles */
    .form-domain {
        padding: 25px;
        border: 2px solid #ddd;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        width: 30rem;
        height: 2rem;
        font-size: 1.25rem;
        background-color: white;
        border-radius: 10px;
    }

    .form-domain:focus {
        border-color: #007bff;
        box-shadow: 0px 4px 6px rgba(0, 123, 255, 0.2);
    }

    /* Form submit button */
    .form-submit {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M19 18H6c-2.8 0-5-2.2-5-5 0-2.2 1.4-4 3.5-4.7.7-3.2 3.4-5.3 6.5-5.3 3.5 0 6.4 2.6 6.9 6 2.1.3 3.6 2.1 3.6 4.3 0 2.5-2 4.7-4.5 4.7z"/></svg>') no-repeat center center / 30px;
        padding: 15px 25px;
        background-color: #007bff;
        border: none;
        border-radius: 10px;
        margin-top: 1rem;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    } 

    .form-submit:hover {
        background-color: #0056b3;
    }

    input:disabled,
    input[disabled]{
        background-color: grey;
        cursor: not-allowed;
    }

    .form-submit:focus {
        outline: none;
        box-shadow: 0px 4px 6px rgba(0, 123, 255, 0.2);
    }

    @media (max-width: 700px) {
        .root{
            display: flex;
            flex-wrap: wrap;
        }

        .root-form {
        margin: 0 auto;
        }

        .form-domain {
            width: 30rem;
        }

        .form-submit {
            /* background-size: 30px; */
            width: 30rem;
        }
    }

    @media (max-width: 500px) {
        .root{
            display: flex;
            flex-wrap: wrap;
        }

        .root-form {
        margin: 0 auto;
        }

        .form-domain {
            width: 20rem;
        }

        .form-submit {
            /* background-size: 30px; */
            width: 20rem;
        }
    }
</style>

