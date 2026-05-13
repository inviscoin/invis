<script>
    /* ARQUIVO: src/routes/dashboard/+page.svelte */
    /* OBJETIVO: MATRIZ SPA SOBERANA - CONTAINER MASTER DOS BLOCOS [9, 10] */
    import { onMount } from 'svelte';
    import { blockStore } from '$lib/stores/blocks';
    import Top from '$lib/components/Top.svelte';
    import Foot from '$lib/components/Foot.svelte';
    import { fade, slide } from 'svelte/transition';

    onMount(() => {
        // Forçar imersão conforme regra inegociável [11]
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    });
</script>

<main class="matrix-spa-container">
    <Top />

    <section class="viewport-blocks-area">
        {#if $blockStore.length === 0}
            <div class="empty-matrix-state" in:fade>
                <div class="glass-carousel-hub">
                    <h1 class="matrix-title">INVIS MATRIZ</h1>
                    <p class="matrix-status-msg">SISTEMA SINCRONIZADO</p>
                    <div class="neon-pulse-ring"></div>
                </div>
                <p class="start-hint">Gire o carrossel no Foot para começar</p>
            </div>
        {:else}
            <div class="dynamic-tercos-grid">
                {#each $blockStore as block (block.id)}
                    <div class="block-unit glass-morphism gpu-accelerated" 
                         style="height: {100 / $blockStore.length}%"
                         in:slide={{ axis: 'y' }}>
                        
                        <header class="block-header">
                            <span class="block-label">{block.title}</span>
                            <div class="block-actions">
                                <button class="btn-pin">📌</button>
                                <button class="btn-close" on:click={() => blockStore.closeBlock(block.id)}>✕</button>
                            </div>
                        </header>

                        <div class="block-content-viewport">
                            <!-- Injeção de Módulo Satélite via svelte:component em Parte 6 -->
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </section>

    <Foot />
</main>

<style>
    .matrix-spa-container {
        height: 100vh; width: 100vw; overflow: hidden;
        background: radial-gradient(circle at center, #0b0e11 0%, #050508 100%);
        display: flex; flex-direction: column; position: relative;
    }

    .viewport-blocks-area {
        flex: 1; margin-top: 70px; margin-bottom: 85px;
        display: flex; flex-direction: column; position: relative;
    }

    .empty-matrix-state {
        height: 100%; display: flex; flex-direction: column; 
        justify-content: center; align-items: center; gap: 40px;
    }

    .glass-carousel-hub {
        padding: 60px; border-radius: 40px; text-align: center;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(0, 200, 255, 0.1);
        backdrop-filter: blur(35px); position: relative;
    }

    .matrix-title {
        color: var(--neon-cyan); letter-spacing: 15px; font-weight: 900;
        text-shadow: 0 0 25px var(--neon-cyan); margin: 0; font-size: 2rem;
    }

    .matrix-status-msg { color: #555; font-size: 0.75rem; letter-spacing: 5px; margin-top: 15px; text-transform: uppercase; }

    .neon-pulse-ring {
        position: absolute; inset: 0; border: 2px solid var(--neon-cyan);
        border-radius: inherit; animation: matrixRingPulse 4s infinite; opacity: 0;
    }

    @keyframes matrixRingPulse { 
        0% { transform: scale(1); opacity: 0.4; } 
        100% { transform: scale(1.3); opacity: 0; } 
    }

    .start-hint { color: var(--neon-purple); font-size: 0.8rem; letter-spacing: 2px; animation: breathe 2s infinite; }
    @keyframes breathe { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

    .dynamic-tercos-grid { height: 100%; width: 100%; display: flex; flex-direction: column; }

    .block-unit {
        width: 100%; border-bottom: 1px solid rgba(0, 200, 255, 0.15);
        display: flex; flex-direction: column; overflow: hidden;
    }

    .block-header {
        height: 40px; background: rgba(0, 200, 255, 0.08);
        display: flex; justify-content: space-between; align-items: center;
        padding: 0 15px; font-size: 0.7rem; color: var(--neon-cyan);
        text-transform: uppercase; letter-spacing: 3px; font-weight: 800;
    }

    .block-actions { display: flex; gap: 15px; }
    .block-actions button { background: none; border: none; cursor: pointer; font-size: 1rem; }
    .btn-close { color: var(--neon-red) !important; }

    .block-content-viewport { flex: 1; overflow-y: auto; background: rgba(0,0,0,0.2); }
</style>