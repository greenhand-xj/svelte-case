<script>
  import { api } from "./api.js";
  import Loading from "./Loading.svelte";
  import { repos, selected, setSelected } from "./store.js";
  const labels = ["react", "Vue", "Svelte"];
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
  button {
    margin: 10px;
  }
  .active {
    background-color: #23c483;
  }
</style>

<main>
  {#each labels as label}
    <button 
      class:active={$selected === label} 
      on:click={() => $selected = label}>
         {label}
    </button>
  {/each}

 {#if $repos.status === 'loading'}
    <Loading/>
  {:else if  $repos.status === 'loaded'}
     {#each $repos.items as item (item.id)}
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <a href="{item.html_url}" alt="xujie">Repo Link</a>
     {/each}
  {:else if  $repos.status === 'error'}
    <span>error</span>
  {/if}

</main>