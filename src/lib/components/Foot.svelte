<script>
  import { blockStore } from '../stores/blocks';
  let isCoinGolden = true;

  function haptic() {
    if (navigator.vibrate) navigator.vibrate(20);
  }

  function triggerRoleta() {
    haptic();
    console.log("Abrindo Roleta de Ganhos...");
  }
</script>

<nav class="foot-nav glass-morphism">
  <div class="nav-group left">
    <button class="radial-btn" on:click={haptic}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12H2L12 2l10 10zM2 12v10h20V12"/></svg>
    </button>
    <button class="radial-btn active" on:click={haptic}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <div class="active-glow"></div>
    </button>
  </div>

  <div class="coin-hub" on:click={triggerRoleta}>
    <div class="coin-ic" class:golden={isCoinGolden}>
      <span class="symbol">Ic</span>
    </div>
    <div class="swipe-indicator"></div>
  </div>

  <div class="nav-group right">
    <button class="radial-btn" on:click={haptic}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
    </button>
    <button class="radial-btn" on:click={haptic}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    </button>
  </div>
</nav>

<style>
  .foot-nav {
    position: fixed; bottom: 0; left: 0; width: 100%; height: 85px;
    display: flex; justify-content: space-around; align-items: center;
    background: #0d0d12; border-top: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1001; padding-bottom: env(safe-area-inset-bottom);
  }

  .nav-group { display: flex; gap: 25px; align-items: center; }

  .radial-btn {
    width: 50px; height: 50px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.03); border: none;
    display: flex; justify-content: center; align-items: center;
    color: #666; position: relative; transition: 0.4s;
  }

  .radial-btn.active {
    color: var(--neon-cyan); transform: translateY(-6px);
    border: 1px solid var(--neon-cyan);
    box-shadow: 0 0 20px rgba(0, 200, 255, 0.2);
  }

  .active-glow {
    position: absolute; inset: -4px; border-radius: 50%;
    box-shadow: 0 0 15px var(--neon-cyan); opacity: 0.2;
  }

  .coin-hub { width: 80px; height: 80px; margin-top: -45px; position: relative; cursor: pointer; }

  .coin-ic {
    width: 100%; height: 100%; border-radius: 50%;
    display: flex; justify-content: center; align-items: center;
    font-weight: 900; font-size: 1.4rem; border: 3px solid #fff;
    transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .coin-ic.golden {
    background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
    color: #5C4033; box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
  }

  .swipe-indicator {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    width: 35px; height: 4px; background: var(--neon-gold);
    border-radius: 10px; animation: pulseHint 2s infinite;
  }

  @keyframes pulseHint {
    0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
    50% { opacity: 1; transform: translateX(-50%) scaleX(1.3); }
  }
</style>