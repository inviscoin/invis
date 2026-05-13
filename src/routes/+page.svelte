<script>
    /* ARQUIVO: src/routes/+page.svelte */
    /* OBJETIVO: CADEADO MATEMÁTICO REALÍSTICO COM REFLEXO DE PISTA MOLHADA [4, 13] */
    import { onMount } from 'svelte';
    import { fade, scale, fly } from 'svelte/transition';
    import { goto } from '$app/navigation';

    let stage = 'locked'; // locked, opening, fingerprint
    let loadingText = "Iniciando sistema de segurança...";
    let progress = 0;
    
    const messages = [
        "Carregando sistema segurança...",
        "Sincronizando tradução Babel...",
        "Limpando área de trabalho...",
        "Aperfeiçoamento de fluidez GPU...",
        "Verificando integridade da Matriz..."
    ]; [13]

    onMount(() => {
        let msgIndex = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (msgIndex < messages.length - 1) {
                msgIndex++;
                loadingText = messages[msgIndex];
            }
            if (progress >= 100) {
                clearInterval(interval);
                stage = 'opening';
                setTimeout(() => { 
                    stage = 'fingerprint'; 
                    loadingText = "IDENTIDADE RECONHECIDA";
                }, 1200);
            }
        }, 1000); // 5 segundos para imersão total [14]
    });

    function handleAccess() {
        goto('/login'); [14]
    }
</script>

<main class="opening-matrix">
    <div class="wet-floor-reflection"></div>
    <div class="vignette-pulse"></div>
    <div class="matrix-rays"></div>

    <div class="center-content" in:fade>
        <div class="padlock-wrapper" class:open={stage !== 'locked'}>
            <!-- SVG de Alta Precisão: Cadeado Realístico (60% da tela) [4, 14] -->
            <svg viewBox="0 0 200 200" class="padlock-svg">
                <defs>
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#1a1a40" />
                        <stop offset="100%" stop-color="#0b0e11" />
                    </linearGradient>
                    <filter id="neon-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <!-- Arco do Cadeado -->
                <path class="shackle" d="M60,80 V60 A40,40 0 0,1 140,60 V80" 
                      stroke="var(--neon-cyan)" stroke-width="4" fill="none" filter="url(#neon-glow)" />
                
                <!-- Corpo do Cadeado -->
                <rect class="body" x="40" y="80" width="120" height="90" rx="15" 
                      fill="url(#metal-grad)" stroke="var(--neon-cyan)" stroke-width="2" />

                {#if stage === 'fingerprint'}
                <!-- Digital Realística de Alta Precisão [4] -->
                <g class="fingerprint-scan" on:click={handleAccess} in:scale>
                    <path d="M100,105 A15,15 0 0,1 115,120" stroke="var(--neon-emerald)" fill="none" stroke-width="2" stroke-linecap="round" />
                    <path d="M90,102 A25,25 0 0,1 125,125" stroke="var(--neon-emerald)" fill="none" stroke-width="2" opacity="0.7" />
                    <path d="M80,100 A35,35 0 0,1 135,130" stroke="var(--neon-cyan)" fill="none" stroke-width="2" opacity="0.4" />
                    <circle cx="100" cy="130" r="40" fill="transparent" />
                </g>
                {/if}
            </svg>
        </div>

        {#if stage !== 'fingerprint'}
            <p class="loading-status">{loadingText}</p>
        {:else}
            <p class="access-hint" in:fade>Toque para Acessar</p>
        {/if}
    </div>
</main>

<style>
    .opening-matrix {
        height: 100vh; width: 100vw; overflow: hidden;
        background: radial-gradient(circle, #3a3a99 0%, #0b0e11 100%); [15]
        display: flex; justify-content: center; align-items: center; position: relative;
    }

    .wet-floor-reflection {
        position: absolute; bottom: 0; width: 100%; height: 30%;
        background: linear-gradient(to top, rgba(0, 200, 255, 0.15), transparent);
        mask-image: linear-gradient(to bottom, transparent, black);
        filter: blur(10px); z-index: 1; [4]
    }

    .matrix-rays {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 200, 255, 0.02) 41px);
        pointer-events: none; z-index: 2;
    }

    .vignette-pulse {
        position: absolute; inset: 0;
        box-shadow: inset 0 0 150px 50px #000;
        animation: pulseVignette 4s infinite alternate; z-index: 3; [16]
    }

    .center-content { z-index: 10; display: flex; flex-direction: column; align-items: center; width: 100%; }

    .padlock-wrapper { width: 60%; max-width: 450px; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .padlock-svg { overflow: visible; filter: drop-shadow(0 0 20px rgba(0, 200, 255, 0.3)); }

    .shackle { transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: 70% 40%; }

    .padlock-wrapper.open .shackle { transform: translateY(-20px) rotate(25deg); stroke: var(--neon-emerald); }

    .fingerprint-scan { cursor: pointer; animation: glowPulse 2s infinite; }

    .loading-status {
        margin-top: 40px; color: white; font-family: var(--font-main);
        text-shadow: 0 0 10px var(--neon-cyan); letter-spacing: 4px; text-transform: uppercase; font-size: 0.8rem;
    }

    .access-hint {
        margin-top: 40px; color: var(--neon-emerald); font-weight: 800;
        text-shadow: 0 0 15px var(--neon-emerald); letter-spacing: 2px; animation: blink 1.5s infinite;
    }

    @keyframes pulseVignette { from { opacity: 0.6; } to { opacity: 1; } }

    @keyframes glowPulse { 0%, 100% { filter: brightness(1) drop-shadow(0 0 5px var(--neon-emerald)); } 
                           50% { filter: brightness(1.5) drop-shadow(0 0 20px var(--neon-emerald)); } }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>