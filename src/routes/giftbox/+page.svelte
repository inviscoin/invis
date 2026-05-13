<script>
    /* ARQUIVO: src/routes/giftbox/+page.svelte */
    /* OBJETIVO: GRADE 4X4 DE ATIVOS COM LÓGICA DE QUEIMA DEFLACIONÁRIA */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { fade, scale } from "svelte/transition";

    let items = [
        { id: 157, name: "Moldura Ouro", icon: "👑", stamped: true, price: 1250 },
        { id: 115, name: "Rosa", icon: "🌹", stamped: false, price: 200 },
        { id: 1, name: "Leitura Neural", icon: "🧠", stamped: true, price: 4500 }
    ];

    let selectedItem = null;

    function selectItem(item) {
        selectedItem = item;
    }

    function sellItem() {
        if (!selectedItem || selectedItem.stamped) return;
        const value = selectedItem.price * 0.95;
        console.log(`Vendido por ${value} ic. 5% queimados.`);
        items = items.filter(i => i.id !== selectedItem.id);
        selectedItem = null;
    }
</script>

<AuthWrapper>
    <div class="gift-viewport">
        <header class="gift-header">
            <h2 class="neon-text-emerald">GIFT BOX</h2>
            <div class="indicator-red-pulse"></div>
        </header>

        <div class="grid-4x4">
            {#each Array(16) as _, i}
                <div class="slot glass-morphism" on:click={() => items[i] && selectItem(items[i])}>
                    {#if items[i]}
                        <span class="item-icon" in:scale>{items[i].icon}</span>
                        {#if items[i].stamped}
                            <div class="stamp-tag">PRATA</div>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>

        {#if selectedItem}
            <div class="item-actions-overlay" in:fade>
                <GlassCard padding="40px" borderColor="var(--neon-purple)">
                    <h3>{selectedItem.name}</h3>
                    <div class="btn-group-vertical">
                        <button class="btn-action green">USAR AGORA</button>
                        <button class="btn-action blue">DOAR PARA AMIGO</button>
                        <button class="btn-action red" 
                                disabled={selectedItem.stamped} 
                                on:click={sellItem}>
                            VENDER (-5% TAX)
                        </button>
                        <button class="btn-close" on:click={() => selectedItem = null}>CANCELAR</button>
                    </div>
                </GlassCard>
            </div>
        {/if}
    </div>
</AuthWrapper>

<style>
    .gift-viewport { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 30px; }
    .gift-header { display: flex; align-items: center; gap: 15px; }
    .indicator-red-pulse { width: 10px; height: 10px; background: var(--neon-red); border-radius: 50%; box-shadow: 0 0 10px var(--neon-red); animation: blink 1s infinite; }

    .grid-4x4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .slot { 
        height: 85px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.05);
        display: flex; justify-content: center; align-items: center; position: relative;
        cursor: pointer; transition: 0.3s;
    }
    .slot:hover { border-color: var(--neon-cyan); background: rgba(0, 200, 255, 0.05); }
    
    .item-icon { font-size: 2rem; filter: drop-shadow(0 0 5px rgba(255,255,255,0.2)); }
    .stamp-tag { position: absolute; top: 5px; right: 5px; font-size: 0.5rem; background: #555; color: white; padding: 2px 5px; border-radius: 4px; }

    .item-actions-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 20px; }
    .btn-group-vertical { display: flex; flex-direction: column; gap: 15px; margin-top: 30px; }
    .btn-action { padding: 18px; border-radius: 14px; border: none; font-weight: 900; letter-spacing: 2px; cursor: pointer; }
    .btn-action.green { background: var(--neon-emerald); color: black; }
    .btn-action.blue { background: var(--neon-cyan); color: black; }
    .btn-action.red { background: transparent; border: 1px solid var(--neon-red); color: var(--neon-red); }
    .btn-action:disabled { opacity: 0.2; cursor: not-allowed; }
    .btn-close { background: none; border: none; color: #555; margin-top: 10px; cursor: pointer; text-decoration: underline; }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>