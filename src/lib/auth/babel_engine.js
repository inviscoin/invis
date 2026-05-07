/* ARQUIVO: src/lib/auth/babel_engine.js LÓGICA: MOTOR DE TRADUÇÃO SIMULTÂNEA (BABEL INVIS)
 DESCRIÇÃO: Intercepta mensagens e traduz em tempo real no client-side para eliminar barreiras linguísticas
. */
import { get } from 'svelte/store'; import { userLanguage } from '$lib/stores/language';
/**