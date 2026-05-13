import { supabase } from '$lib/database';
import { multiplexActive } from '$lib/stores/library';
import { get } from 'svelte/store';

/**
 * O Servidor atua como Maestro, enviando marcadores JSON leves [4, 9].
 */
export function initializeMultiplexSync(roomId) {
    const channel = supabase.channel(`multiplex:${roomId}`);

    channel
    .on('broadcast', { event: 'sync_event' }, ({ payload }) => {
        const status = get(multiplexActive);
        if (!status.isHost) {
            // Escravo obedece aos marcadores do Host [9, 10]
            applyGlobalSync(payload);
        }
    })
    .subscribe();

    return {
        // Host emite comandos para o grupo
        emitEvent: (action, data) => {
            channel.send({
                type: 'broadcast',
                event: 'sync_event',
                payload: { action, ...data, timestamp: Date.now() }
            });
        }
    };
}

function applyGlobalSync(payload) {
    console.log(`Evento de Sincronia: ${payload.action} no tempo ${payload.seekTime}`);
    // Interfere diretamente nos componentes de áudio e texto do HUD
}