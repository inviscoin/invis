/* 
   ARQUIVO: src/lib/stores/session.js 
   OBJETIVO: CÉREBRO CENTRAL - GERENCIAMENTO DE MOEDAS E TIERS [1, 11]
*/

import { writable } from 'svelte/store';

// Saldo em INVISCoins (ic) - Precisão de 10 casas decimais [11-13]
export const icGold = writable(0.0000000000); 

// Moeda de Prata (is_stamped) - Não sacável [14-16]
export const icSilver = writable(0.0000000000); 

// Status da Conta e Tier (FREE, VIP1, VIP2) [9, 17-19]
export const userTier = writable('FREE');

// Idioma selecionado (12 idiomas do Globo) [20-22]
export const userLang = writable('pt-BR');

// Sistema de Heartbeat para mineração ativa [5, 23]
export const systemStatus = writable("Sincronizado");

// Função para atualizar saldo via postMessage (Segurança de Jogo/Ads) [24, 25]
export function updateBalance(amount, type = 'gold') {
    if (type === 'gold') {
        icGold.update(n => n + amount);
    } else {
        icSilver.update(n => n + amount);
    }
}