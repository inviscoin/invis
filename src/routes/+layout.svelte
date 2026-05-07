<script>
  import "../lib/styles/global.css";
  import "../lib/styles/tokens.css";
  import { onMount } from 'svelte';

  // Força o Fullscreen conforme regra de retenção INVIS [6, 7]
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    }
  }
</script>

<svelte:window on:click|once={toggleFullScreen} />

<slot />

<style>
  :global(body) {
    background-color: var(--bg-main);
    color: #E0E0E0;
    font-family: var(--font-main);
    margin: 0;
    overflow: hidden; /* Força navegação via blocos [8] */
    user-select: none;
  }
</style>