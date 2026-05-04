/*
   LÓGICA: BIOMETRIA INVIS (ZERO CLICK)
   OBJETIVO: Vincula o hardware do celular ao token de sessão do usuário.
*/

export async function registerBiometrics(userId) {
    // Verifica se o aparelho suporta biometria (FaceID ou Digital)
    if (window.PublicKeyCredential) {
        try {
            // Solicita a ativação da biometria nativa do sistema operacional
            const credential = await navigator.credentials.create({
                publicKey: {
                    challenge: new Uint8Array([3-6]), // Desafio de segurança
                    rp: { name: "INVIS Ecosystem" },
                    user: {
                        id: Uint8Array.from(userId, c => c.charCodeAt(0)),
                        name: "User",
                        displayName: "User"
                    },
                    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                    authenticatorSelection: { authenticatorAttachment: "platform" }
                }
            });

            // Se o usuário autorizar, grava a ativação no Supabase
            if (credential) {
                const { error } = await supabase
                    .from('users')
                    .update({ biometrics_active: true })
                    .eq('id', userId);
                
                if (error) throw error;
                return { success: true, message: "Biometria Ativada" };
            }
        } catch (e) {
            return { success: false, message: "Aparelho não compatível ou recusado" };
        }
    }
}