<script>
  import GlassCard from "../../lib/components/GlassCard.svelte";
  import NeonBorder from "../../lib/components/NeonBorder.svelte";
  import { validateIdentity } from "../../lib/auth/unified_login";

  let identifier = "";
  let password = "";
  let errorMsg = "";

  async function handleLogin() {
    const result = await validateIdentity(identifier, password);
    if (!result.success) {
      errorMsg = result.message; [14]
      setTimeout(() => errorMsg = "", 5000);
    }
  }
</script>

<main class="auth-page">
  <NeonBorder color="var(--neon-cyan)">
    <GlassCard padding="40px">
      <h1 class="title">LOGIN</h1> [11]
      
      <div class="input-stack">
        <input type="text" placeholder="Usuário, Telefone ou E-mail" bind:value={identifier} />
        <input type="password" placeholder="Senha" bind:value={password} />
      </div>

      {#if errorMsg}
        <p class="error">{errorMsg}</p>
      {/if}

      <button class="btn-main" on:click={handleLogin}>ENTRAR</button>

      <div class="social-login">
        <p>Ou conecte-se com:</p>
        <div class="icons">
          <!-- Botões sociais exigidos [11, 13] -->
          <button class="google-btn">Google</button>
          <button class="fb-btn">Facebook</button>
          <button class="ig-btn">Instagram</button>
        </div>
      </div>

      <a href="/cadastro" class="link">Não possui cadastro? Clique Aqui</a>
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
  }
  .title { color: var(--neon-cyan); text-align: center; margin-bottom: 30px; }
  input {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--neon-border-cyan);
    border-radius: 12px;
    color: white;
  }
  .btn-main {
    width: 100%;
    padding: 15px;
    background: var(--neon-emerald);
    border: none;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
  .social-login { margin-top: 30px; text-align: center; font-size: 0.8rem; }
  .icons { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
  .link { display: block; text-align: center; margin-top: 20px; color: var(--neon-cyan); text-decoration: none; font-size: 0.8rem; }
</style>