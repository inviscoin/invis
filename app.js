const v = document.getElementById('v');
const f = document.getElementById('f');
const ui = document.getElementById('ui');

// As 9 Nacionalidades com mensagens universais
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

// Gera as bandeiras na tela
translations.forEach(t => {
    let s = document.createElement('span');
    s.innerHTML = t.e;
    s.className = 'flag';
    s.onclick = () => alert(t.m);
    f.appendChild(s);
});

// Transição: Quando o vídeo acaba, mostra as bandeiras
v.onended = () => {
    document.getElementById('intro').style.display = 'none';
    ui.style.display = 'flex';
};

// Fallback: Se o vídeo falhar, pula para a interface
v.onerror = () => {
    document.getElementById('intro').style.display = 'none';
    ui.style.display = 'flex';
};
