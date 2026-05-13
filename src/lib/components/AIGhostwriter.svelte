<script>
    /* ARQUIVO: src/lib/components/AIGhostwriter.svelte */
    /* OBJETIVO: PAINEL DE CRIAÇÃO COM MOLDURA EM FILIGRANA DOURADA */
    import { generateChapterStream } from '$lib/library/ghostwriter';
    import GlassCard from './GlassCard.svelte';
    import { fade, scale } from 'svelte/transition';

    let prompt = "";
    let isGenerating = false;
    let generatedContent = "";

    async function handleGenerate() {
        if (!prompt) return;
        isGenerating = true;
        generatedContent = "";

        try {
            const reader = await generateChapterStream(prompt);
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                generatedContent += decoder.decode(value);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            isGenerating = false;
        }
    }
</script>

<div class="ai-ghost-container" in:scale>
    <GlassCard padding="30px" borderColor="var(--neon-gold)">
        <header class="ai-header">
            <svg viewBox="0 0 24 24" width="32" fill="var(--neon-gold)" class="pen-icon">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <h3 class="neon-text-gold">ESCRITOR FANTASMA</h3>
        </header>

        <div class="input-area">
            <textarea 
                bind:value={prompt} 
                placeholder="Ex: Um astronauta perdido em Marte em estilo cyberpunk..." 
                class="invis-textarea no-select">
            </textarea>
            
            <button class="btn-generate-neon" on:click={handleGenerate} disabled={isGenerating}>
                {#if isGenerating}
                    <div class="spinner-neon"></div>
                {:else}
                    GERAR OBRA
                {/if}
            </button>
        </div>

        {#if generatedContent}
            <article class="preview-area no-scrollbar" in:fade>
                <p class="typewriter-text">{@html generatedContent}</p>
            </article>
        {/if}
    </GlassCard>
</div>

<style>
    .ai-ghost-container { width: 100%; max-width: 600px; margin: 0 auto; }
    .ai-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
    .neon-text-gold { color: var(--neon-gold); letter-spacing: 5px; font-weight: 900; text-shadow: 0 0 10px var(--neon-gold); }
    
    .invis-textarea {
        width: 100%; height: 120px; background: rgba(0,0,0,0.4);
        border: 1px solid var(--neon-gold); border-radius: 15px;
        color: white; padding: 20px; outline: none; font-family: var(--font-main);
    }

    .btn-generate-neon {
        width: 100%; margin-top: 20px; padding: 18px;
        background: transparent; border: 2px solid var(--neon-gold);
        color: var(--neon-gold); font-weight: 900; border-radius: 12px;
        cursor: pointer; transition: 0.4s; text-transform: uppercase;
    }

    .btn-generate-neon:hover { background: var(--neon-gold); color: black; box-shadow: 0 0 30px var(--neon-gold); }

    .preview-area { margin-top: 30px; max-height: 300px; overflow-y: auto; padding: 10px; border-top: 1px solid rgba(212, 175, 55, 0.2); }
    .typewriter-text { color: #E0E0E0; line-height: 1.8; font-size: 1.1rem; }

    .spinner-neon {
        width: 20px; height: 20px; border: 2px solid transparent;
        border-top-color: var(--neon-gold); border-radius: 50%;
        animation: spin 1s linear infinite; margin: 0 auto;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
</style>