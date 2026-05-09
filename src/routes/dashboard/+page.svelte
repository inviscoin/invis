<script>
  import { onMount } from 'svelte';
  import { blockStore } from '$lib/stores/blocks';
  import Top from '$lib/components/Top.svelte';
  import Foot from '$lib/components/Foot.svelte';
  import { fade, slide } from 'svelte/transition';

  onMount(() => {
    // Forçar Fullscreen Regra INVIS [5]
    document.documentElement.requestFullscreen().catch(() => {});
  });
</script>

<main class="matrix-spa">
  <Top />

  <section class="viewport-blocks">
    {#if $blockStore.length === 0}
      <div class="empty-matrix" in:fade>
        <div class="glass-carousel">
          <h1 class="matrix-title">INVIS MATRIZ</h1>
          <p class="matrix-status">SISTEMA SINCRONIZADO</p>
          <div class="pulse-ring"></div>
        </div>
      </div>
    {:else}
      <div class="dynamic-grid">
        {#each $blockStore as block (block.id)}
          <div 
            class="block-unit glass-morphism" 
            style="height: {100 / $blockStore.length}%"
            in:slide
          >
            <header class="block-header">
              <span>{block.title}</span>
              <button on:click={() => blockStore.closeBlock(block.id)}>✕</button>
            </header>
            <div class="block-content">
              <!-- HUD Satélite injetado aqui -->
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <Foot />
</main>

<style>
  .matrix-spa {
    height: 100vh; width: 100vw; overflow: hidden;
    background: radial-gradient(circle at center, #0b0e11 0%, #050508 100%);
    display: flex; flex-direction: column; position: relative;
  }

  .viewport-blocks {
    flex: 1; margin-top: 70px; margin-bottom: 85px;
    display: flex; flex-direction: column; position: relative;
  }

  .empty-matrix {
    height: 100%; display: flex; justify-content: center; align-items: center;
  }

  .glass-carousel {
    padding: 60px; border-radius: 40px; text-align: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(0, 200, 255, 0.1);
    backdrop-filter: blur(30px); position: relative;
  }

  .matrix-title {
    color: var(--neon-cyan); letter-spacing: 12px; font-weight: 900;
    text-shadow: 0 0 20px var(--neon-cyan); margin: 0;
  }

  .matrix-status {
    color: #666; font-size: 0.7rem; margin-top: 15px; letter-spacing: 4px;
  }

  .dynamic-grid { height: 100%; width: 100%; display: flex; flex-direction: column; }

  .block-unit {
    width: 100%; border-bottom: 1px solid rgba(0, 200, 255, 0.1);
    display: flex; flex-direction: column; overflow: hidden;
  }

  .block-header {
    height: 35px; background: rgba(0, 200, 255, 0.05);
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 15px; font-size: 0.65rem; color: var(--neon-cyan);
    text-transform: uppercase; letter-spacing: 2px;
  }

  .block-header button {
    background: none; border: none; color: var(--neon-red); cursor: pointer; font-weight: bold;
  }

  .block-content { flex: 1; overflow-y: auto; }

  .pulse-ring {
    position: absolute; inset: 0; border: 1px solid var(--neon-cyan);
    border-radius: inherit; animation: matrixPulse 4s infinite; opacity: 0;
  }

  @keyframes matrixPulse {
    0% { transform: scale(1); opacity: 0.3; }
    100% { transform: scale(1.2); opacity: 0; }
  }
</style>