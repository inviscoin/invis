<script>
  import GlassCard from "../../lib/components/GlassCard.svelte";
  import NeonBorder from "../../lib/components/NeonBorder.svelte";
  let identifier = "";
  let password = "";

  async function handleLogin() {
    // Lógica de Identificação Unificada (Nick, Email ou Telefone) [5]
    console.log("Tentando login para:", identifier);
  }
</script>

<main class="auth-container">
  <NeonBorder color="var(--neon-cyan)" pulse={true}>
    <GlassCard padding="40px">
      <div class="login-header">
        <img src="/logo-invis.svg" alt="INVIS" class="logo" />
        <h2>Conectar à Matriz</h2>
      </div>

      <div class="input-group">
        <input type="text" placeholder="Usuário, E-mail ou Telefone" bind:value={identifier} />
        <input type="password" placeholder="Senha" bind:value={password} />
      </div>

      <button class="btn-login" on:click={handleLogin}>ENTRAR</button>
      
      <div class="auth-footer">
        <a href="/cadastro">Não possui conta? Clique Aqui</a>
      </div>
    </GlassCard>
  </NeonBorder>
</main>

<style>
  .auth-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, #0b0e11 0%, #050508 100%);
  }
  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--neon-border-cyan);
    border-radius: 8px;
    color: white;
  }
  .btn-login {
    width: 100%;
    padding: 15px;
    background: var(--neon-emerald);
    color: black;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 15px var(--neon-emerald);
  }
  .auth-footer {
    margin-top: 20px;
    text-align: center;
  }
  a { color: var(--neon-cyan); text-decoration: none; font-size: 0.8rem; }
</style>