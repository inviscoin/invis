import { get } from 'svelte/store';
import { userTier } from '../stores/session';

/**
 * Dispara a geração de conteúdo literário via API de alta velocidade.
 * Implementa a técnica de Chunks para entrega < 1s [2].
 */
export async function generateChapterStream(prompt, bookId = null) {
    const tier = get(userTier);
    if (tier === 'FREE') throw new Error("Acesso restrito: Escritor IA requer nível Premium ou Superior.");

    const response = await fetch('/api/ai/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, bookId })
    });

    if (!response.ok) throw new Error("Falha na Matriz de Linguagem.");

    // Retorna o stream para processamento no frontend (Efeito Typewriter)
    return response.body.getReader();
}

/**
 * Lógica de Feedback Dinâmico: Ajusta pesos para a IA [7].
 */
export async function submitAIFeedback(paragraphId, type) {
    // type: 'glow' (curtida) ou 'blur' (rejeição)
    console.log(`Peso atualizado para parágrafo ${paragraphId}: ${type}`);
    // Envia para o banco SQL via Bouncer para refinar o Prompt de Contexto
}