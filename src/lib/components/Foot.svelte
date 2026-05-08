<!-- 
     ARQUIVO: src/lib/components/Foot.svelte 
     OBJETIVO: CENTRAL DE COMANDO RADIAL E GATILHO DE ROLETA [34-47]
-->

<script>
    import { blockStore } from '../stores/blocks';
    import { icSilver, userTier } from '../stores/session';
    
    let isCoinGolden = true; // Status de recarga da Moeda [37]

    // Gesto de Arraste para Cima (Swipe Up) -> Multitarefas [43, 47]
    function handleSwipeUp() {
        console.log("Abrindo Painel de Escolha de Layout (Blocos/PiP)");
    }

    // 1º Clique na Moeda -> Sistema de Roleta e Recompensas [38, 47]
    function triggerRoleta() {
        if (!isCoinGolden) return;
        console.log("Expandindo Roleta de Ganhos - Las Vegas Style");
    }

    // Feedback Tátil via Vibration API [46-48]
    function haptic() {
        if (navigator.vibrate) navigator.vibrate(15);
    }
</script>

<nav class="foot-nav glass-morphism">
    <div class="icons-left">
        <button class="radial-btn" on:click={haptic} title="Mídia">
            <img src="/icons/media.svg" alt="Mídia" />
        </button>
        <button class="radial-btn active" on:click={haptic} title="Social">
            <img src="/icons/social.svg" alt="Social" />
            <div class="active-glow"></div>
        </button>
    </div>

    <!-- O Coração da Barra: Moeda Central Ic [37, 46, 47] -->
    <div class="coin-container" 
         on:click={triggerRoleta} 
         on:touchstart={haptic}>
        <div class="coin-ic" class:golden={isCoinGolden} class:gray={!isCoinGolden}>
            <span class="symbol">Ic</span>
        </div>
        <!-- Indicador de Arraste (Swipe Up Indicator) [43] -->
        <div class="swipe-hint"></div>
    </div>

    <div class="icons-right">
        <button class="radial-btn" on:click={haptic} title="Jogos">
            <img src="/icons/games.svg" alt="Jogos" />
        </button>
        <button class="radial-btn" on:click={haptic} title="Biblioteca">
            <img src="/icons/library.svg" alt="Biblioteca" />
        </button>
    </div>
</nav>

<style>
    .foot-nav {
        position: fixed; bottom: 0; left: 0; width: 100%; height: 85px;
        display: flex; justify-content: space-around; align-items: center;
        background: #0d0d12; border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding-bottom: env(safe-area-inset-bottom);
        z-index: 1001;
    }

    .radial-btn {
        width: 50px; height: 50px; border-radius: 50%;
        background: rgba(255, 255, 255, 0.05); border: none;
        display: flex; justify-content: center; align-items: center;
        position: relative; cursor: pointer; transition: 0.3s;
    }

    .radial-btn.active {
        transform: translateY(-4px); /* Salta 4px fora da barra [35, 46] */
        border: 1px solid var(--neon-cyan);
    }

    .active-glow {
        position: absolute; inset: -5px; border-radius: 50%;
        box-shadow: 0 0 15px var(--neon-cyan); opacity: 0.3;
    }

    .radial-btn img { width: 24px; opacity: 0.7; }
    .radial-btn.active img { opacity: 1; filter: drop-shadow(0 0 5px var(--neon-cyan)); }

    .coin-container {
        width: 70px; height: 70px; margin-top: -35px;
        display: flex; justify-content: center; align-items: center;
        position: relative;
    }

    .coin-ic {
        width: 60px; height: 60px; border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        font-weight: bold; border: 3px solid; transition: 0.5s;
    }

    .coin-ic.golden {
        background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
        border-color: #FFF; color: #5C4033;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
    }

    .coin-ic.gray {
        background: #333; border-color: #555; color: #888;
        filter: grayscale(1);
    }

    .swipe-hint {
        position: absolute; top: -15px; width: 30px; height: 4px;
        background: var(--neon-gold); border-radius: 2px;
        animation: pulseHint 2s infinite;
    }

    @keyframes pulseHint {
        0%, 100% { opacity: 0.3; transform: scaleX(1); }
        50% { opacity: 1; transform: scaleX(1.2); }
    }
</style>