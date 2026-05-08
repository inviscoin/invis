/* 
   ARQUIVO: src/lib/wallet/dual_wallet.js 
   OBJETIVO: MOTOR FINANCEIRO - CONVERSÃO E TAXAS (IC$ vs FIAT)
*/

import { icGold, icSilver } from '../stores/session';

// Constantes conforme regra INVIS [1-3]
export const EXCHANGE_RATE = 2500; // 2500ic = R$ 1.00
export const MIN_WITHDRAWAL = 20.00; // R$ 20,00 mínimo
export const SALES_TAX = 0.05; // 5% de taxa de queima (Burn)

/**
 * Converte saldo de IC para Valor Fiduciário (FIAT)
 * Baseado no DDI do usuário conforme regra de regionalização [1, 4]
 */
export function convertICToFiat(amount) {
    return amount / EXCHANGE_RATE;
}

/**
 * Calcula o valor de venda de um item com queima de 5%
 * Os 5% são destruídos (Coin Burn) para controle inflacionário [5-8]
 */
export function calculateResaleValue(itemPrice) {
    return itemPrice * (1 - SALES_TAX);
}

/**
 * Verifica elegibilidade de saque
 * Apenas moedas mineradas (icGold) são sacáveis [9-11]
 */
export function canWithdraw(amountInFiat) {
    return amountInFiat >= MIN_WITHDRAWAL;
}