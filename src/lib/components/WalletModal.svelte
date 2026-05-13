<script>
    /* ARQUIVO: src/lib/components/WalletModal.svelte */
    /* OBJETIVO: UI DA CARTEIRA DIGITAL - CARTÃO INVIS E CONVERSÃO [18, 19] */
    import { icGold, icSilver, userTier } from '$lib/stores/session';
    import { convertICToFiat, MIN_WITHDRAWAL } from '$lib/wallet/dual_wallet';
    import TransactionHistory from './TransactionHistory.svelte';
    import { fade, scale, slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let isOpen = false;
    let mode = 'card'; // card, convert, donate

    $: fiatValue = convertICToFiat($icGold);

    function copyPix() {
        navigator.clipboard.writeText("invis.suporte@gmail.com");
        if (navigator.vibrate) navigator.vibrate(50);
    }
</script>

{#if isOpen}
<div class="wallet-shroud" transition:fade on:click={() => dispatch('close')}>
    <div class="wallet-container glass-morphism gpu-accelerated" on:click|stopPropagation in:scale>
        <header class="modal-header">
            <h2 class="neon-text-cyan">CARTEIRA DIGITAL</h2>
            <button class="btn-close" on:click={() => dispatch('close')}>✕</button>
        </header>

        {#if mode === 'card'}
        <!-- O CARTÃO INVIS (Identidade Visual Premium) [20, 21] -->
        <div class="invis-card-digital" in:scale>
            <div class="chip"></div>
            <div class="card-logo">INVIS</div>
            <div class="nickname">{$userTier} ACCOUNT</div>
            <div class="balance-ic">{$icGold.toFixed(8)} <span class="unit">ic</span></div>
            <div class="silver-info">Saldo Prata: {$icSilver.toFixed(2)} ic</div>
            <div class="card-footer">MATRIZ SINCRO</div>
            <div class="card-glow"></div>
        </div>

        <div class="history-section">
            <p class="history-label">Últimas Transações</p>
            <TransactionHistory />
        </div>

        <div class="action-row">
            <button class="btn-neon" on:click={() => mode = 'convert'}>CONVERTER</button>
            <button class="btn-neon-purple" on:click={() => mode = 'donate'}>DOAR</button>
        </div>

        {:else if mode === 'convert'}
        <div class="conversion-view" in:slide>
            <h3 class="neon-text-emerald">Conversor de Ativos</h3>
            <div class="result-box">
                <span class="fiat-symbol">R$</span>
                <span class="fiat-value">{fiatValue.toFixed(2)}</span>
            </div>
            <p class="limit-info">Mínimo para saque: R$ 20,00 [2, 22]</p>
            <button class="btn-withdraw" disabled={fiatValue < MIN_WITHDRAWAL}>
                SOLICITAR SAQUE
            </button>
            <button class="btn-back" on:click={() => mode = 'card'}>VOLTAR</button>
        </div>

        {:else if mode === 'donate'}
        <div class="donate-view" in:slide>
            <p>Sua contribuição ajuda a manter os servidores ativos.</p>
            <div class="pix-area">
                <code>invis.suporte@gmail.com</code>
                <button class="btn-copy" on:click={copyPix}>COPIAR</button>
            </div>
            <button class="btn-back" on:click={() => mode = 'card'}>VOLTAR</button>
        </div>
        {/if}
    </div>
</div>
{/if}

<style>
    .wallet-shroud {
        position: fixed; inset: 0; background: rgba(0,0,0,0.9);
        display: flex; justify-content: center; align-items: center; z-index: 3000;
        backdrop-filter: blur(25px);
    }

    .wallet-container {
        width: 90%; max-width: 420px; padding: 30px; border-radius: 32px;
        background: #0b0e11; border: 1px solid var(--neon-cyan);
        box-shadow: 0 0 50px rgba(0, 200, 255, 0.15);
        display: flex; flex-direction: column; gap: 20px;
    }

    .modal-header { display: flex; justify-content: space-between; align-items: center; }
    .btn-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }

    .invis-card-digital {
        height: 220px; border-radius: 24px; padding: 25px;
        background: linear-gradient(135deg, #121212 0%, #1a1a2e 100%);
        border: 1px solid rgba(255,255,255,0.1); position: relative;
        overflow: hidden; box-shadow: 10px 10px 30px rgba(0,0,0,0.5);
    }

    .chip {
        width: 50px; height: 40px; background: linear-gradient(135deg, #ffd700, #d4af37);
        border-radius: 8px; margin-bottom: 20px; position: relative;
    }

    .card-logo { position: absolute; top: 25px; right: 25px; font-weight: 900; letter-spacing: 4px; color: rgba(255,255,255,0.1); }
    .nickname { font-size: 0.75rem; color: #888; letter-spacing: 2px; text-transform: uppercase; }
    .balance-ic { font-size: 2rem; font-weight: 900; color: var(--neon-cyan); margin: 15px 0; text-shadow: 0 0 15px var(--neon-cyan); }
    .unit { font-size: 1rem; opacity: 0.5; }
    .silver-info { font-size: 0.8rem; color: #aaa; }
    .card-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(0, 200, 255, 0.05), transparent); pointer-events: none; }

    .history-section { flex: 1; min-height: 200px; overflow: hidden; display: flex; flex-direction: column; }
    .history-label { font-size: 0.7rem; color: #555; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 3px; }

    .action-row { display: flex; gap: 15px; }
    .btn-neon, .btn-neon-purple {
        flex: 1; padding: 15px; border-radius: 12px; border: 1px solid;
        font-weight: 900; cursor: pointer; transition: 0.4s; background: transparent;
    }
    .btn-neon { color: var(--neon-cyan); border-color: var(--neon-cyan); box-shadow: inset 0 0 10px rgba(0, 200, 255, 0.1); }
    .btn-neon-purple { color: var(--neon-purple); border-color: var(--neon-purple); }

    .conversion-view { text-align: center; padding: 20px 0; }
    .result-box { margin: 25px 0; font-size: 3.5rem; font-weight: 900; color: var(--neon-emerald); }
    .btn-withdraw {
        width: 100%; padding: 18px; background: var(--neon-emerald); color: #000;
        border: none; border-radius: 12px; font-weight: 900; cursor: pointer;
    }
    .btn-withdraw:disabled { background: #333; color: #666; cursor: not-allowed; }
    .btn-back { margin-top: 25px; background: none; border: none; color: #555; cursor: pointer; text-decoration: underline; font-size: 0.8rem; }

    .pix-area { background: rgba(255,255,255,0.03); padding: 20px; border-radius: 14px; margin: 20px 0; display: flex; justify-content: space-between; align-items: center; }
</style>