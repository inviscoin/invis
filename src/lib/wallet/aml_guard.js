/* 
   ARQUIVO: src/lib/wallet/aml_guard.js 
   OBJETIVO: BLINDAGEM FINANCEIRA E CONFORMIDADE AML [1, 6]
*/

/**
 * Validação de Titularidade (Nominal Match):
 * Impede saques para contas de terceiros conforme regra de compliance.
 */
export function validateWithdrawalIdentity(userRecord, destinationPix) {
    console.log("Iniciando Verificação AML (Anti-Money Laundering)...");

    // No sistema real, destinationPix traria o nome do titular via consulta no Banco Central/API Gateway
    const mockPixTitular = "JUNIOR LOPEZ"; // Simulação de retorno do banco
    
    const isMatch = userRecord.full_name.toUpperCase() === mockPixTitular.toUpperCase();

    if (!isMatch) {
        return {
            success: false,
            error: "Divergência de titularidade. O saque deve ser para uma conta própria.",
            code: "AML_NOMINAL_MISMATCH"
        };
    }

    return { success: true };
}

/**
 * Monitoramento de Anomalias (Circuit Breaker):
 * Bloqueia contas que ganham moedas em velocidade impossível.
 */
export function checkEconomicAnomalies(earnings, timeMinutes) {
    const MAX_RATE_PER_MINUTE = 5000; // Limite matemático definido pelo ADM [7]
    
    if (earnings / timeMinutes > MAX_RATE_PER_MINUTE) {
        return { action: 'SHADOW_BAN', reason: 'Anomalia Econômica Detectada' };
    }
    
    return { action: 'PROCEED' };
}