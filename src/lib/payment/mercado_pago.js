/* 
   ARQUIVO: src/lib/payment/mercado_pago.js 
   OBJETIVO: INTEGRAÇÃO DE GATEWAY PIX E CARTÃO [10, 11]
*/

import { PUBLIC_SUPABASE_URL } from '$env/static/public';

/**
 * Inicializa pagamento via Mercado Pago (CNPJ Exigido).
 * Suporta PIX e Cartão em uma única chamada.
 */
export async function createPaymentPreference(itemId, amount, type = 'pix') {
    console.log(`Gerando preferência de pagamento para item ${itemId} via ${type}`);

    // Mock de chamada ao Bouncer (API Gateway) para injetar chaves secretas [12]
    const response = {
        id: "MP-" + Date.now(),
        qr_code: "00020101021226850014br.gov.bcb.pix0123invis.suporte@gmail.com",
        ticket_url: "https://www.mercadopago.com.br/payments/123/ticket",
        status: "pending"
    };

    return response;
}

/**
 * Listener de Webhook para confirmação instantânea [13, 14]
 */
export function handlePaymentWebhook(payload) {
    if (payload.action === "payment.created" && payload.data.status === "approved") {
        return { status: 'AVAILABLE', msg: 'Pagamento Confirmado!' };
    }
    return { status: 'PENDING' };
}