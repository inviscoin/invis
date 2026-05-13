<script>
    /* ARQUIVO: src/lib/components/InvisModal.svelte */
    /* OBJETIVO: SUBSTITUIR ALERTAS NATIVOS POR MODAIS PREMIUM [6] */
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    const dispatch = createEventDispatcher();

    export let title = "AVISO DO SISTEMA";
    export let message = "";
    export let type = "info"; // info, error, success
</script>

<div class="modal-backdrop" on:click={() => dispatch('close')} in:fade>
    <div class="modal-content glass-morphism" on:click|stopPropagation in:scale>
        <div class="status-indicator" class:error={type === 'error'} class:success={type === 'success'}></div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button class="btn-close-modal" on:click={() => dispatch('close')}>CIENTE</button>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        z-index: 5000; display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(10px);
    }
    .modal-content {
        width: 90%; max-width: 400px; padding: 40px; border-radius: 24px;
        background: #0b0e11; border: 1px solid var(--neon-cyan); text-align: center;
    }
    .status-indicator {
        width: 60px; height: 4px; background: var(--neon-cyan);
        margin: 0 auto 20px; border-radius: 2px;
    }
    .status-indicator.error { background: var(--neon-red); box-shadow: 0 0 10px var(--neon-red); }
    .status-indicator.success { background: var(--neon-emerald); box-shadow: 0 0 10px var(--neon-emerald); }
    h3 { color: white; letter-spacing: 3px; font-size: 0.9rem; margin-bottom: 15px; }
    p { color: #ccc; font-size: 0.85rem; line-height: 1.5; }
    .btn-close-modal {
        margin-top: 30px; width: 100%; padding: 15px; background: transparent;
        border: 1px solid var(--neon-cyan); color: var(--neon-cyan);
        border-radius: 10px; cursor: pointer; font-weight: 800; transition: 0.3s;
    }
    .btn-close-modal:hover { background: var(--neon-cyan); color: black; }
</style>