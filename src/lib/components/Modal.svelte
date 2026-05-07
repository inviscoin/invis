<!-- ARQUIVO: src/lib/components/Modal.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let isOpen = false;
</script>

{#if isOpen}
    <div class="modal-backdrop" on:click={() => dispatch('close')}>
        <div class="modal-content" on:click|stopPropagation>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-content {
        width: 90%;
        max-width: 450px;
        background: var(--bg-main);
        border: 1px solid var(--neon-cyan);
        border-radius: 32px;
        padding: 30px;
        box-shadow: 0 0 30px rgba(0, 200, 255, 0.2);
    }
</style>