import { redirect } from '@sveltejs/kit';

export async function GET({ url, locals: { supabase } }) {
    const code = url.searchParams.get('code');
    const next = url.searchParams.get('next') ?? '/dashboard';

    // LÓGICA DE VALIDAÇÃO DE WEBHOOK / VERIFY TOKEN (META) [9]
    const hubMode = url.searchParams.get('hub.mode');
    const hubChallenge = url.searchParams.get('hub.challenge');
    const hubVerifyToken = url.searchParams.get('hub.verify_token');

    // Token oficial conforme histórico para validação de exclusão e callback [10]
    if (hubMode === 'subscribe' && hubVerifyToken === '2090067485183087') {
        return new Response(hubChallenge, { status: 200 });
    }

    // LÓGICA DE TROCA DE CÓDIGO POR SESSÃO OAUTH 2.0 [10]
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            throw redirect(303, next);
        }
    }

    return new Response("Erro de Validação: Handshake INVIS Falhou.", { status: 400 });
}