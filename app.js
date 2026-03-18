const f = document.getElementById('f');

// As 9 nacionalidades com mensagens universais
const translations = [
    {e:'🇧🇷', m:'Acesso regional ativado.'},
    {e:'🇺🇸', m:'Secure line active.'},
    {e:'🇵🇹', m:'Sistema global INVIS.'},
    {e:'🇪🇸', m:'Acceso activado.'},
    {e:'🇫🇷', m:'Accès activé.'},
    {e:'🇩🇪', m:'Zugriff aktiviert.'},
    {e:'🇮🇹', m:'Accesso attivato.'},
    {e:'🇦🇴', m:'Acesso Angola.'},
    {e:'🌍', m:'Global access active.'}
];

// Limpa a div antes de criar as bandeiras
f.innerHTML = '';

translations.forEach(t => {
    let s = document.createElement('span');
    s.innerHTML = t.e;
    s.className = 'flag';
    s.onclick = () => alert(t.m);
    f.appendChild(s);
});
