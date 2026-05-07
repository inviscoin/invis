<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  let isLocked = true;
  let showLoginForm = false;
  let loadingMessage = "Iniciando sistema de segurança...";
  let messages = [
    "Carregando protocolos de tradução...",
    "Limpando área de trabalho...",
    "Aperfeiçoando fluidez de 60 FPS...",
    "Sincronizando carteira Dual-Wallet...",
    "Matriz pronta."
  ];

  onMount(() => {
    // Ciclo de mensagens de carregamento [4]
    let msgIndex = 0;
    const interval = setInterval(() => {
      if (msgIndex < messages.length) {
        loadingMessage = messages[msgIndex];
        msgIndex++;
      }
    }, 1000);

    // Abertura automática do cadeado após 5 segundos [4]
    setTimeout(() => {
      isLocked = false;
      clearInterval(interval);
    }, 5000);
  });

  function unlockAccess() {
    if (!isLocked) showLoginForm = true;
  }
</script>

<main class="login-matrix">
  <!-- Fundo em ondas aleatórias SVG [4] -->
  <div class="waves-bg">
    <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
      <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" fill="rgba(0, 200, 255, 0.05)"></path>
    </svg>
  </div>

  {#if !showLoginForm}
    <div class="lock-screen" in:fade>
      <!-- Cadeado Central Ocupando 60% [5] -->
      <div class="lock-wrapper" on:click={unlockAccess} style="width: 60vh; height: 60vh;">
        <svg viewBox="0 0 24 24" class="padlock" class:opened={!isLocked}>
          <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="var(--neon-cyan)" />
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2ZM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6Z" fill="white" />
        </svg>
        
        {#if !isLocked}
          <div class="fingerprint-hint" in:scale>
            <svg viewBox="0 0 24 24" fill="var(--neon-emerald)">
              <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.67-.2-.13-.24-.04-.55.2-.67C7.82 2.51 9.84 2 12.01 2c2.12 0 3.91.46 5.8 1.58.24.14.32.44.18.69-.07.14-.22.2-.38.2z..." />
            </svg>
            <p class="pulse-text">Clique para Acessar</p>
          </div>
        {/if}
      </div>
      
      <p class="status-msg">{loadingMessage}</p>
    </div>
  {:else}
    <!-- Tela de Login Real com Identidade Social [13, 14] -->
    <div class="auth-card" in:fade>
      <h2 class="neon-text-green">LOGIN</h2>
      <div class="input-group">
        <input type="text" placeholder="Usuário, E-mail ou Telefone" class="neon-input" />
        <input type="password" placeholder="Senha" class="neon-input" />
      </div>
      <button class="btn-login-main">ENTRAR</button>
      
      <div class="social-login">
        <p>Ou acesse com:</p>
        <div class="icons-row">
          <img src="/icons/google.svg" alt="Google" on:click={() => {}} />
          <img src="/icons/facebook.svg" alt="Facebook" on:click={() => {}} />
          <img src="/icons/instagram.svg" alt="Instagram" on:click={() => {}} />
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .login-matrix {
    height: 100vh; width: 100vw;
    background: radial-gradient(circle, #1a1a2e 0%, #0b0e11 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    position: relative; overflow: hidden;
  }
  .padlock { width: 100%; height: 100%; transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
  .padlock.opened { filter: drop-shadow(0 0 20px var(--neon-emerald)); transform: translateY(-10px); }
  .lock-wrapper { cursor: pointer; display: flex; flex-direction: column; align-items: center; }
  .fingerprint-hint { position: absolute; bottom: 10%; width: 60px; animation: glow 1.5s infinite; }
  .status-msg { margin-top: 20px; color: var(--neon-cyan); font-size: 0.9rem; letter-spacing: 1px; }
  .auth-card { 
    background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
    padding: 40px; border-radius: 32px; border: 1px solid var(--neon-border-cyan);
    width: 80%; max-width: 400px; text-align: center;
  }
  .neon-input {
    width: 100%; padding: 15px; margin: 10px 0;
    background: transparent; border: 1px solid rgba(0, 200, 255, 0.3);
    border-radius: 12px; color: white;
  }
  .icons-row { display: flex; justify-content: center; gap: 25px; margin-top: 20px; cursor: pointer; }
  @keyframes glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
</style>