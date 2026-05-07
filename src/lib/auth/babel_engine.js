/* ARQUIVO: src/lib/auth/babel_engine.js */
import { get } from 'svelte/store';
import { userLanguage } from '$lib/stores/language';

// Anexa a tag de idioma original (lang) a cada pacote de texto [7].
export function tagOutgoingMessage(text) {
    const lang = get(userLanguage);
    return {
        text,
        lang: lang || 'pt-BR'
    };
}

// Intercepta e traduz mensagens no client-side para evitar perda de contexto [6, 7].
export async function translateIncomingMessage(messageObj) {
    const targetLang = get(userLanguage);
    
    // Se o idioma for o mesmo do receptor, não consome API [6].
    if (messageObj.lang === targetLang) return messageObj.text;

    try {
        const res = await fetch('/api/babel/translate', {
            method: 'POST',
            body: JSON.stringify({
                text: messageObj.text,
                from: messageObj.lang,
                to: targetLang
            })
        });
        const data = await res.json();
        return data.translatedText;
    } catch (err) {
        // Fallback: exibe original se a tradução falhar [6].
        return messageObj.text;
    }
}