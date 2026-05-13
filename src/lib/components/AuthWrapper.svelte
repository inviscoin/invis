<script>
    /* ARQUIVO: src/lib/components/AuthWrapper.svelte */
    /* OBJETIVO: ENVOLTÓRIO COM RAIOS LUMINOSOS E REFLEXO DE PISTA MOLHADA */
    import { fade } from 'svelte/transition';
</script>

<div class="auth-matrix-container">
    <!-- Raios Luminosos Externos (Fora da Caixa) -->
    <div class="neon-rays-external">
        {#each Array(12) as _, i}
            <div class="ray" style="--rotation: {i * 30}deg; --delay: {i * 0.2}s"></div>
        {/each}
    </div>

    <!-- Reflexo de Pista Molhada (Base da Tela) -->
    <div class="wet-floor-effect"></div>

    <div class="auth-box-positioning" in:fade={{ duration: 800 }}>
        <slot />
    </div>
</div>

<style>
    .auth-matrix-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle at center, #1a1a40 0%, #0b0e11 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .neon-rays-external {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .ray {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 150vh;
        background: linear-gradient(to top, var(--neon-cyan), transparent);
        transform: translate(-50%, -50%) rotate(var(--rotation));
        opacity: 0.1;
        animation: rayPulse 4s infinite alternate;
        animation-delay: var(--delay);
    }

    @keyframes rayPulse {
        from { opacity: 0.05; transform: translate(-50%, -50%) rotate(var(--rotation)) scale(0.8); }
        to { opacity: 0.2; transform: translate(-50%, -50%) rotate(var(--rotation)) scale(1.1); }
    }

    .wet-floor-effect {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40%;
        background: linear-gradient(to top, rgba(0, 200, 255, 0.1), transparent);
        filter: blur(40px);
        mask-image: linear-gradient(to bottom, transparent, black);
        pointer-events: none;
        z-index: 2;
    }

    .auth-box-positioning {
        z-index: 10;
        width: 100%;
        max-width: 420px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>