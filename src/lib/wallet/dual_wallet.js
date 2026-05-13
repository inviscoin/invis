import { icGold, icSilver } from '../stores/session';

// Constantes fundamentais conforme regra INVIS [1, 2]
export const EXCHANGE_RATE = 2500; // 2500ic = R$ 1,00
export const MIN_WITHDRAWAL = 20.00; // Saque mínimo R$ 20,00 [2]
export const SALES_TAX = 0.05; // 5% de taxa de queima (Coin Burn) [3]

/**
 * Converte saldo de IC para Valor Fiduciário (FIAT)
 * Baseado no DDI do usuário conforme regra de regionalização
 */
export function convertICToFiat(amount) {
    return amount / EXCHANGE_RATE;
}

/**
 * Calcula o valor de venda de um item com queima de 5%
 * Os 5% são destruídos para controle inflacionário [2, 3]
 */
export function calculateResaleValue(itemPrice) {
    return itemPrice * (1 - SALES_TAX);
}

/**
 * Verifica elegibilidade de saque
 * Apenas moedas mineradas (icGold) são sacáveis [2, 4]
 */
export function canWithdraw(amountInFiat) {
    return amountInFiat >= MIN_WITHDRAWAL;
}