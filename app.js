const v = document.getElementById('v');
const f = document.getElementById('f');

const translations = [
    {e:'🇧🇷', m:'Bem-vindo, ao sistema.'},
    {e:'🇺🇸', m:'Welcome, Agent. Secure line active.'},
    {e:'🇵🇹', m:'Bem-vindo ao sistema global INVIS.'},
    {e:'🇪🇸', m:'Bienvenido al sistema.'},
    {e:'🇫🇷', m:'Bienvenue dans le système.'},
    {e:'🇩🇪', m:'Willkommen im System.'},
    {e:'🇮🇹', m:'Benvenuti no sistema.'},
    {e:'🇦🇴', m:'Bem-vindo ao sistema (Angola).'},
    {e:'🌍', m:'Sistema de acesso global.'}
];

translations.forEach(t => {
    let s = document.createElement('span');
    s.innerHTML = t.e;
    s.className = 'flag';
    s.onclick = () => alert(t.m);
    f.appendChild(s);
});

v.onended = () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('ui').style.display = 'flex';
};
// Caso o vídeo falhe por nome errado, ele pula para o site
v.onerror = () => { v.onended(); };
