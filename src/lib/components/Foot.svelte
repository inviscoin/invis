<script>
    /* ARQUIVO: src/lib/components/Foot.svelte */
    /* OBJETIVO: CENTRAL DE COMANDO RADIAL E MOEDA IC COM RECARGA [7, 8] */
    import { blockStore } from '$lib/stores/blocks';
    
    let isCoinGolden = true;

    function hapticFeedback() {
        if (navigator.vibrate) navigator.vibrate(20);
    }

    function triggerRoleta() {
        hapticFeedback();
        console.log("Iniciando Gamificação: Roleta Las Vegas");
    }
</script>

<nav class="foot-nav glass-morphism gpu-accelerated">
    <div class="nav-group left">
        <button class="radial-btn" on:click={hapticFeedback}>
            <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12H2L12 2l10 10zM2 12v10h20V12"/></svg>
        </button>
        <button class="radial-btn active" on:click={hapticFeedback}>
            <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <div class="active-glow"></div>
        </button>
    </div>

    <div class="coin-hub" on:click={triggerRoleta}>
        <div class="coin-ic" class:golden={isCoinGolden}>
            <span class="symbol">Ic</span>
            <div class="coin-shine"></div>
        </div>
        <div class="swipe-indicator"></div>
    </div>

    <div class="nav-group right">
        <button class="radial-btn" on:click={hapticFeedback}>
            <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/></svg>
        </button>
        <button class="radial-btn" on:click={hapticFeedback}>
            <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5"/></svg>
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

    .nav-group { display: flex; gap: 30px; align-items: center; }

    .radial-btn {
        width: 50px; height: 50px; border-radius: 50%;
        background: rgba(255, 255, 255, 0.03); border: none;
        display: flex; justify-content: center; align-items: center;
        color: #666; position: relative; transition: 0.4s;
    }

    .radial-btn.active {
        color: var(--neon-cyan); transform: translateY(-8px);
        border: 1px solid var(--neon-cyan); box-shadow: 0 0 20px rgba(0, 200, 255, 0.2);
    }

    .active-glow {
        position: absolute; inset: -4px; border-radius: 50%;
        box-shadow: 0 0 15px var(--neon-cyan); opacity: 0.3;
    }

    .coin-hub { width: 85px; height: 85px; margin-top: -50px; position: relative; cursor: pointer; }

    .coin-ic {
        width: 100%; height: 100%; border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        font-weight: 900; font-size: 1.6rem; border: 4px solid #fff;
        transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        overflow: hidden; position: relative;
    }

    .coin-ic.golden {
        background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
        color: #5C4033; box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
    }

    .coin-shine {
        position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: rotate(45deg); animation: shine 3s infinite;
    }

    @keyframes shine { from { left: -150%; } to { left: 150%; } }

    .swipe-indicator {
        position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
        width: 40px; height: 4px; background: var(--neon-gold);
        border-radius: 10px; animation: pulseHint 2s infinite;
    }

    @keyframes pulseHint { 0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); } 
                           50% { opacity: 1; transform: translateX(-50%) scaleX(1.4); } }
</style>