import { icGold, userTier } from '../stores/session';
import { get } from 'svelte/store';

export const TTS_CONFIG = {
    GOOGLE_LIMIT: 1000000,
    AMAZON_LIMIT: 1000000,
    AZURE_LIMIT: 500000
};

/**
 * Broker de Vozes: Escolhe a API com base no saldo de cotas e Tier
 * Prioriza custos marginais zero para o ecossistema [1, 2]
 */
export async function generateSpeech(text, speed = 1.0) {
    const tier = get(userTier);
    
    // Simulação de verificação de consumo mensal (Dados do Supabase)
    const usage = { google: 450000, amazon: 100000, azure: 0 };

    if (usage.google < TTS_CONFIG.GOOGLE_LIMIT) {
        return { source: "Google Neural", url: await callGoogleTTS(text, speed) };
    } else if (usage.amazon < TTS_CONFIG.AMAZON_LIMIT) {
        return { source: "Amazon Polly", url: await callAmazonPolly(text, speed) };
    } else if (tier === 'VIP2' || tier === 'ADM') {
        return { source: "Microsoft Azure Premium", url: await callAzureTTS(text, speed) };
    }

    throw new Error("Cotas de IA Exauridas. Acionando Fallback Nativo.");
}

async function callGoogleTTS(text, speed) {
    console.log("Processando via Google Cloud TTS...");
    return "blob_url_placeholder";
}

async function callAmazonPolly(text, speed) {
    console.log("Processando via Amazon Polly...");
    return "blob_url_placeholder";
}

async function callAzureTTS(text, speed) {
    console.log("Processando via Azure Speech Premium...");
    return "blob_url_placeholder";
}