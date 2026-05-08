<!-- 
     ARQUIVO: src/lib/components/InactivityOverlay.svelte 
     OBJETIVO: PELÍCULA DE DESCANSO DE TELA (REGRAS GERAIS INVIS)
-->

<script>
    import { onMount } from 'svelte';
    import { icGold } from '../stores/session';
    import { fade } from 'svelte/transition';

    let time = "";
    let date = "";
    let battery = "100%";

    function updateClock() {
        const now = new Date();
        time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    onMount(() => {
        updateClock();
        const timer = setInterval(updateClock, 1000);

        // API de Bateria
        if (navigator.getBattery) {
            navigator.getBattery().then(batt => {
                battery = `${Math.round(batt.level * 100)}%`;
                batt.addEventListener('levelchange', () => {
                    battery = `${Math.round(batt.level * 100)}%`;
                });
            });
        }

        return () => clearInterval(timer);
    });
</script>

<div class="inactivity-shroud" transition:fade>
    
    <div class="clock-section">
        <h1 class="giant-time">{time}</h1>
        <p class="date-text">{date}</p>
    </div>

    <div class="battery-section">
        <span class="battery-label">Bateria Restante</span>
        <h2 class="battery-percent">{battery}</h2>
    </div>

    <div class="status-box">
        <p>Suas atividades estão pausadas por falta de atividade</p>
        <div class="ic-counter">
            <span class="amount">{$icGold.toFixed(10)}</span>
            <span class="unit">ic</span>
        </div>
        <!-- Placeholder para miniatura da última atividade -->
        <div class="last-activity-square"></div>
    </div>

</div>

<style>
    .inactivity-shroud {
        position: fixed; inset: 0; z-index: 2000;
        background: rgba(0, 0, 0, 0.95);
        display: flex; flex-direction: column; justify-content: space-around;
        align-items: center; color: white; text-align: center;
    }

    .giant-time { 
        font-size: 5rem; font-weight: 900; margin: 0;
        width: 100%; text-transform: uppercase;
    }

    .date-text { color: #aaa; font-size: 1.2rem; }

    .battery-label { color: #888; font-size: 0.9rem; }
    .battery-percent { color: #ddd; font-size: 2rem; margin-top: 5px; }

    .status-box p { color: var(--neon-red); font-weight: bold; font-size: 0.9rem; }

    .ic-counter { margin: 20px 0; }
    .ic-counter .amount { font-size: 1.5rem; color: var(--neon-emerald); font-weight: bold; }
    .ic-counter .unit { color: var(--neon-emerald); margin-left: 5px; }

    .last-activity-square {
        width: 80px; height: 80px; background: white; margin: 0 auto;
        border-radius: 12px; opacity: 0.5;
    }
</style>