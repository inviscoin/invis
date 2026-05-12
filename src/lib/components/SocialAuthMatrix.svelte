<script>
  import { supabase } from '$lib/database';
  import { scale, fade } from 'svelte/transition';

  export let isLoading = false;

  async function loginWithProvider(provider) {
    isLoading = true;
    console.log(`Iniciando Handshake Bouncer com ${provider}...`);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        // Redirecionamento obrigatório para o domínio soberano configurado [7]
        redirectTo: 'https://inviscore.com/dashboard'
      }
    });

    if (error) {
      console.error("Erro na autenticação social:", error.message);
      isLoading = false;
    }
  }
</script>

<div class="social-auth-matrix gpu-accelerated" in:fade>
  <p class="matrix-label">CONEXÕES SOCIAIS</p>
  
  <div class="social-grid">
    <!-- Botão Google: Cyan Neon Estímulo -->
    <button 
      on:click={() => loginWithProvider('google')} 
      class="social-btn google glass-morphism" 
      disabled={isLoading}
      aria-label="Login com Google"
    >
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c1.08-1.01 2.08-2.48 2.52-4.14.34-1.25.51-2.61.51-3.95z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <div class="hover-glow" style="background: var(--neon-cyan)"></div>
    </button>

    <!-- Botão Facebook: Azul Royal Profundo -->
    <button 
      on:click={() => loginWithProvider('facebook')} 
      class="social-btn facebook glass-morphism" 
      disabled={isLoading}
      aria-label="Login com Facebook"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073S0 5.446 0 12.073c0 5.99 4.348 10.951 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.652 23.024 24 18.062 24 12.073z"/>
      </svg>
      <div class="hover-glow" style="background: #1877F2"></div>
    </button>

    <!-- Botão Instagram: Gradiente Épico -->
    <button 
      on:click={() => loginWithProvider('instagram')} 
      class="social-btn instagram glass-morphism" 
      disabled={isLoading}
      aria-label="Login com Instagram"
    >
      <svg viewBox="0 0 24 24" width="28" height="28">
        <defs>
          <radialGradient id="ig-grad-matrix" cx="0.5" cy="1" r="1">
            <stop offset="0%" stop-color="#fee411"/>
            <stop offset="25%" stop-color="#fedb16"/>
            <stop offset="50%" stop-color="#a4309a"/>
            <stop offset="100%" stop-color="#3b33af"/>
          </radialGradient>
        </defs>
        <path fill="url(#ig-grad-matrix)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.353 2.619 6.778 6.981 6.98 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.777-2.62 6.98-6.98.059-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.2-4.353-2.619-6.777-6.983-6.98C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.222.144 4.775 1.974 4.921 5.212.054 1.265.069 1.648.069 4.849s-.015 3.585-.069 4.849c-.149 3.228-1.709 5.057-4.921 5.212-1.265.054-1.648.069-4.849.069s-3.585-.015-4.849-.069c-3.224-.144-4.775-1.975-4.921-5.212-.054-1.265-.069-1.648-.069-4.849s.015-3.585.069-4.849c.149-3.224 1.709-5.056 4.921-5.212 1.265-.055 1.648-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
      <div class="hover-glow" style="background: linear-gradient(45deg, #fee411, #3b33af)"></div>
    </button>
  </div>
</div>

<style>
  .social-auth-matrix {
    margin-top: 35px;
    text-align: center;
    width: 100%;
  }

  .matrix-label {
    color: #444;
    font-size: 0.65rem;
    letter-spacing: 4px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .social-grid {
    display: flex;
    justify-content: center;
    gap: 25px;
    perspective: 1000px;
  }

  .social-btn {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                box-shadow 0.4s, 
                border-color 0.4s;
  }

  .social-btn:hover:not(:disabled) {
    transform: scale(1.15) translateZ(20px);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }

  .social-btn:active {
    transform: scale(0.95);
  }

  .social-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  .hover-glow {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s;
    filter: blur(15px);
    z-index: -1;
  }

  .social-btn:hover .hover-glow {
    opacity: 0.3;
  }

  svg {
    z-index: 2;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
  }
</style>