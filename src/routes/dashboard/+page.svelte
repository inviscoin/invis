<!-- 
     ARQUIVO: src/routes/dashboard/+page.svelte 
     OBJETIVO: MATRIZ SPA - CONTAINER MASTER DO DASHBOARD MODULAR
-->

<script>
    import { onMount, onDestroy } from 'svelte';
    import { blockStore } from '$lib/stores/blocks';
    import { icGold, systemStatus } from '$lib/stores/session';
    import Top from '$lib/components/Top.svelte';
    import Foot from '$lib/components/Foot.svelte';
    import BlockContainer from '$lib/components/BlockContainer.svelte';
    import InactivityOverlay from '$lib/components/InactivityOverlay.svelte';
    import { initializeSession, destroySession } from '$lib/session_manager';
    import { fade } from 'svelte/transition';

    let showInactivity = false;
    let inactivityTimer;

    // Monitor de Inatividade (2 minutos conforme regra INVIS)
    function resetInactivity() {
        showInactivity = false;
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if ($blockStore.length === 0) showInactivity = true;
        }, 120000); 
    }

    onMount(() => {
        initializeSession();
        resetInactivity();
        // Forçar Modo Fullscreen conforme regra INVIS
        document.documentElement.requestFullscreen().catch(() => {});
    });

    onDestroy(() => {
        destroySession();
    });
</script>

<svelte:window on:mousemove={resetInactivity} on:touchstart={resetInactivity} />

<main class="dashboard-matrix gpu-accelerated">
    
    <Top />

    <!-- ÁREA DE BLOCOS DINÂMICOS (1/3, 2/3, 3/3) -->
    <section class="block-area">
        {#if $blockStore.length === 0}
            <div class="empty-state" transition:fade>
                <div class="glass-carousel">
                    <h1 class="neon-text">INVIS ECOSYSTEM</h1>
                    <p class="status-msg">{$systemStatus}</p>
                    <p class="hint">Gire o carrossel no Foot para começar</p>
                </div>
            </div>
        {:else}
            <div class="blocks-container">
                {#each $blockStore as block (block.id)}
                    <BlockContainer {block}>
                        <!-- Injeção dinâmica do HUD específico (Mídia, Social, Jogos, etc) -->
                        <svelte:component this={block.component} />
                    </BlockContainer>
                {each}
            </div>
        {/if}
    </section>

    <Foot />

    {#if showInactivity}
        <InactivityOverlay />
    {/if}

</main>

<style>
    .dashboard-matrix {
        height: 100vh; width: 100vw;
        background: radial-gradient(circle at center, #0b0e11 0%, #050508 100%);
        display: flex; flex-direction: column;
        overflow: hidden; position: relative;
    }

    .block-area {
        flex: 1; margin-top: 70px; margin-bottom: 85px;
        position: relative; overflow: hidden;
    }

    .blocks-container {
        display: flex; flex-direction: column;
        height: 100%; width: 100%;
    }

    .empty-state {
        height: 100%; display: flex; justify-content: center; align-items: center;
    }

    .glass-carousel {
        padding: 40px; border-radius: 32px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(0, 200, 255, 0.2);
        backdrop-filter: blur(20px);
        text-align: center;
    }

    .neon-text { 
        color: var(--neon-cyan); 
        text-shadow: 0 0 15px var(--neon-cyan); 
        letter-spacing: 5px;
    }

    .status-msg { color: #aaa; margin: 15px 0; }
    .hint { color: var(--neon-purple); font-size: 0.8rem; }
</style>