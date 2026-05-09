<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let stage = 'locked'; // locked, opening, fingerprint [1]
  let loadingText = "Iniciando sistema de segurança...";
  let progress = 0;

  const messages = [
    "Carregando sistema segurança...",
    "Sincronizando tradução Babel...",
    "Limpando área de trabalho...",
    "Aperfeiçoamento de fluidez GPU...",
    "Verificando integridade da Matriz..."
  ]; [12]

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
        // Simula a abertura mecânica do cadeado antes da digital [13]
        setTimeout(() => { 
          stage = 'fingerprint'; 
          loadingText = "IDENTIDADE RECONHECIDA";
        }, 1000);
      }
    }, 1000); // 5 segundos totais para imersão [13]
  });

  function startLogin() {
    goto('/login'); [13]
  }
</script>

<main class="opening-matrix">
  <!-- Fundo de Tecido Dinâmico/Ondas [14] -->
  <div class="wave-bg"></div>

  <!-- Vinheta Pulsante Escura Lateral [14] -->
  <div class="vignette"></div>

  <div class="center-content" in:fade>
    <!-- Cadeado SVG de Alta Precisão (60% da tela) [11, 15] -->
    <div class="padlock-container" class:open={stage !== 'locked'}>
      <svg viewBox="0 0 100 100" class="padlock-svg">
        <!-- Estrutura mecânica do arco -->
        <path class="shackle" d="M30,40 V30 A20,20 0 0,1 70,30 V40" />
        <!-- Corpo do Cadeado com preenchimento translúcido -->
        <rect class="body" x="20" y="40" width="60" height="50" rx="10" fill="rgba(11, 14, 17, 0.8)" />
        
        {#if stage === 'fingerprint'}
          <!-- Ícone de Digital Sutil para Estímulo de Clique [16, 17] -->
          <g class="fingerprint-icon" on:click={startLogin} in:scale>
            <path d="M50,55 A10,10 0 0,1 60,65" stroke="var(--neon-cyan)" fill="none" stroke-width="2" stroke-linecap="round" />
            <path d="M45,52 A15,15 0 0,1 65,67" stroke="var(--neon-cyan)" fill="none" opacity="0.6" stroke-width="2" stroke-linecap="round" />
            <path d="M40,50 A20,20 0 0,1 70,70" stroke="var(--neon-emerald)" fill="none" opacity="0.4" stroke-width="2" stroke-linecap="round" />
            <circle cx="50" cy="65" r="25" fill="transparent" />
          </g>
        {/if}
      </svg>
    </div>

    {#if stage === 'locked' || stage === 'opening'}
      <p class="loading-status" out:fade>{loadingText}</p>
    {/if}
    
    {#if stage === 'fingerprint'}
      <p class="access-hint" in:fade>Toque para Acessar</p>
    {/if}
  </div>
</main>

<style>
  .opening-matrix {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: radial-gradient(circle, #3a3a99 0%, #0b0e11 100%); /* Azul com Roxo Degradê [18, 19] */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .wave-bg {
    position: absolute;
    width: 200%;
    height: 200%;
    background: url('/assets/fabric-texture.svg'); /* Tecido em movimento [14] */
    animation: waveMove 20s infinite alternate ease-in-out;
    opacity: 0.15;
    pointer-events: none;
  }

  .vignette {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 150px 50px #000; /* Pulsante preto lateral [14, 19] */
    animation: pulseVignette 4s infinite alternate;
    pointer-events: none;
  }

  .center-content {
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .padlock-container {
    width: 60%;
    max-width: 400px;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .padlock-svg {
    fill: none;
    stroke: var(--neon-cyan);
    stroke-width: 1.5;
    filter: drop-shadow(0 0 15px var(--neon-cyan));
  }

  .shackle {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: 70% 40%;
  }

  .padlock-container.open .shackle {
    transform: translateY(-15px) rotate(20deg); /* Mecânica de abertura [15] */
    stroke: var(--neon-emerald);
  }

  .fingerprint-icon {
    cursor: pointer;
    animation: glowPulse 2s infinite;
  }

  .loading-status, .access-hint {
    margin-top: 30px;
    color: white;
    font-family: var(--font-main);
    text-shadow: 0 0 10px var(--neon-cyan);
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .access-hint {
    color: var(--neon-emerald);
    animation: blink 1.5s infinite;
  }

  @keyframes waveMove {
    from { transform: translate(-5%, -5%) rotate(0deg); }
    to { transform: translate(5%, 5%) rotate(3deg); }
  }

  @keyframes pulseVignette {
    from { opacity: 0.6; }
    to { opacity: 1; }
  }

  @keyframes glowPulse {
    0%, 100% { filter: brightness(1) drop-shadow(0 0 5px var(--neon-emerald)); }
    50% { filter: brightness(1.8) drop-shadow(0 0 20px var(--neon-emerald)); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
</style>