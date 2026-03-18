const f = document.getElementById('f');

// As 9 Nacionalidades conforme notas (Mensagens Universais)
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

// Gera as bandeiras dinamicamente
translations.forEach(t => {
    let s = document.createElement('span');
    s.innerHTML = t.e;
    s.className = 'flag';
    s.onclick = () => alert(t.m);
    f.appendChild(s);
});
