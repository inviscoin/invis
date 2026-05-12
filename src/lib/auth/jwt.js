/* ARQUIVO: src/lib/auth/jwt.js */
/* OBJETIVO: GESTÃO DE TOKENS E VALIDAÇÃO DE SESSÃO OAUTH 2.0 */

import { supabase } from '$lib/database';

export const sessionAuth = {
  // Renova o token de acesso de forma silenciosa (Zero-Downtime) [12]
  async refreshToken() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error("Falha na Matriz: Sessão expirada.");
      return null;
    }
    return data.session.access_token;
  },

  // Injeta tokens seguros nas requisições para o Bouncer [90.1, 154]
  getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('invis_token') : null;
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Invis-Source': 'Verified-Matrix'
    };
  }
};