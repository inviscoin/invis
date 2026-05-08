/* 
   ARQUIVO: src/lib/wallet/silver_coin.js 
   OBJETIVO: GESTÃO DE MOEDA DE PRATA (STAMPED) E PRIORIDADE DE GASTO
*/

import { icGold, icSilver } from '../stores/session';

/**
 * Lógica de Prioridade de Gasto:
 * O sistema sempre deduz o saldo da Moeda de Prata antes do Ouro [2, 7, 12]
 */
export function processPurchase(price) {
    let remainingPrice = price;
    let usedSilver = 0;

    icSilver.update(silver => {
        if (silver >= remainingPrice) {
            usedSilver = remainingPrice;
            silver -= remainingPrice;
            remainingPrice = 0;
        } else {
            usedSilver = silver;
            remainingPrice -= silver;
            silver = 0;
        }
        return silver;
    });

    if (remainingPrice > 0) {
        icGold.update(gold => {
            if (gold >= remainingPrice) {
                gold -= remainingPrice;
                remainingPrice = 0;
            } else {
                console.error("Saldo insuficiente total para transação.");
            }
            return gold;
        });
    }

    return { 
        success: remainingPrice === 0, 
        isStamped: usedSilver > 0 // Regra de contaminação [7, 12]
    };
}

/**
 * Protocolo de Herança de Carimbo (Stamping Chain):
 * Se a compra usou Moeda de Prata, o item é carimbado permanentemente [8, 13, 14]
 */
export function applyStampChain(item) {
    return { ...item, origin_silver: true, resale_blocked: true };
}
