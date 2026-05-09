<script>
  import { scale } from 'svelte/transition';
  
  export let isLoading = false;
  
  function triggerFacebookAuth() {
    console.log("Iniciando Handshake Meta OAuth 2.0...");
    // Gatilho via Supabase Auth Client
  }
</script>

<button class="fb-btn glass-morphism" on:click={triggerFacebookAuth} disabled={isLoading} in:scale>
  <div class="icon-glow-wrapper">
    <!-- Logotipo Facebook SVG de Alta Precisão -->
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073S0 5.446 0 12.073c0 5.99 4.348 10.951 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.652 23.024 24 18.062 24 12.073z"/>
    </svg>
  </div>
  <span class="btn-text">{isLoading ? "SINCRONIZANDO..." : "FACEBOOK"}</span>
  <div class="magnetic-pulse"></div>
</button>

<style>
  .fb-btn {
    position: relative;
    width: 100%;
    height: 60px;
    background: rgba(24, 119, 242, 0.08);
    border: 1px solid rgba(24, 119, 242, 0.4);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    backdrop-filter: blur(10px);
  }

  .fb-btn:hover {
    background: rgba(24, 119, 242, 0.15);
    border-color: #1877F2;
    box-shadow: 0 0 30px rgba(24, 119, 242, 0.4);
    transform: translateY(-2px);
  }

  .icon-glow-wrapper {
    filter: drop-shadow(0 0 8px rgba(24, 119, 242, 0.8));
    display: flex;
  }

  .btn-text {
    color: white;
    font-family: var(--font-main);
    font-weight: 900;
    letter-spacing: 4px;
    font-size: 0.9rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  .magnetic-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    animation: flow 3s infinite;
  }

  @keyframes flow {
    100% { transform: translateX(100%); }
  }

  .fb-btn:active {
    transform: scale(0.98);
  }
</style>