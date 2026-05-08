<!-- 
     ARQUIVO: src/lib/components/Top.svelte 
     OBJETIVO: CABEÇALHO FIXO, FINANCEIRO E GESTÃO DE IDIOMAS [21, 22, 26-30]
-->

<script>
    import { icGold, userLang } from '../stores/session';
    import { fade } from 'svelte/transition';

    let showLanguages = false;

    // Função de Logout de Emergência [21, 22, 26]
    function handleLogout() {
        if(confirm("Tem certeza que deseja sair? Seu progresso de mineração será afetado!")) {
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    // Modal Carteira Digital (Acionado por Duplo Clique no Gráfico) [22, 28]
    function openWallet() {
        console.log("Abrindo Carteira Digital...");
    }

    // Gesto de Pressão no Logo para Aura Search (Refinamento UX) [31, 32]
    let pressTimer;
    function startPress() {
        pressTimer = setTimeout(() => {
            alert("Aura Search Ativado - Pesquisa Omnipresente");
        }, 1500);
    }
    function endPress() { clearTimeout(pressTimer); }

</script>

<header class="top-nav glass-morphism">
    <!-- Lado Esquerdo: Gráfico Corporativo e Saldo [21, 22, 26] -->
    <div class="gain-section" on:dblclick={openWallet} on:mousedown={startPress} on:mouseup={endPress} on:mouseleave={endPress}>
        <div class="gain-chart">
            <svg viewBox="0 0 50 20" class="chart-svg">
                <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5" fill="none" stroke="var(--neon-emerald)" stroke-width="1.5" />
            </svg>
        </div>
        <div class="balance-display">
            <span class="ic-amount">{$icGold.toFixed(4)} ic</span>
        </div>
    </div>

    <!-- Centro: Logout de Emergência [21, 22, 26] -->
    <div class="center-actions">
        <button class="btn-logout" on:click={handleLogout}>LOGOUT</button>
    </div>

    <!-- Lado Direito: Globo (12 Idiomas) e Menu [21, 22, 27] -->
    <div class="system-section">
        <button class="btn-globe" on:click={() => showLanguages = !showLanguages}>
            <img src="/icons/globe.svg" alt="Languages" />
        </button>
        <button class="btn-menu">
            <div class="hamburger"></div>
        </button>
    </div>

    {#if showLanguages}
        <div class="language-modal" transition:fade>
            <p>Selecione seu Idioma (12 disponíveis)</p>
            <!-- Lista de idiomas injetada dinamicamente via i18n dictionary [33] -->
        </div>
    {/if}
</header>

<style>
    .top-nav {
        position: fixed; top: 0; left: 0; width: 100%; height: 70px;
        display: flex; justify-content: space-between; align-items: center;
        padding: 0 20px; z-index: 1000;
        background: rgba(11, 14, 17, 0.75);
        border-bottom: 1px solid rgba(0, 200, 255, 0.2);
        backdrop-filter: blur(20px);
    }

    .gain-section { cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; }
    .chart-svg { width: 50px; height: 20px; filter: drop-shadow(0 0 5px var(--neon-emerald)); }
    .ic-amount { color: var(--neon-emerald); font-weight: bold; font-size: 0.9rem; text-shadow: 0 0 10px rgba(0, 255, 128, 0.5); }

    .btn-logout {
        background: rgba(255, 77, 77, 0.15); border: 1px solid var(--neon-red);
        color: var(--neon-red); padding: 5px 15px; border-radius: 20px;
        font-weight: bold; font-size: 0.75rem; cursor: pointer;
    }

    .system-section { display: flex; gap: 15px; }
    .btn-globe img { width: 24px; filter: invert(1); }
    
    .hamburger {
        width: 20px; height: 2px; background: white; position: relative;
    }
    .hamburger::before, .hamburger::after {
        content: ""; width: 20px; height: 2px; background: white;
        position: absolute; left: 0;
    }
    .hamburger::before { top: -6px; }
    .hamburger::after { top: 6px; }

    .language-modal {
        position: absolute; top: 75px; right: 20px;
        background: #0b0e11; border: 1px solid var(--neon-cyan);
        padding: 20px; border-radius: 15px;
    }
</style>