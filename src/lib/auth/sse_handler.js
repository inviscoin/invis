/* ARQUIVO: src/lib/auth/sse_handler.js */

// Inicializa a conexão Server-Sent Events (SSE) [4].
export function initializeSSE(userId) {
    const source = new EventSource(`/api/notifications?userId=${userId}`);

    source.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        processSSEEvent(payload);
    };

    source.onerror = (e) => {
        console.warn("SSE desconectado. Tentando reconexão automática...");
    };
}

// Processa eventos sem recarregar a página (Zero-Reload) [4, 8].
function processSSEEvent(data) {
    switch (data.type) {
        case 'INVITE':
            // Alerta visual 3% acima do Foot [9].
            showMultiplexInvite(data.sender, data.sessionType);
            break;
        case 'GIFT':
            // Ponto vermelho no menu e GiftBox [10].
            updateBadge('giftbox', true);
            break;
        case 'MESSAGE':
            // Notificação visual no avatar do remetente [11].
            pulseAvatar(data.senderId);
            break;
    }
}