<script>
    /* ARQUIVO: src/lib/components/AIFeedback.svelte */
    /* OBJETIVO: LOOP DE FEEDBACK POR PARÁGRAFO (GLOW / DESFOQUE) [1] */
    import { submitAIFeedback } from '$lib/library/ghostwriter';
    export let paragraphId;
    let selected = null; // glow, blur
</script>

<div class="feedback-pills">
    <button class="pill glow" class:active={selected === 'glow'} 
            on:click={() => { selected = 'glow'; submitAIFeedback(paragraphId, 'glow'); }}>
        <svg viewBox="0 0 24 24" width="16"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </button>
    
    <button class="pill blur" class:active={selected === 'blur'} 
            on:click={() => { selected = 'blur'; submitAIFeedback(paragraphId, 'blur'); }}>
        <svg viewBox="0 0 24 24" width="16"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
    </button>
</div>

<style>
    .feedback-pills { display: flex; gap: 10px; margin-top: 10px; opacity: 0; transition: 0.3s; }
    :global(.text-segment:hover) .feedback-pills { opacity: 1; }

    .pill {
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        padding: 5px 12px; border-radius: 20px; color: #666; cursor: pointer; transition: 0.3s;
    }

    .pill.glow.active, .pill.glow:hover { color: var(--neon-emerald); border-color: var(--neon-emerald); box-shadow: 0 0 10px var(--neon-emerald); }
    .pill.blur.active, .pill.blur:hover { color: var(--neon-red); border-color: var(--neon-red); box-shadow: 0 0 10px var(--neon-red); }
</style>