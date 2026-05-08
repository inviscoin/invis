<script>
    import { onMount } from 'svelte';
    import { blockStore } from '../stores/blocks';
    
    let icBalance = "3.250"; // Exemplo vindo do banco [14]
    let isPrivate = false;

    // Lógica: Duplo clique no gráfico abre o Modal Financeiro [15, 16]
    function openWallet() {
        console.log("Invocando Modal Carteira Digital...");
    }

    function togglePrivacy() {
        isPrivate = !isPrivate; // Modo Privacidade Financeira [17]
    }
</script>

<header class="top-header glass-container gpu-accelerated">
    <!-- Lado Esquerdo: Gráfico Corporativo [12, 16] -->
    <div class="earnings-area" on:dblclick={openWallet}>
        <div class="mini-chart">
            <svg viewBox="0 0 100 40" class="chart-svg">
                <path d="M0,35 Q25,10 50,25 T100,5" fill="none" stroke="var(--neon-emerald)" stroke-width="2" />
            </svg>
        </div>
        <div class="balance-display">
            <span class="label">INVISCoins</span>
            <span class="value">{isPrivate ? "****" : icBalance} <small>ic</small></span>
        </div>
    </div>

    <!-- Centro: Logout de Emergência [12, 13] -->
    <button class="btn-logout">LOGOUT</button>

    <!-- Lado Direito: Internacionalização e Menu [16, 18] -->
    <div class="nav-actions">
        <button class="icon-btn" title="Alterar Idioma (12)">🌐</button>
        <button class="icon-btn menu-trigger">☰</button>
    </div>
</header>

<style>
    .top-header {
        height: 80px; width: 100%; display: flex; justify-content: space-between;
        align-items: center; padding: 0 20px; z-index: 1000;
        background: var(--bg-glass); backdrop-filter: var(--blur-standard);
        border-bottom: var(--glass-border);
    }
    .earnings-area { cursor: pointer; display: flex; align-items: center; gap: 10px; }
    .chart-svg { width: 60px; filter: drop-shadow(0 0 5px var(--neon-emerald)); }
    .balance-display .value { color: var(--neon-emerald); font-weight: bold; font-size: 1.2rem; }
    .btn-logout { 
        background: rgba(255, 77, 77, 0.2); color: var(--neon-red);
        border: 1px solid var(--neon-red); padding: 8px 20px; border-radius: 12px;
        font-weight: bold; cursor: pointer;
    }
    .icon-btn { background: none; border: none; font-size: 1.5rem; color: white; cursor: pointer; }
</style>