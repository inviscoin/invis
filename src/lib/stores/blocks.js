/* 
   ARQUIVO: src/lib/stores/blocks.js 
   OBJETIVO: CONTROLE DOS 3 BLOCOS SIMULTÂNEOS (DASHBOARD MODULAR) [1, 2]
*/

import { writable } from 'svelte/store';

// Gerenciador de estado para os blocos ativos no Dashboard
function createBlockStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        // Regra INVIS: Máximo 3 blocos simultâneos [2, 3]
        addBlock: (newBlock) => update(blocks => {
            if (blocks.length >= 3) {
                // Injeta modal de excesso se tentar abrir o 4º bloco [4, 5]
                console.warn("Limite de 3 blocos atingido. Escolha um para minimizar.");
                return blocks;
            }
            return [...blocks, { ...newBlock, id: Date.now(), pinned: false }];
        }),
        // Lógica de Minimizar: Bloco vira ícone e voa para o Foot [2, 6, 7]
        minimizeBlock: (id) => update(blocks => blocks.filter(b => b.id !== id)),
        // Lógica de Fechar (Swipe Up): Encerra sessão definitivamente [8, 9]
        closeBlock: (id) => update(blocks => blocks.filter(b => b.id !== id)),
        // Inversão de posição (Drag and Drop) [2, 3]
        swapBlocks: (indexA, indexB) => update(blocks => {
            const newBlocks = [...blocks];
            [newBlocks[indexA], newBlocks[indexB]] = [newBlocks[indexB], newBlocks[indexA]];
            return newBlocks;
        }),
        // Alfinete (Fixar): Trava o bloco na posição [7-9]
        togglePin: (id) => update(blocks => blocks.map(b => 
            b.id === id ? { ...b, pinned: !b.pinned } : b
        ))
    };
}

export const blockStore = createBlockStore();

// Lógica de proporção Snap to Grid (1/3, 2/3, 3/3) [2, 10]
export const getBlockHeight = (count) => {
    if (count === 1) return "33.33vh";
    if (count === 2) return "66.66vh";
    if (count === 3) return "100vh";
    return "0vh";
};