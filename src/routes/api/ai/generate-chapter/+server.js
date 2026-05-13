import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
    const { prompt, bookId } = await request.json();

    // Lógica de stream simulada (Integração com Groq/Llama via Bouncer) [1]
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextDecoder();
            const text = "Era uma vez na Matriz INVIS... ";
            
            // Envia o texto em chunks para simular IA em tempo real [11]
            const words = text.split(" ");
            for (const word of words) {
                controller.enqueue(new TextEncoder().encode(word + " "));
                await new Promise(r => setTimeout(r, 50));
            }
            controller.close();
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}