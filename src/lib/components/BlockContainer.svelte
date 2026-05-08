<!-- 
     ARQUIVO: src/lib/components/BlockContainer.svelte 
     OBJETIVO: LÓGICA DE TERÇOS E SNAP TO GRID DOS BLOCOS [2, 10, 49]
-->

<script>
    import { blockStore } from '../stores/blocks';
    import { fade, slide } from 'svelte/transition';

    export let block;

    function minimize() {
        blockStore.minimizeBlock(block.id);
    }

    function close() {
        if(confirm(`Encerrar ${block.title}?`)) {
            blockStore.closeBlock(block.id);
        }
    }
</script>

<div class="block-wrapper glass-morphism gpu-accelerated" 
     style="height: {100 / $blockStore.length}%"
     in:slide={{ axis: 'y' }}>
    
    <header class="block-header">
        <span class="block-title">{block.title}</span>
        <div class="controls">
            <button class="btn-pin" on:click={() => blockStore.togglePin(block.id)}>
                {block.pinned ? '📍' : '📌'}
            </button>
            <button class="btn-min" on:click={minimize}>—</button>
            <button class="btn-close" on:click={close}>X</button>
        </div>
    </header>

    <div class="block-content">
        <slot />
    </div>

</div>

<style>
    .block-wrapper {
        width: 100%; border: 1px solid rgba(0, 200, 255, 0.3);
        background: rgba(11, 14, 17, 0.7);
        display: flex; flex-direction: column;
        overflow: hidden; position: relative;
    }

    .block-header {
        height: 40px; display: flex; justify-content: space-between;
        align-items: center; padding: 0 15px;
        background: rgba(0, 200, 255, 0.05);
    }

    .block-title { font-size: 0.8rem; color: var(--neon-cyan); text-transform: uppercase; }

    .controls button {
        background: none; border: none; color: white; margin-left: 10px; cursor: pointer;
    }

    .btn-close { color: var(--neon-red) !important; font-weight: bold; }

    .block-content { flex: 1; overflow-y: auto; }
</style>