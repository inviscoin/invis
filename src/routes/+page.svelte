<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let isLocked = true;
  let loadingText = "Carregando sistema de segurança...";
  let showFingerprint = false;
  let texts = [
    "Carregando tradução...",
    "Limpando área de trabalho...",
    "Aperfeiçoamento de fluidez...",
    "Sincronizando com a Matriz..."
  ];
  let textIdx = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (textIdx < texts.length) {
        loadingText = texts[textIdx];
        textIdx++;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      isLocked = false;
      showFingerprint = true;
      loadingText = "IDENTIDADE RECONHECIDA";
    }, 5000); // 5 segundos para abertura automática [9]
  });

  function handleAccess() {
    // Redireciona para o login após o clique na digital [9]
    goto('/login');
  }
</script>

<main class="gatekeeper-container">
  <div class="pulsating-overlay"></div>
  
  <div class="center-content">
    <div class="lock-wrapper" class:unlocked={!isLocked} transition:scale>
      <!-- SVG do Cadeado INVIS (Ocupa 60% da tela) [9, 10] -->
      <svg width="240" height="240" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="var(--neon-cyan)" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="3" y="11" width="18" height="11" rx="4" fill="rgba(11, 14, 17, 0.7)" stroke="var(--neon-cyan)" stroke-width="1.5"/>
        {#if showFingerprint}
          <g class="fingerprint" on:click={handleAccess} in:fade>
             <path d="M12 14V18" stroke="var(--neon-emerald)" stroke-width="2" stroke-linecap="round"/>
             <path d="M9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15" stroke="var(--neon-emerald)" stroke-width="2" stroke-linecap="round"/>
          </g>
        {/if}
      </svg>
    </div>

    <p class="status-text">{loadingText}</p>
  </div>
</main>

<style>
  .gatekeeper-container {
    height: 100vh;
    background: radial-gradient(circle, #3a3a99 0%, #0b0e11 100%); /* Azul com roxo degradê [9] */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .pulsating-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 100px #000; /* Pulsante escuro lateral [9] */
    animation: pulse 4s infinite alternate;
  }
  .center-content {
    z-index: 10;
    text-align: center;
  }
  .status-text {
    margin-top: 20px;
    color: var(--neon-cyan);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  @keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
  .fingerprint { cursor: pointer; }
</style>