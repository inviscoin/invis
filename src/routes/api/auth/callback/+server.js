/* ARQUIVO: src/routes/api/auth/callback/+server.js */
/* OBJETIVO: VALIDAR CHALLENGE DA META E CONVERTER TOKEN OAUTH */

import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/database';

export async function GET({ url }) {
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/dashboard';

  // LÓGICA DE VALIDAÇÃO DE WEBHOOK / VERIFY TOKEN (META)
  // Se a Meta enviar um hub.challenge para validar a URL de exclusão/callback
  const hubMode = url.searchParams.get('hub.mode');
  const hubChallenge = url.searchParams.get('hub.challenge');
  const hubVerifyToken = url.searchParams.get('hub.verify_token');

  // O Token "2090067485183087" deve coincidir com o inserido no Meta for Developers
  if (hubMode === 'subscribe' && hubVerifyToken === '2090067485183087') {
    return new Response(hubChallenge, { status: 200 });
  }

  // LÓGICA DE LOGIN OAUTH 2.0
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      throw redirect(303, next);
    }
  }

  // Fallback em caso de erro no handshake
  return new Response("Erro de Validação: Handshake INVIS Falhou.", { status: 400 });
}