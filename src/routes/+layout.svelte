<script>
  import "../lib/styles/global.css";
  import "../lib/styles/tokens.css";
  import { onMount } from 'svelte';

  // Forçar modo Fullscreen conforme regra absoluta INVIS [9]
  function forceFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.warn("Fullscreen bloqueado pelo navegador.");
      });
    }
  }
</script>

<!-- Captura o primeiro clique para ativar imersão total [9] -->
<div on:click={forceFullScreen} class="app-container" role="presentation">
  <slot />
</div>

<style>
  :global(body) {
    background-color: var(--bg-main);
    color: #E0E0E0;
    font-family: var(--font-main);
    margin: 0;
    padding: 0;
    overflow: hidden; /* Proíbe scroll nativo para navegação via blocos [9] */
    user-select: none; /* Previne seleção acidental para estética limpa [10] */
    width: 100vw;
    height: 100vh;
  }

  .app-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>