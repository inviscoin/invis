<!-- 
     ARQUIVO: src/lib/components/WalletModal.svelte 
     OBJETIVO: UI DA CARTEIRA DIGITAL - CARTÃO INVIS E CONVERSÃO (Fase 5)
-->

<script>
    import { icGold, icSilver, userTier } from '../stores/session';
    import { convertICToFiat, MIN_WITHDRAWAL } from '../wallet/dual_wallet';
    import TransactionHistory from './TransactionHistory.svelte';
    import { fade, scale, slide } from 'svelte/transition';

    export let isOpen = false;
    let mode = 'card'; // card, convert, donate

    // Reatividade para valor fiduciário [1]
    $: fiatValue = convertICToFiat($icGold);

    function copyPix() {
        navigator.clipboard.writeText("invis.suporte@gmail.com");
        if (navigator.vibrate) navigator.vibrate(50);
        alert("Chave Pix copiada para facilitar o pagamento!");
    }

    function toggleMode(newMode) {
        if (navigator.vibrate) navigator.vibrate(15);
        mode = newMode;
    }
</script>

{#if isOpen}
<div class="wallet-shroud" transition:fade on:click={() => isOpen = false}>
    <div class="wallet-container glass-morphism gpu-accelerated" on:click|stopPropagation>
        
        <!-- HEADER DO MODAL -->
        <header class="modal-header">
            <h2 class="neon-text-cyan">CARTEIRA DIGITAL</h2>
            <button class="btn-close" on:click={() => isOpen = false}>✕</button>
        </header>

        {#if mode === 'card'}
            <!-- O CARTÃO INVIS (Identidade Visual Premium) [2] -->
            <div class="invis-card-digital" in:scale>
                <div class="chip"></div>
                <div class="card-logo">INVIS</div>
                <div class="nickname">{$userTier} ACCOUNT</div>
                <div class="balance-ic">{$icGold.toFixed(10)} <span class="unit">ic</span></div>
                <div class="silver-info">Saldo Prata: {$icSilver.toFixed(2)} ic</div>
                <div class="card-footer">MATRIZ SINCRO</div>
            </div>

            <!-- LISTA DE TRANSAÇÕES (Scroll Infinito) [2, 3] -->
            <div class="history-section">
                <p class="history-label">Últimas Transações</p>
                <TransactionHistory />
            </div>

            <div class="action-row">
                <button class="btn-neon" on:click={() => toggleMode('convert')}>CONVERTER</button>
                <button class="btn-neon-purple" on:click={() => toggleMode('donate')}>CONTRIBUIR</button>
            </div>
        
        {:else if mode === 'convert'}
            <!-- CONVERSOR DE ATIVOS [4] -->
            <div class="conversion-view" in:slide>
                <h3 class="neon-text-emerald">Conversor de Ativos</h3>
                <div class="result-box">
                    <span class="fiat-symbol">R$</span>
                    <span class="fiat-value">{fiatValue.toFixed(2)}</span>
                </div>
                <p class="limit-info">Mínimo para saque: R$ 20,00 [5]</p>
                
                <button class="btn-withdraw" disabled={fiatValue < MIN_WITHDRAWAL}>
                    SOLICITAR SAQUE
                </button>
                
                <button class="btn-back" on:click={() => toggleMode('card')}>VOLTAR</button>
            </div>

        {:else if mode === 'donate'}
            <!-- ÁREA DE CONTRIBUIÇÃO (Custo Zero de Servidor) [4] -->
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
        backdrop-filter: blur(15px);
    }

    .wallet-container {
        width: 90%; max-width: 400px; padding: 25px; border-radius: 32px;
        background: #0b0e11; border: 1px solid var(--neon-cyan);
        box-shadow: 0 0 40px rgba(0, 200, 255, 0.15);
        display: flex; flex-direction: column; gap: 20px;
    }

    .modal-header { display: flex; justify-content: space-between; align-items: center; }
    .btn-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }

    .invis-card-digital {
        height: 200px; border-radius: 24px; padding: 25px;
        background: linear-gradient(135deg, #121212 0%, #1a1a2e 100%);
        border: 1px solid rgba(255,255,255,0.1); position: relative;
        overflow: hidden; box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
    }

    .chip { 
        width: 45px; height: 35px; background: linear-gradient(135deg, #ffd700, #d4af37);
        border-radius: 6px; margin-bottom: 15px; position: relative;
    }

    .card-logo { position: absolute; top: 25px; right: 25px; font-weight: 900; letter-spacing: 2px; color: rgba(255,255,255,0.2); }
    .nickname { font-size: 0.7rem; color: #888; letter-spacing: 1px; }
    .balance-ic { font-size: 1.8rem; font-weight: bold; color: var(--neon-cyan); margin: 10px 0; text-shadow: 0 0 10px var(--neon-cyan); }
    .unit { font-size: 0.9rem; opacity: 0.6; }
    .silver-info { font-size: 0.75rem; color: #aaa; }
    .card-footer { position: absolute; bottom: 20px; right: 25px; font-size: 0.6rem; color: #444; }

    .history-section { flex: 1; min-height: 150px; overflow: hidden; display: flex; flex-direction: column; }
    .history-label { font-size: 0.8rem; color: #555; margin-bottom: 10px; text-transform: uppercase; }

    .action-row { display: flex; gap: 15px; }
    .btn-neon, .btn-neon-purple {
        flex: 1; padding: 12px; border-radius: 12px; border: 1px solid;
        font-weight: bold; cursor: pointer; transition: 0.3s; background: none;
    }

    .btn-neon { color: var(--neon-cyan); border-color: var(--neon-cyan); box-shadow: inset 0 0 10px rgba(0, 200, 255, 0.2); }
    .btn-neon-purple { color: var(--neon-purple); border-color: var(--neon-purple); }

    .conversion-view, .donate-view { text-align: center; padding: 20px 0; }
    .result-box { margin: 20px 0; font-size: 3rem; font-weight: 900; color: var(--neon-emerald); }
    .fiat-symbol { font-size: 1.2rem; vertical-align: top; margin-right: 5px; }

    .btn-withdraw {
        width: 100%; padding: 15px; background: var(--neon-emerald); color: black;
        border: none; border-radius: 12px; font-weight: bold; cursor: pointer;
    }
    .btn-withdraw:disabled { background: #333; color: #666; cursor: not-allowed; }

    .pix-area { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin: 15px 0; display: flex; justify-content: space-between; align-items: center; }
    .btn-back { margin-top: 20px; background: none; border: none; color: #888; cursor: pointer; text-decoration: underline; }
</style>