/* 
   ARQUIVO: src/lib/session_manager.js 
   OBJETIVO: GESTÃO DE HEARTBEAT E SINCRONIA DE MINERAÇÃO
*/

import { systemStatus, icGold } from './stores/session';

let heartbeatInterval;

export function initializeSession() {
    console.log("Iniciando Heartbeat INVIS...");
    systemStatus.set("Sincronizado");

    // Pulsação a cada 5 minutos conforme regra Antifraude
    heartbeatInterval = setInterval(() => {
        const gain = 0.0000001250; // Taxa base de mineração ativa
        icGold.update(n => n + gain);
        
        // Simulação de ping ao Supabase para validar presença
        console.log("Heartbeat enviado: Saldo atualizado.");
    }, 300000); 
}

export function destroySession() {
    clearInterval(heartbeatInterval);
    systemStatus.set("Desconectado");
    console.warn("Sessão encerrada pelo sistema.");
}