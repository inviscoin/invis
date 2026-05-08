import { writable } from 'svelte/store';

// Lógica de Estado: Gerencia quais HUDs estão ativos nos blocos [7, 8]
export const blockStore = writable({
    activeBlocks: [], // Máximo 3 IDs de sessão [9]
    layoutMode: 'standard', // 'standard', 'pip', 'advanced' [10]
    systemStatus: "Sincronizado com a Matriz"
});

export const addBlock = (sessionId) => {
    blockStore.update(state => {
        if (state.activeBlocks.length >= 3) {
            // Gatilho: Dispara modal de excesso se tentar o 4º bloco [11]
            console.warn("Limite de 3 blocos atingido. Minimize ou feche um.");
            return state;
        }
        if (!state.activeBlocks.includes(sessionId)) {
            return { ...state, activeBlocks: [...state.activeBlocks, sessionId] };
        }
        return state;
    });
};

export const removeBlock = (sessionId) => {
    blockStore.update(state => ({
        ...state,
        activeBlocks: state.activeBlocks.filter(id => id !== sessionId)
    }));
};