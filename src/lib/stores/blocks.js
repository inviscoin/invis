/* ARQUIVO: src/lib/stores/blocks.js */
/* OBJETIVO: MOTOR DE GERENCIAMENTO DE 3 BLOCOS SIMULTÂNEOS */

import { writable } from 'svelte/store';

function createBlockStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        // Regra INVIS: Máximo 3 blocos simultâneos [1]
        addBlock: (newBlock) => update(blocks => {
            if (blocks.length >= 3) {
                console.warn("Limite de 3 blocos atingido. Minimize uma atividade.");
                return blocks;
            }
            return [...blocks, { ...newBlock, id: Date.now(), pinned: false }];
        }),
        minimizeBlock: (id) => update(blocks => blocks.filter(b => b.id !== id)),
        closeBlock: (id) => update(blocks => blocks.filter(b => b.id !== id)),
        swapBlocks: (indexA, indexB) => update(blocks => {
            const newBlocks = [...blocks];
            [newBlocks[indexA], newBlocks[indexB]] = [newBlocks[indexB], newBlocks[indexA]];
            return newBlocks;
        })
    };
}

export const blockStore = createBlockStore();

// Lógica Snap to Grid (1/3, 2/3, 3/3) conforme INVIS ESTRUTURAL [2, 3]
export const getBlockHeight = (count) => {
    if (count === 1) return "33.33vh";
    if (count === 2) return "66.66vh";
    if (count === 3) return "100vh";
    return "0vh";
};