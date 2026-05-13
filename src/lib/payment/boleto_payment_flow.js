export async function initiateBoletoPayment(userId, itemId, fiatAmount) {
    console.log("Iniciando geração de boleto via Mercado Pago...");

    // 1. Registro do Shadow Item na GiftBox (Bloqueado/Acinzentado) [10, 12]
    const shadowItem = {
        owner_id: userId,
        item_id: itemId,
        status: 'PENDING', // Travado via pointer-events: none [13]
        is_stamped: true,   // Pagamento real gera moeda de prata [14]
        expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 dias úteis
    };

    // 2. Mock de chamada ao Gateway [15]
    const boletoData = {
        url: "https://gateway.inviscore.com/boleto/temp_pdf",
        barcode: "00190.00009 02314.444485 00012.345678 1 90000000000500",
        status: "PENDING"
    };

    return { shadowItem, boletoData };
}

/**
 * Daemon de Expiração de Boletos [16, 17]
 */
export function checkBoletoExpiry(expiryDate) {
    return new Date() > new Date(expiryDate);
}