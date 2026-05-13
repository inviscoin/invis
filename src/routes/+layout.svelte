<script>
    /* ARQUIVO: src/routes/+layout.svelte */
    /* OBJETIVO: SELAGEM ESTRUTURAL E IMERSÃO FULLSCREEN [7, 11] */
    import "../lib/styles/global.css";
    import "../lib/styles/tokens.css";
    import { onMount } from 'svelte';

    function forceFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
                console.warn("Navegador bloqueou imersão automática.");
            });
        }
    }
</script>

<div on:click={forceFullScreen} class="app-container gpu-accelerated" role="presentation">
    <slot />
</div>

<style>
    :global(body) {
        background-color: #0b0e11;
        color: #E0E0E0;
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden; /* Proíbe scroll nativo [12] */
        user-select: none; /* Previne seleção azul [4, 12] */
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