<script>
    /* ARQUIVO: src/lib/components/TransactionHistory.svelte */
    /* OBJETIVO: LISTA REATIVA DE EXTRATO FINANCEIRO (SCROLL INFINITO) [23] */
    import { fade } from 'svelte/transition';

    let transactions = [
        { id: 1, type: 'Gain', amount: '+0.00012500', desc: 'Mineração Ativa', date: 'Hoje' },
        { id: 2, type: 'Spend', amount: '-4500.00', desc: 'Item: Sala Leitura', date: 'Hoje' },
        { id: 3, type: 'Bonus', amount: '+500.00', desc: 'Manutenção Mensal', date: 'Ontem' }
    ];

    function handleScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            // Gatilho para carregar mais do Supabase audit_logs
            console.log("Paginando Livro-Razão...");
        }
    }
</script>

<div class="history-container no-scrollbar" on:scroll={handleScroll}>
    {#each transactions as tx (tx.id)}
        <div class="tx-card glass-morphism" in:fade>
            <div class="tx-icon" class:gain={tx.type !== 'Spend'}>
                {tx.type === 'Spend' ? '↓' : '↑'}
            </div>
            <div class="tx-info">
                <span class="tx-desc">{tx.desc}</span>
                <span class="tx-date">{tx.date}</span>
            </div>
            <div class="tx-amount" class:spend={tx.type === 'Spend'}>
                {tx.amount} <span class="unit">ic</span>
            </div>
        </div>
    {/each}
</div>

<style>
    .history-container { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    
    .tx-card {
        display: flex; align-items: center; padding: 14px; border-radius: 16px;
        background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.05);
    }

    .tx-icon {
        width: 35px; height: 35px; border-radius: 50%; background: var(--neon-red);
        color: white; display: flex; justify-content: center; align-items: center;
        margin-right: 15px; font-weight: 900; font-size: 1.1rem;
    }

    .tx-icon.gain { background: var(--neon-emerald); color: #000; }

    .tx-info { flex: 1; display: flex; flex-direction: column; }
    .tx-desc { font-size: 0.85rem; color: #eee; font-weight: 600; }
    .tx-date { font-size: 0.65rem; color: #555; text-transform: uppercase; margin-top: 2px; }

    .tx-amount { font-family: 'Inter', monospace; font-size: 0.85rem; color: var(--neon-emerald); font-weight: 700; }
    .tx-amount.spend { color: var(--neon-red); }
    .unit { font-size: 0.7rem; opacity: 0.6; }
</style>