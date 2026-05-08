<script>
  import GlassCard from "$lib/components/GlassCard.svelte";
  import NeonBorder from "$lib/components/NeonBorder.svelte";
  
  let fullName = "", email = "", nickname = "", password = "", ddi = "+55", phone = "";
  let errorMsg = "";

  // Regex Exigida: Mínimo 6 chars, 1 Maiusc, 1 Minusc, 1 Num, 1 Simbolo [12]
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

  function blockSpaces(e) {
    if (e.key === " ") e.preventDefault(); // Regra de Ouro [10]
  }

  async function register() {
    if (fullName.length < 15) return errorMsg = "Nome completo inválido (mínimo 15 letras)";
    if (!email.includes("@")) return errorMsg = "E-mail inválido";
    if (nickname.length < 5 || nickname.length > 10) return errorMsg = "Nickname: 5 a 10 caracteres";
    if (!passRegex.test(password)) return errorMsg = "Senha fora dos padrões de segurança";
    
    // Sucesso -> Próximo passo: Trava de Idade [13]
    window.location.href = "/onboarding/age";
  }
</script>

<main class="auth-page">
  <NeonBorder color="var(--neon-emerald)">
    <GlassCard padding="30px">
      <h2 class="title">NOVA CONTA INVIS</h2>

      <div class="form-grid">
        <input type="text" placeholder="Nome Completo" bind:value={fullName} />
        
        <input type="email" placeholder="E-mail" bind:value={email} on:keydown={blockSpaces} />
        
        <input type="text" placeholder="Nickname (Público)" bind:value={nickname} on:keydown={blockSpaces} maxlength="10" />

        <div class="phone-row">
          <input type="text" class="ddi" bind:value={ddi} on:keydown={blockSpaces} maxlength="4" />
          <input type="text" class="phone" placeholder="999999999" bind:value={phone} on:keydown={blockSpaces} maxlength="9" />
        </div>

        <input type="password" placeholder="Senha" bind:value={password} on:keydown={blockSpaces} />
        {#if !passRegex.test(password) && password !== ""}
          <p class="helper">Use: ABC, abc, 123 e @#$</p>
        {/if}
      </div>

      {#if errorMsg} <p class="error">{errorMsg}</p> {/if}

      <button class="btn-register" on:click={register}>CRIAR CONTA</button>
    </GlassCard>
  </NeonBorder>
</main>

<style>
  .auth-page { height: 100vh; display: flex; justify-content: center; align-items: center; background: var(--bg-main); padding: 20px; }
  .title { color: var(--neon-emerald); text-align: center; margin-bottom: 20px; }
  .form-grid input {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(0, 255, 128, 0.2);
    padding: 12px; border-radius: 8px; color: white; margin-bottom: 12px;
  }
  .phone-row { display: flex; gap: 10px; }
  .ddi { width: 80px !important; text-align: center; color: var(--neon-cyan) !important; }
  .helper { font-size: 0.7rem; color: var(--neon-red); margin-top: -10px; margin-bottom: 10px; }
  .error { color: var(--neon-red); text-align: center; font-size: 0.9rem; margin: 10px 0; }
  .btn-register {
    width: 100%; padding: 15px; background: var(--neon-emerald); color: black; font-weight: bold;
    border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 0 15px var(--neon-emerald);
  }
</style>