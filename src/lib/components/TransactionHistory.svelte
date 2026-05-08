<!-- 
     ARQUIVO: src/lib/components/TransactionHistory.svelte 
     OBJETIVO: LISTA REATIVA DE EXTRATO FINANCEIRO (Scroll Infinito) [2]
-->

<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    // Mock de transações (Será alimentado pelo Supabase na Integração Final)
    let transactions = [
        { id: 1, type: 'Gain', amount: '+0.00001250', desc: 'Mineração Ativa', date: 'Hoje' },
        { id: 2, type: 'Spend', amount: '-1.25000000', desc: 'Item: Moldura Ouro', date: 'Ontem' },
        { id: 3, type: 'Bonus', amount: '+500.00', desc: 'Manutenção Mensal', date: '15/05' }
    ];

    let loading = false;

    // Lógica de Scroll Infinito [2]
    function handleScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            console.log("Carregando mais transações do Livro-Razão...");
        }
    }
</script>

<div class="history-container no-scrollbar" on:scroll={handleScroll}>
    {#each transactions as tx (tx.id)}
        <div class="tx-card glass-morphism" in:fade>
            <div class="tx-icon" class:gain={tx.type === 'Gain' || tx.type === 'Bonus'}>
                {tx.type === 'Spend' ? '↓' : '↑'}
            </div>
            <div class="tx-info">
                <span class="tx-desc">{tx.desc}</span>
                <span class="tx-date">{tx.date}</span>
            </div>
            <div class="tx-amount" class:spend={tx.type === 'Spend'}>
                {tx.amount}
            </div>
        </div>
    {/each}

    {#if loading}
        <div class="loading-tx">Sincronizando...</div>
    {/if}
</div>

<style>
    .history-container {
        flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
        padding-right: 5px;
    }

    .tx-card {
        display: flex; align-items: center; padding: 12px; border-radius: 16px;
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.05);
    }

    .tx-icon {
        width: 32px; height: 32px; border-radius: 50%; background: var(--neon-red);
        color: white; display: flex; justify-content: center; align-items: center;
        margin-right: 12px; font-weight: bold;
    }
    .tx-icon.gain { background: var(--neon-emerald); color: black; }

    .tx-info { flex: 1; display: flex; flex-direction: column; }
    .tx-desc { font-size: 0.85rem; color: #ddd; }
    .tx-date { font-size: 0.65rem; color: #666; }

    .tx-amount { font-family: monospace; font-size: 0.85rem; color: var(--neon-emerald); }
    .tx-amount.spend { color: var(--neon-red); }

    .loading-tx { text-align: center; font-size: 0.7rem; color: #444; padding: 10px; }
</style>