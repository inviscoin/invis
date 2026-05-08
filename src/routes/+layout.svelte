<script>
  import "../lib/styles/global.css";
  import "../lib/styles/tokens.css";
  import { onMount } from 'svelte';

  // Forçar modo Fullscreen conforme regra INVIS [5, 6]
  function forceFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.warn("Fullscreen negado ou não suportado.");
      });
    }
  }
</script>

<div on:click={forceFullScreen} class="app-container">
  <slot />
</div>

<style>
  :global(body) {
    background-color: var(--bg-main);
    color: #E0E0E0;
    font-family: var(--font-main);
    margin: 0;
    overflow: hidden; /* Proíbe scroll nativo conforme regra INVIS [7] */
    user-select: none; /* Previne seleção acidental [7] */
  }
  .app-container {
    width: 100vw;
    height: 100vh;
  }
</style>
