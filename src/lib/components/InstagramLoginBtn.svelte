<script>
  import { fade, scale } from 'svelte/transition';
  export let isLoading = false;

  function triggerInstagramAuth() {
    console.log("Iniciando Handshake Instagram OAuth 2.0...");
    // Gatilho para o Proxy Seguro INVIS
  }
</script>

<button class="ig-btn glass-morphism" on:click={triggerInstagramAuth} disabled={isLoading} in:scale>
  <div class="ig-icon-container">
    <!-- Logotipo Instagram SVG de Alta Precisão -->
    <svg viewBox="0 0 24 24" width="30" height="30">
      <defs>
        <radialGradient id="ig-grad" cx="0.5" cy="1" r="1">
          <stop offset="0%" stop-color="#fee411"/>
          <stop offset="25%" stop-color="#fe5c5c"/>
          <stop offset="50%" stop-color="#a4309a"/>
          <stop offset="100%" stop-color="#3b33af"/>
        </radialGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.353 2.619 6.778 6.981 6.98 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.777-2.62 6.98-6.98.059-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.2-4.353-2.619-6.777-6.983-6.98C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.222.144 4.775 1.974 4.921 5.212.054 1.265.069 1.648.069 4.849s-.015 3.585-.069 4.849c-.149 3.228-1.709 5.057-4.921 5.212-1.265.054-1.648.069-4.849.069s-3.585-.015-4.849-.069c-3.224-.144-4.775-1.975-4.921-5.212-.054-1.265-.069-1.648-.069-4.849s.015-3.585.069-4.849c.149-3.224 1.709-5.056 4.921-5.212 1.265-.055 1.648-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  </div>
  <span class="btn-text">{isLoading ? "CONECTANDO..." : "INSTAGRAM"}</span>
  <div class="glow-layer"></div>
</button>

<style>
  .ig-btn {
    position: relative;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    backdrop-filter: blur(10px);
  }

  .ig-btn:hover {
    border-color: #ff3379;
    box-shadow: 0 0 25px rgba(255, 51, 121, 0.3);
    transform: translateY(-3px);
  }

  .ig-icon-container {
    display: flex;
    filter: drop-shadow(0 0 5px rgba(255, 51, 121, 0.5));
  }

  .btn-text {
    color: white;
    font-family: var(--font-main);
    font-weight: 800;
    letter-spacing: 4px;
    font-size: 0.9rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .glow-layer {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 51, 121, 0.1), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
  }

  .ig-btn:hover .glow-layer {
    transform: translateX(100%);
  }

  .ig-btn:active {
    transform: scale(0.97);
  }
</style>