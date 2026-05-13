<script>
    /* ARQUIVO: src/routes/login/+page.svelte */
    /* OBJETIVO: TELA DE LOGIN UNIFICADA COM OAUTH E SELETOR DE IDIOMAS GAVETA */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import NeonBorder from "$lib/components/NeonBorder.svelte";
    import LanguageDrawer from "$lib/components/LanguageDrawer.svelte";
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';

    let identifier = ""; 
    let password = "";
    let showPassword = false;
    let isLangDrawerOpen = false;

    async function handleSocial(provider) {
        // Bloqueio de seleção visual e gatilho de credenciais soberano
        console.log(`Iniciando Handshake INVIS com ${provider}...`);
        // Aqui o Bouncer redireciona para inviscore.com/api/auth/callback
    }
</script>

<AuthWrapper>
    <NeonBorder color="var(--neon-cyan)" pulse={true}>
        <GlassCard padding="40px">
            <h1 class="login-title">LOGIN</h1>

            <div class="input-stack">
                <div class="field-container">
                    <input type="text" 
                           placeholder="Usuário, E-mail ou Telefone" 
                           bind:value={identifier}
                           class="invis-input" />
                </div>

                <div class="field-container">
                    <input type={showPassword ? "text" : "password"} 
                           placeholder="Senha" 
                           bind:value={password}
                           class="invis-input" />
                    <button class="eye-toggle" on:click={() => showPassword = !showPassword}>
                        {showPassword ? "👁️" : "🙈"}
                    </button>
                </div>
            </div>

            <button class="btn-primary-neon">ENTRAR</button>

            <div class="social-matrix">
                <p>Ou conecte com</p>
                <div class="social-icons">
                    <button on:click={() => handleSocial('google')} class="social-trigger no-select">
                        <svg viewBox="0 0 24 24" width="32"><path fill="#EA4335" d="M12 5.04c1.94 0 3.68.67 5.05 1.97l3.77-3.77C18.55 1.33 15.48 0 12 0 7.31 0 3.32 2.69 1.33 6.65l4.39 3.41c1.03-3.01 3.88-5.02 6.28-5.02z"/><path fill="#FBBC05" d="M24 12.27c0-.88-.08-1.74-.21-2.58H12v4.89h6.73c-.29 1.57-1.14 2.89-2.48 3.78l4.39 3.41c2.57-2.37 4.05-5.86 4.05-9.5z"/><path fill="#4285F4" d="M5.72 14.16a7.2 7.2 0 0 1 0-4.32L1.33 6.4c-1.29 2.58-1.33 5.62 0 8.2l4.39-3.44z"/><path fill="#34A853" d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-4.39-3.41c-1.11.74-2.53 1.18-3.57 1.18-2.4 0-4.44-1.62-5.17-3.8l-4.39 3.41c2 3.96 5.99 6.65 9.56 6.65z"/></svg>
                    </button>
                    <button on:click={() => handleSocial('facebook')} class="social-trigger no-select">
                        <svg viewBox="0 0 24 24" width="32" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12.073-12-12.073S0 5.446 0 12.073c0 5.99 4.348 10.951 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.652 23.024 24 18.062 24 12.073z"/></svg>
                    </button>
                    <button on:click={() => handleSocial('instagram')} class="social-trigger no-select">
                        <svg viewBox="0 0 24 24" width="32"><defs><radialGradient id="ig-grad" cx="0.5" cy="1" r="1"><stop offset="0%" stop-color="#fee411"/><stop offset="50%" stop-color="#a4309a"/><stop offset="100%" stop-color="#3b33af"/></radialGradient></defs><path fill="url(#ig-grad)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.353 2.619 6.778 6.981 6.98 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.777-2.62 6.98-6.98.059-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.2-4.353-2.619-6.777-6.983-6.98C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.222.144 4.775 1.974 4.921 5.212.054 1.265.069 1.648.069 4.849s-.015 3.585-.069 4.849c-.149 3.228-1.709 5.057-4.921 5.212-1.265.054-1.648.069-4.849.069s-3.585-.015-4.849-.069c-3.224-.144-4.775-1.975-4.921-5.212-.054-1.265-.069-1.648-.069-4.849s.015-3.585.069-4.849c.149-3.224 1.709-5.056 4.921-5.212 1.265-.055 1.648-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                    </button>
                </div>
            </div>

            <div class="auth-links">
                <a href="/cadastro">Não possui cadastro? Clique Aqui</a>
                <a href="/suporte/senha">Esqueci a senha</a>
            </div>
        </GlassCard>
    </NeonBorder>

    <!-- Botão de Idiomas Modo Gaveta -->
    <button class="lang-trigger" on:click={() => isLangDrawerOpen = true}>
        <img src="/icons/globe.svg" alt="Idioma" />
    </button>

    {#if isLangDrawerOpen}
        <LanguageDrawer on:close={() => isLangDrawerOpen = false} />
    {/if}
</AuthWrapper>

<style>
    .login-title {
        color: white; text-align: center; font-size: 2.4rem;
        margin-bottom: 30px; letter-spacing: 12px; font-weight: 900;
        text-shadow: 0 0 20px var(--neon-cyan);
    }

    .input-stack { width: 100%; display: flex; flex-direction: column; gap: 15px; }

    .field-container { position: relative; width: 100%; }

    .invis-input {
        width: 100%; padding: 18px; background: rgba(255,255,255,0.03);
        border: 1px solid var(--neon-border-cyan); border-radius: 14px;
        color: white; font-family: var(--font-main); text-align: center;
        transition: 0.3s;
    }

    .invis-input::placeholder { color: rgba(255,255,255,0.3); letter-spacing: 1px; }

    .invis-input:focus { border-color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 200, 255, 0.2); }

    .eye-toggle {
        position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
        background: none; border: none; cursor: pointer; font-size: 1.2rem;
    }

    .btn-primary-neon {
        width: 100%; margin-top: 30px; padding: 18px;
        background: var(--neon-cyan); color: #000; font-weight: 900;
        border-radius: 14px; border: none; box-shadow: 0 0 25px var(--neon-cyan);
        cursor: pointer; text-transform: uppercase; letter-spacing: 2px;
    }

    .social-matrix { margin-top: 35px; text-align: center; width: 100%; }
    .social-matrix p { font-size: 0.7rem; color: #555; letter-spacing: 3px; margin-bottom: 15px; }
    .social-icons { display: flex; justify-content: center; gap: 30px; }

    .social-trigger {
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        width: 60px; height: 60px; border-radius: 50%; display: flex;
        align-items: center; justify-content: center; cursor: pointer;
        transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .social-trigger:hover { transform: scale(1.15) translateY(-5px); border-color: white; }

    .auth-links { margin-top: 30px; display: flex; flex-direction: column; gap: 10px; align-items: center; }
    .auth-links a { color: var(--neon-cyan); text-decoration: none; font-size: 0.8rem; opacity: 0.6; transition: 0.3s; }
    .auth-links a:hover { opacity: 1; text-shadow: 0 0 8px var(--neon-cyan); }

    .lang-trigger {
        position: fixed; top: 30px; right: 30px; background: rgba(0,0,0,0.5);
        border: 1px solid var(--neon-cyan); border-radius: 50%; width: 50px; height: 50px;
        display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 100;
    }

    .no-select { -webkit-tap-highlight-color: transparent; outline: none; }
    :global(.no-select:focus) { outline: none; }
</style>