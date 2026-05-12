<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  let status = "Sincronizando Identidade...";
  let progress = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (progress < 90) progress += 2;
    }, 100);
    return () => clearInterval(interval);
  });
</script>

<div class="handshake-viewport" in:fade>
  <div class="matrix-background"></div>
  
  <div class="central-scanner" in:scale>
    <!-- Scanner Circular SVG Matemático -->
    <svg viewBox="0 0 200 200" class="scanner-svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--neon-cyan)" stop-opacity="0.5" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
      </defs>
      
      <!-- Anéis de Dados Giratórios -->
      <circle cx="100" cy="100" r="80" class="ring outer" />
      <circle cx="100" cy="100" r="60" class="ring inner" />
      
      <!-- Raios de Validação -->
      {#each Array(12) as _, i}
        <line x1="100" y1="100" x2="100" y2="20" 
          class="validation-ray" 
          transform="rotate({i * 30} 100 100)" 
        />
      {/each}

      <!-- Ícone Central de Identidade -->
      <path d="M80,130 Q100,70 120,130" stroke="var(--neon-emerald)" stroke-width="3" fill="none" class="id-arc" />
      <circle cx="100" cy="80" r="15" fill="var(--neon-cyan)" class="id-core" />
    </svg>

    <div class="status-box">
      <p class="status-text">{status}</p>
      <div class="progress-track">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
      <span class="percentage">{progress}%</span>
    </div>
  </div>
</div>

<style>
  .handshake-viewport {
    position: fixed; inset: 0; z-index: 10000;
    background: radial-gradient(circle, #0b0e11 0%, #050508 100%);
    display: flex; justify-content: center; align-items: center;
    overflow: hidden;
  }

  .matrix-background {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    transform: perspective(500px) rotateX(60deg) translateY(-100px);
    animation: gridMove 10s infinite linear;
  }

  .scanner-svg {
    width: 300px; height: 300px;
    filter: drop-shadow(0 0 20px var(--neon-cyan));
  }

  .ring {
    fill: none; stroke: var(--neon-cyan);
    stroke-width: 1; stroke-dasharray: 10 20;
    transform-origin: center;
  }

  .ring.outer { animation: rotateCW 10s infinite linear; opacity: 0.4; }
  .ring.inner { animation: rotateCCW 6s infinite linear; stroke: var(--neon-emerald); opacity: 0.6; }

  .validation-ray {
    stroke: var(--neon-cyan); stroke-width: 0.5;
    opacity: 0.2; animation: rayPulse 2s infinite alternate;
  }

  .id-core { animation: corePulse 2s infinite alternate; }

  .status-box {
    margin-top: 30px; text-align: center;
    font-family: var(--font-main);
  }

  .status-text {
    color: white; font-weight: 800; letter-spacing: 5px;
    text-transform: uppercase; font-size: 0.75rem;
    text-shadow: 0 0 10px var(--neon-cyan);
  }

  .progress-track {
    width: 250px; height: 4px; background: rgba(255,255,255,0.05);
    margin: 15px auto; border-radius: 10px; overflow: hidden;
  }

  .progress-fill {
    height: 100%; background: var(--neon-emerald);
    box-shadow: 0 0 15px var(--neon-emerald);
    transition: width 0.3s ease;
  }

  .percentage { color: var(--neon-cyan); font-size: 0.7rem; font-weight: bold; }

  @keyframes gridMove { from { background-position: 0 0; } to { background-position: 0 400px; } }
  @keyframes rotateCW { to { transform: rotate(360deg); } }
  @keyframes rotateCCW { to { transform: rotate(-360deg); } }
  @keyframes rayPulse { from { opacity: 0.1; } to { opacity: 0.5; stroke-width: 2; } }
  @keyframes corePulse { from { r: 15; opacity: 0.6; } to { r: 18; opacity: 1; filter: brightness(1.5); } }
</style>