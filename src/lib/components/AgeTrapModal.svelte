/*
   LÓGICA: IDENTIFICAÇÃO UNIFICADA INVIS
   DESCRIÇÃO: Cruza dados para permitir login via Usuário, E-mail ou Telefone.
*/

export async function validateIdentity(identifier, password) {
    // A lógica consulta as três colunas simultaneamente no Supabase
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`nickname.eq.${identifier},email.eq.${identifier},phone.eq.${identifier}`)
        .eq('password', password) // Em produção, usar hash de senha
        .single();

    if (error || !data) {
        return { success: false, message: "Você digitou algum dado errado" };
    }

    return { success: true, user: data };
}