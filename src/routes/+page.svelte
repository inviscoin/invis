<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
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
  ];

  onMount(() => {
    let msgIndex = 0;
    const interval = setInterval(() => {
      progress += 20;
      msgIndex++;
      if (msgIndex < messages.length) {
        loadingText = messages[msgIndex];
      }
      if (progress >= 100) {
        clearInterval(interval);
        stage = 'opening';
        setTimeout(() => { stage = 'fingerprint'; }, 1000);
      }
    }, 1000); // 5 segundos totais [5]
  });

  function startLogin() {
    goto('/login');
  }
</script>

<main class="opening-matrix">
  <!-- Fundo Ondas/Tecido Dinâmico [5] -->
  <div class="wave-bg"></div>
  
  <!-- Pulsante Escuro Lateral [5] -->
  <div class="vignette"></div>

  <div class="center-content" in:fade>
    <!-- Cadeado SVG de Alta Precisão (60% da tela) [1] -->
    <div class="padlock-container" class:open={stage !== 'locked'}>
      <svg viewBox="0 0 100 100" class="padlock-svg">
        <!-- Estrutura do Cadeado baseada em códigos matemáticos -->
        <path class="shackle" d="M30,40 V30 A20,20 0 0,1 70,30 V40" />
        <rect class="body" x="20" y="40" width="60" height="50" rx="10" />
        {#if stage === 'fingerprint'}
          <!-- Digital Sutil [5] -->
          <g class="fingerprint-icon" on:click={startLogin} in:scale>
            <path d="M50,55 A10,10 0 0,1 60,65" stroke="var(--neon-cyan)" fill="none" />
            <path d="M45,52 A15,15 0 0,1 65,67" stroke="var(--neon-cyan)" fill="none" opacity="0.6"/>
            <circle cx="50" cy="65" r="25" fill="transparent" />
          </g>
        {/if}
      </svg>
    </div>

    {#if stage === 'locked'}
      <p class="loading-status">{loadingText}</p>
    {/if}
  </div>
</main>

<style>
  .opening-matrix {
    height: 100vh; width: 100vw; overflow: hidden;
    background: radial-gradient(circle, #3a3a99 0%, #0b0e11 100%); /* Azul com Roxo Degradê [5] */
    display: flex; justify-content: center; align-items: center; position: relative;
  }

  .wave-bg {
    position: absolute; width: 200%; height: 200%;
    background: url('/assets/fabric-texture.svg'); /* Tecido balançando [5] */
    animation: waveMove 20s infinite alternate ease-in-out;
    opacity: 0.2; pointer-events: none;
  }

  .vignette {
    position: absolute; inset: 0;
    box-shadow: inset 0 0 150px 50px #000; /* Pulsante preto lateral [5] */
    animation: pulseVignette 4s infinite alternate;
  }

  .padlock-container { width: 60%; max-width: 400px; transition: transform 0.5s; }
  
  .padlock-svg { fill: none; stroke: var(--neon-cyan); stroke-width: 2; filter: drop-shadow(0 0 10px var(--neon-cyan)); }
  
  .shackle { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: 70% 40%; }
  
  .padlock-container.open .shackle { transform: translateY(-15px) rotate(15deg); }

  .fingerprint-icon { cursor: pointer; animation: glowPulse 2s infinite; }

  .loading-status {
    position: absolute; bottom: 15%; color: white; font-family: var(--font-main);
    text-shadow: 0 0 5px var(--neon-cyan); letter-spacing: 1px;
  }

  @keyframes waveMove { from { transform: translate(-10%, -10%) rotate(0deg); } to { transform: translate(5%, 5%) rotate(5deg); } }
  @keyframes pulseVignette { from { opacity: 0.7; } to { opacity: 1; } }
  @keyframes glowPulse { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.5) drop-shadow(0 0 15px var(--neon-cyan)); } }
</style>