/*
   LÓGICA: ASSINATURA DIGITAL INVIS
   OBJETIVO: Grava terms_accepted, Timestamp e IP para conformidade LGPD.
*/

export async function signTerms(userId) {
    try {
        // Captura o IP através de um serviço público leve (Custo Zero)
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        const { data, error } = await supabase
            .from('users')
            .update({ 
                terms_accepted: true, 
                ip_acceptance: ip,
                is_active: true
            })
            .eq('id', userId);

        if (error) throw error;
        
        return { success: true };
    } catch (e) {
        console.error("Erro ao assinar termos:", e);
        return { success: false };
    }
}