<script>
  import { icGold } from '../stores/session';
  import { fade } from 'svelte/transition';

  function handleLogout() {
    if(confirm("Encerrar sessão? O progresso de mineração será pausado!")) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
</script>

<header class="top-nav glass-morphism">
  <!-- Gráfico Corporativo e Saldo [3, 4] -->
  <div class="gain-section" on:dblclick={() => console.log("Abrindo Carteira...")}>
    <div class="gain-chart">
      <svg viewBox="0 0 50 20" class="chart-svg">
        <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5" fill="none" stroke="var(--neon-emerald)" stroke-width="1.5" />
      </svg>
    </div>
    <div class="balance-display">
      <span class="ic-amount">{$icGold.toFixed(4)} ic</span>
    </div>
  </div>

  <div class="center-actions">
    <button class="btn-logout" on:click={handleLogout}>LOGOUT</button>
  </div>

  <div class="system-section">
    <button class="btn-globe">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    </button>
    <div class="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</header>

<style>
  .top-nav {
    position: fixed; top: 0; left: 0; width: 100%; height: 70px;
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 20px; z-index: 1000;
    background: rgba(11, 14, 17, 0.8);
    border-bottom: 1px solid rgba(0, 200, 255, 0.2);
    backdrop-filter: blur(20px);
  }

  .gain-section { cursor: pointer; display: flex; flex-direction: column; }
  .chart-svg { width: 60px; height: 25px; filter: drop-shadow(0 0 5px var(--neon-emerald)); }
  .ic-amount { color: var(--neon-emerald); font-weight: 800; font-size: 0.9rem; text-shadow: 0 0 10px rgba(0, 255, 128, 0.5); }

  .btn-logout {
    background: rgba(255, 77, 77, 0.1); border: 1px solid var(--neon-red);
    color: var(--neon-red); padding: 6px 16px; border-radius: 20px;
    font-size: 0.7rem; font-weight: bold; cursor: pointer;
    transition: 0.3s;
  }
  .btn-logout:hover { background: var(--neon-red); color: white; }

  .hamburger { display: flex; flex-direction: column; gap: 4px; cursor: pointer; }
  .hamburger span { width: 22px; height: 2px; background: white; border-radius: 2px; }
</style>