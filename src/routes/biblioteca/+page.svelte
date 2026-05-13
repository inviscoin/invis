<script>
    /* ARQUIVO: src/routes/biblioteca/+page.svelte */
    /* OBJETIVO: HUB DE LIVROS COM INTERFACE GLASS E LEITURA IMERSIVA */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { generateSpeech } from "$lib/library/tts_mixer";
    import { fade, slide, scale } from "svelte/transition";
    import { onMount } from "svelte";

    let books = [];
    let selectedBook = null;
    let isReading = false;
    let readingSpeed = 1.0;
    let ttsActive = false;

    onMount(async () => {
        const res = await fetch('/api/library/expose');
        books = await res.json();
    });

    async function startReading(book) {
        selectedBook = book;
        isReading = true;
        // Ativa Wake Lock API para manter tela ligada [5, 6]
        if ('wakeLock' in navigator) {
            await navigator.wakeLock.request('screen');
        }
    }

    async function toggleTTS() {
        ttsActive = !ttsActive;
        if (ttsActive) {
            const audio = await generateSpeech("Capítulo 1: O início da Matriz...", readingSpeed);
            console.log(`Narração via ${audio.source}`);
        }
    }
</script>

<AuthWrapper>
    <div class="library-viewport gpu-accelerated">
        <header class="lib-header">
            <h2 class="neon-text-cyan">BIBLIOTECA INFINITA</h2>
            <div class="search-box glass-morphism">
                <input type="text" placeholder="Pesquisar obras..." class="invis-search" />
            </div>
        </header>

        <div class="books-grid no-scrollbar">
            {#each books as book}
                <div class="book-card" on:click={() => startReading(book)} in:scale>
                    <div class="cover-wrapper glass-morphism">
                        <img src={book.cover_url} alt={book.title} />
                        {#if book.is_neural}
                            <div class="badge-neural">
                                <svg viewBox="0 0 24 24" width="16" fill="var(--neon-cyan)">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                </svg>
                            </div>
                        {/if}
                    </div>
                    <span class="book-title">{book.title}</span>
                </div>
            {/each}
        </div>

        {#if isReading}
            <div class="reader-overlay glass-morphism" transition:fade>
                <header class="reader-top">
                    <button class="btn-back" on:click={() => isReading = false}>✕ SAIR</button>
                    <div class="ai-status">Fonte: {ttsActive ? "Neural Ativo" : "Texto Puro"}</div>
                </header>

                <article class="reading-content no-scrollbar">
                    <h1 class="neon-text-gold">{selectedBook.title}</h1>
                    <p class="text-p">
                        <span class="highlight">O ecossistema INVIS</span> é a convergência perfeita entre 
                        tecnologia de ponta e acessibilidade universal. Aqui, o seu tempo vale moedas...
                    </p>
                </article>

                <footer class="reader-controls glass-morphism">
                    <div class="control-group">
                        <label>Velocidade: {readingSpeed}x</label>
                        <input type="range" min="0.5" max="2.0" step="0.1" bind:value={readingSpeed} />
                    </div>
                    <button class="btn-neural-toggle" class:active={ttsActive} on:click={toggleTTS}>
                        <svg viewBox="0 0 24 24" width="24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                        </svg>
                        {ttsActive ? "PARAR IA" : "OUVIR IA"}
                    </button>
                </footer>
            </div>
        {/if}
    </div>
</AuthWrapper>

<style>
    .library-viewport { width: 100%; height: 100%; padding: 80px 20px 100px; display: flex; flex-direction: column; gap: 30px; }
    .lib-header { display: flex; justify-content: space-between; align-items: center; }
    .neon-text-cyan { letter-spacing: 5px; font-size: 1.2rem; text-shadow: 0 0 15px var(--neon-cyan); }

    .invis-search { 
        background: transparent; border: none; padding: 10px 20px; color: white; width: 200px;
        border-bottom: 1px solid var(--neon-border-cyan); outline: none;
    }

    .books-grid { 
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; overflow-y: auto; 
        mask-image: linear-gradient(to bottom, black 90%, transparent);
    }

    .book-card { cursor: pointer; display: flex; flex-direction: column; gap: 10px; }
    .cover-wrapper { height: 160px; border-radius: 12px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
    .cover-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
    .book-card:hover img { transform: scale(1.1); }

    .badge-neural { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6); padding: 5px; border-radius: 50%; }
    .book-title { font-size: 0.7rem; color: #aaa; text-align: center; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }

    .reader-overlay { position: fixed; inset: 0; z-index: 2000; background: #050508; display: flex; flex-direction: column; padding: 40px 20px; }
    .reader-top { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .ai-status { color: var(--neon-purple); font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; }

    .reading-content { flex: 1; overflow-y: auto; text-align: justify; padding: 0 10px; }
    .neon-text-gold { color: var(--neon-gold); text-align: center; margin-bottom: 30px; font-size: 1.5rem; letter-spacing: 3px; }
    .text-p { color: #E0E0E0; line-height: 1.8; font-size: 1.1rem; }
    .highlight { background: rgba(0, 255, 128, 0.2); border-bottom: 2px solid var(--neon-emerald); }

    .reader-controls {
        margin-top: 30px; padding: 25px; border-radius: 20px; background: rgba(255,255,255,0.03);
        display: flex; justify-content: space-between; align-items: center;
    }

    .btn-neural-toggle {
        background: var(--neon-cyan); color: black; border: none; padding: 15px 30px;
        border-radius: 12px; font-weight: 900; display: flex; gap: 10px; align-items: center; cursor: pointer;
        box-shadow: 0 0 20px var(--neon-cyan);
    }
    .btn-neural-toggle.active { background: var(--neon-purple); color: white; box-shadow: 0 0 20px var(--neon-purple); }

    .btn-back { background: transparent; border: 1px solid var(--neon-red); color: var(--neon-red); padding: 8px 15px; border-radius: 8px; cursor: pointer; font-size: 0.7rem; font-weight: 800; }
</style>