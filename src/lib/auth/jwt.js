/* ARQUIVO: src/lib/auth/jwt.js */

export const sessionAuth = {
    // Renova o Access Token usando o Refresh Token (Cookie HttpOnly) [13].
    async refreshToken() {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw error;
        return data.session.access_token;
    },

    // Injeta tokens nas requisições para o Bouncer (API Gateway) [559, 90.1].
    getHeaders() {
        return {
            'Authorization': `Bearer ${localStorage.getItem('invis_token')}`,
            'Content-Type': 'application/json'
        };
    }
};