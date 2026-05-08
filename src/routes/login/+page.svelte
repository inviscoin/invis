<script>
  import GlassCard from "$lib/components/GlassCard.svelte";
  import NeonBorder from "$lib/components/NeonBorder.svelte";
  let identifier = ""; // Usuário, Telefone ou E-mail [8, 9]
  let password = "";
  let showPassword = false;

  async function handleSocial(provider) {
    console.log(`Conectando com ${provider}...`); // Integração OAuth 2.0 [8]
  }
</script>

<main class="auth-page">
  <NeonBorder color="var(--neon-cyan)" pulse={true}>
    <GlassCard padding="40px">
      <h1 class="login-title">LOGIN</h1> <!-- Nomenclatura exigida [6] -->

      <div class="input-matrix">
        <div class="field">
          <input type="text" placeholder="Usuário, E-mail ou Telefone" bind:value={identifier} />
        </div>
        
        <div class="field password-field">
          <input type={showPassword ? "text" : "password"} placeholder="Senha" bind:value={password} />
          <button class="eye-toggle" on:click={() => showPassword = !showPassword}>
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>
      </div>

      <button class="btn-main-neon">ENTRAR</button>

      <div class="social-divider">
        <span>Ou conecte com</span>
      </div>

      <!-- Conexões Exigidas [6] -->
      <div class="social-grid">
        <button on:click={() => handleSocial('google')} class="social-btn">
          <img src="/icons/google.svg" alt="Google" />
        </button>
        <button on:click={() => handleSocial('facebook')} class="social-btn">
          <img src="/icons/facebook.svg" alt="Facebook" />
        </button>
        <button on:click={() => handleSocial('instagram')} class="social-btn">
          <img src="/icons/instagram.svg" alt="Instagram" />
        </button>
      </div>

      <div class="auth-links">
        <a href="/cadastro">Não possui cadastro? Click Aqui</a> <!-- Link oficial [7] -->
        <a href="/suporte/senha">Esqueci a senha</a>
      </div>
    </GlassCard>
  </NeonBorder>
</main>

<style>
  .auth-page { height: 100vh; display: flex; justify-content: center; align-items: center; background: var(--bg-main); }
  .login-title { color: white; text-align: center; font-size: 2rem; margin-bottom: 30px; letter-spacing: 4px; }
  
  .input-matrix input {
    width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--neon-border-cyan);
    padding: 15px; border-radius: 12px; color: white; margin-bottom: 15px;
  }

  .password-field { position: relative; }
  .eye-toggle { position: absolute; right: 15px; top: 15px; background: none; border: none; cursor: pointer; }

  .btn-main-neon {
    width: 100%; padding: 15px; background: var(--neon-cyan); color: black; font-weight: bold;
    border-radius: 12px; border: none; box-shadow: 0 0 20px var(--neon-cyan); cursor: pointer;
  }

  .social-divider { text-align: center; margin: 25px 0; color: #888; font-size: 0.8rem; }
  .social-grid { display: flex; justify-content: center; gap: 20px; margin-bottom: 25px; }
  .social-btn { 
    background: rgba(255,255,255,0.1); border: 1px solid rgba(0, 200, 255, 0.3);
    padding: 10px; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
  }
  .auth-links { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .auth-links a { color: var(--neon-cyan); text-decoration: none; font-size: 0.85rem; opacity: 0.8; }
</style>