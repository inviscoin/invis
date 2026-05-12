<script>
  import { fade, scale } from 'svelte/transition';
  export let status = "Validando Identidade...";
</script>

<div class="handshake-overlay" in:fade>
  <!-- Raios Luminosos durante a validação -->
  <div class="rays-container">
    <svg viewBox="0 0 100 100" class="rays-svg">
      {#each Array(8) as _, i}
        <line x1="50" y1="50" x2="50" y2="0" 
          stroke="var(--neon-cyan)" 
          stroke-width="0.5" 
          transform="rotate({i * 45} 50 50)"
          class="pulse-ray"
        />
      {/each}
    </svg>
  </div>

  <div class="status-box glass-morphism" in:scale>
    <div class="loader-matrix"></div>
    <p class="status-text">{status}</p>
  </div>
</div>

<style>
  .handshake-overlay {
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(11, 14, 17, 0.95);
    display: flex; justify-content: center; align-items: center;
  }

  .rays-container { position: absolute; inset: 0; opacity: 0.4; }
  .pulse-ray { animation: rayGlow 2s infinite alternate; }

  .status-box {
    padding: 40px; border-radius: 24px; text-align: center;
    border: 1px solid var(--neon-cyan);
    box-shadow: 0 0 30px var(--neon-cyan);
  }

  .loader-matrix {
    width: 40px; height: 40px; border: 3px solid transparent;
    border-top-color: var(--neon-cyan); border-radius: 50%;
    animation: spin 1s linear infinite; margin: 0 auto 20px;
  }

  .status-text {
    color: white; letter-spacing: 4px; font-weight: 800;
    text-transform: uppercase; font-size: 0.7rem;
  }

  @keyframes rayGlow { from { opacity: 0.2; } to { opacity: 1; stroke-width: 1.5; } }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>