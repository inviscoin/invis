<script>
  import GlassCard from "$lib/components/GlassCard.svelte";
  import NeonBorder from "$lib/components/NeonBorder.svelte";
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let identifier = ""; // Aceita Usuário, Telefone ou E-mail conforme regra unificada [1]
  let password = "";
  let showPassword = false;
  let isLoading = false;

  async function handleLogin() {
    isLoading = true;
    // Simulação de autenticação via Bouncer/Supabase
    setTimeout(() => {
      isLoading = false;
      goto('/dashboard');
    }, 1500);
  }

  async function handleSocial(provider) {
    console.log(`Iniciando Handshake OAuth 2.0 com ${provider}...`);
    // Chamada ao API Gateway para injetar chaves secretas ocultas [2]
  }
</script>

<main class="auth-page">
  <div class="background-fx"></div>
  
  <NeonBorder color="var(--neon-cyan)" pulse={true}>
    <GlassCard padding="40px">
      <h1 class="login-title">LOGIN</h1>

      <div class="input-matrix" in:slide>
        <div class="field">
          <input 
            type="text" 
            placeholder="Usuário, E-mail ou Telefone" 
            bind:value={identifier} 
            autocomplete="username"
          />
        </div>

        <div class="field password-field">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Senha" 
            bind:value={password} 
            autocomplete="current-password"
          />
          <button class="eye-toggle" on:click={() => showPassword = !showPassword} type="button">
            {#if showPassword}
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {:else}
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {/if}
          </button>
        </div>
      </div>

      <button class="btn-main-neon" on:click={handleLogin} disabled={isLoading}>
        {isLoading ? "PROCESSANDO..." : "ENTRAR"}
      </button>

      <div class="social-divider">
        <span>Ou conecte com</span>
      </div>

      <div class="social-grid">
        <button on:click={() => handleSocial('google')} class="social-btn google" aria-label="Google">
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#EA4335" d="M12 5.04c1.94 0 3.68.67 5.05 1.97l3.77-3.77C18.55 1.33 15.48 0 12 0 7.31 0 3.32 2.69 1.33 6.65l4.39 3.41c1.03-3.01 3.88-5.02 6.28-5.02z"/><path fill="#FBBC05" d="M24 12.27c0-.88-.08-1.74-.21-2.58H12v4.89h6.73c-.29 1.57-1.14 2.89-2.48 3.78l4.39 3.41c2.57-2.37 4.05-5.86 4.05-9.5z"/><path fill="#4285F4" d="M5.72 14.16a7.2 7.2 0 0 1 0-4.32L1.33 6.4c-1.29 2.58-1.33 5.62 0 8.2l4.39-3.44z"/><path fill="#34A853" d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-4.39-3.41c-1.11.74-2.53 1.18-3.57 1.18-2.4 0-4.44-1.62-5.17-3.8l-4.39 3.41c2 3.96 5.99 6.65 9.56 6.65z"/></svg>
        </button>
        <button on:click={() => handleSocial('facebook')} class="social-btn facebook" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12.073-12-12.073S0 5.446 0 12.073c0 5.99 4.348 10.951 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.652 23.024 24 18.062 24 12.073z"/></svg>
        </button>
        <button on:click={() => handleSocial('instagram')} class="social-btn instagram" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="24" height="24"><radialGradient id="rg" cx="0.5" cy="1.0" r="1.0"><stop offset="0%" stop-color="#fee411"/><stop offset="5%" stop-color="#fedb16"/><stop offset="10%" stop-color="#fec125"/><stop offset="15%" stop-color="#fe9b3a"/><stop offset="20%" stop-color="#fe7b4c"/><stop offset="25%" stop-color="#ff5c5c"/><stop offset="30%" stop-color="#ff4b65"/><stop offset="35%" stop-color="#ff3379"/><stop offset="40%" stop-color="#a4309a"/><stop offset="45%" stop-color="#7332a6"/><stop offset="50%" stop-color="#3b33af"/></radialGradient><path fill="url(#rg)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.353 2.619 6.778 6.981 6.98 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.777-2.62 6.98-6.98.059-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.2-4.353-2.619-6.777-6.983-6.98C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.222.144 4.775 1.974 4.921 5.212.054 1.265.069 1.648.069 4.849s-.015 3.585-.069 4.849c-.149 3.228-1.709 5.057-4.921 5.212-1.265.054-1.648.069-4.849.069s-3.585-.015-4.849-.069c-3.224-.144-4.775-1.975-4.921-5.212-.054-1.265-.069-1.648-.069-4.849s.015-3.585.069-4.849c.149-3.224 1.709-5.056 4.921-5.212 1.265-.055 1.648-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </button>
      </div>

      <div class="auth-links">
        <a href="/cadastro">Não possui cadastro? Clique Aqui</a>
        <a href="/suporte/senha">Esqueci a senha</a>
      </div>
    </GlassCard>
  </NeonBorder>
</main>

<style>
  .auth-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-main);
    position: relative;
    overflow: hidden;
  }

  .background-fx {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, #1a1a40 0%, #0b0e11 100%);
    opacity: 0.5;
  }

  .login-title {
    color: white;
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    letter-spacing: 6px;
    font-family: var(--font-main);
    text-shadow: 0 0 15px var(--neon-cyan);
  }

  .input-matrix {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .field {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--neon-border-cyan);
    padding: 18px;
    border-radius: 12px;
    color: white;
    font-family: var(--font-main);
    transition: 0.3s;
    outline: none;
  }

  input:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.2);
    background: rgba(255, 255, 255, 0.07);
  }

  .eye-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--neon-cyan);
    cursor: pointer;
    opacity: 0.6;
  }

  .btn-main-neon {
    width: 100%;
    margin-top: 25px;
    padding: 18px;
    background: var(--neon-cyan);
    color: #000;
    font-weight: 900;
    border-radius: 12px;
    border: none;
    box-shadow: 0 0 25px var(--neon-cyan);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .btn-main-neon:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 0 40px var(--neon-cyan);
  }

  .social-divider {
    text-align: center;
    margin: 30px 0;
    color: #666;
    font-size: 0.75rem;
    position: relative;
  }

  .social-divider::before, .social-divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #333;
  }

  .social-divider::before { left: 0; }
  .social-divider::after { right: 0; }

  .social-grid {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 30px;
  }

  .social-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
  }

  .social-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--neon-cyan);
    transform: translateY(-5px);
  }

  .auth-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .auth-links a {
    color: var(--neon-cyan);
    text-decoration: none;
    font-size: 0.8rem;
    opacity: 0.7;
    transition: 0.3s;
  }

  .auth-links a:hover {
    opacity: 1;
    text-shadow: 0 0 8px var(--neon-cyan);
  }
</style>