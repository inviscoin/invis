// Garantir que o script rode apenas quando a página carregar
window.onload = () => {
    const f = document.getElementById('f');
    if(!f) return;

    const translations = [
        {e:'🇧🇷', m:'Bem-vindo. Acesso regional ativado.'},
        {e:'🇺🇸', m:'Welcome. Secure line active.'},
        {e:'🇵🇹', m:'Bem-vindo ao sistema global INVIS.'},
        {e:'🇪🇸', m:'Bienvenido al sistema.'},
        {e:'🇫🇷', m:'Bienvenue dans le système.'},
        {e:'🇩🇪', m:'Willkommen im System.'},
        {e:'🇮🇹', m:'Benvenuti nel sistema.'},
        {e:'🇦🇴', m:'Bem-vindo ao sistema.'},
        {e:'🌍', m:'Sistema de acesso global ativo.'}
    ];

    // Limpa a grade antes de gerar para evitar erros
    f.innerHTML = '';

    translations.forEach(t => {
        let s = document.createElement('span');
        s.innerHTML = t.e;
        s.className = 'flag';
        s.style.cursor = 'pointer';
        s.style.fontSize = '40px';
        s.onclick = () => alert(t.m);
        f.appendChild(s);
    });
    
    console.log("Interface INVIS carregada com sucesso.");
};
