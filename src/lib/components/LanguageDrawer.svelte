<script>
    /* ARQUIVO: src/lib/components/LanguageDrawer.svelte */
    /* OBJETIVO: SELETOR DE 12 IDIOMAS EM MODO GAVETA (DRAWER) */
    import { createEventDispatcher } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    const dispatch = createEventDispatcher();

    const languages = [
        { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
        { code: 'en-US', name: 'English', flag: '🇺🇸' },
        { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
        { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
        { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
        { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
        { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
        { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
        { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
        { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'ko-KR', name: '한국어', flag: '🇰🇷' }
    ];

    function selectLang(code) {
        localStorage.setItem('invis_lang', code);
        // Lógica de tradução Babel será aplicada globalmente
        dispatch('close');
    }
</script>

<div class="drawer-overlay" on:click={() => dispatch('close')} in:fade>
    <div class="drawer-content glass-morphism" on:click|stopPropagation in:slide={{ axis: 'y' }}>
        <header>
            <h3>SELECIONE O IDIOMA</h3>
            <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        </header>
        <div class="lang-grid no-scrollbar">
            {#each languages as lang}
                <button class="lang-item" on:click={() => selectLang(lang.code)}>
                    <span class="flag">{lang.flag}</span>
                    <span class="name">{lang.name}</span>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    .drawer-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.8);
        z-index: 2000; display: flex; align-items: flex-end;
    }

    .drawer-content {
        width: 100%; max-height: 70vh; background: #0b0e11;
        border-top: 2px solid var(--neon-cyan); border-radius: 30px 30px 0 0;
        padding: 30px; display: flex; flex-direction: column;
    }

    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    h3 { color: var(--neon-cyan); letter-spacing: 4px; font-size: 0.9rem; }

    .lang-grid {
        display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;
        overflow-y: auto; padding-bottom: 20px;
    }

    .lang-item {
        background: rgba(255,255,255,0.05); border: 1px solid rgba(0,200,255,0.1);
        padding: 15px; border-radius: 12px; color: white; display: flex;
        align-items: center; gap: 12px; cursor: pointer; transition: 0.3s;
    }

    .lang-item:hover { border-color: var(--neon-cyan); background: rgba(0,200,255,0.05); }

    .flag { font-size: 1.5rem; }
    .name { font-size: 0.85rem; font-weight: 600; }
    .close-btn { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
</style>