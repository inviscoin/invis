/* 
   ARQUIVO: src/lib/utils/preload.js 
   OBJETIVO: CARREGAMENTO PREDITIVO DE MÓDULOS (HYPER-CACHE)
*/

// Utiliza requestIdleCallback para carregar HUDs sem pesar a CPU
export function preloadModule(modulePath) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
            console.log(`Preloading: ${modulePath}`);
            // Simulação de fetch para cache do Service Worker
            fetch(modulePath, { priority: 'low' });
        });
    }
}

// Lista de rotas prioritárias para o PWA
export const priorityModules = [
    '/dashboard/social',
    '/dashboard/media',
    '/dashboard/games',
    '/dashboard/library'
];