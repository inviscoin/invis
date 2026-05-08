/* 
   ARQUIVO: src/lib/wallet/stamping_chain.js 
   OBJETIVO: PROTOCOLO DE HERANÇA DE CARIMBO [8, 9]
*/

/**
 * Lógica de Contaminação (Stamping Chain):
 * Se o item foi gerado com Moeda de Prata, ele nunca pode ser vendido.
 */
export function applyHeritageMetadata(item, usedSilver = false) {
    return {
        ...item,
        is_stamped: usedSilver || item.is_stamped,
        origin_silver: usedSilver,
        // Trava física de botão na UI
        resale_blocked: usedSilver ? true : item.resale_blocked
    };
}

/**
 * Validação de Doação:
 * Garante que a propriedade de bloqueio viaje com o item.
 */
export function processGiftTransfer(item, recipientId) {
    console.log(`Transferindo item ${item.id} para ${recipientId}`);
    
    // Herança obrigatória da tag de bloqueio [9]
    const updatedItem = {
        ...item,
        owner_id: recipientId,
        acquired_at: new Date().toISOString()
    };
    
    return updatedItem;
}