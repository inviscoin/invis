<script>
  import GlassCard from "$lib/components/GlassCard.svelte";
  import NeonBorder from "$lib/components/NeonBorder.svelte";
  import { fade } from 'svelte/transition';

  let fullName = "", email = "", nickname = "", password = "", ddi = "+55", phone = "";
  let errorMsg = "";

  // Regex Exigida: Mínimo 6 chars, 1 Maiusc, 1 Minusc, 1 Num, 1 Simbolo [3]
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

  function blockSpaces(e) {
    if (e.key === " ") e.preventDefault(); // Regra de Ouro INVIS [17, 25.1]
  }

  async function register() {
    if (fullName.length < 15) return errorMsg = "Nome completo inválido (mínimo 15 letras)";
    if (!email.includes("@")) return errorMsg = "E-mail inválido";
    if (nickname.length < 5 || nickname.length > 10) return errorMsg = "Nickname: 5 a 10 caracteres";
    if (!passRegex.test(password)) return errorMsg = "Senha fora dos padrões de segurança";

    console.log("Registrando nova conta blindada...");
    // Sucesso -> Redireciona para Trava de Idade imutável
    window.location.href = "/onboarding/age";
  }
</script>

<main class="auth-page">
  <div class="bg-mesh"></div>

  <NeonBorder color="var(--neon-emerald)">
    <GlassCard padding="35px">
      <h2 class="reg-title">NOVA CONTA INVIS</h2>

      <div class="form-grid">
        <input type="text" placeholder="Nome Completo" bind:value={fullName} maxlength="50" />
        
        <input 
          type="email" 
          placeholder="E-mail" 
          bind:value={email} 
          on:keydown={blockSpaces} 
          maxlength="40" 
        />

        <input 
          type="text" 
          placeholder="Nickname (Público)" 
          bind:value={nickname} 
          on:keydown={blockSpaces} 
          maxlength="10" 
        />

        <div class="phone-row">
          <input type="text" class="ddi" bind:value={ddi} on:keydown={blockSpaces} maxlength="4" />
          <input 
            type="text" 
            class="phone" 
            placeholder="999999999" 
            bind:value={phone} 
            on:keydown={blockSpaces} 
            maxlength="9" 
          />
        </div>

        <div class="password-wrapper">
          <input 
            type="password" 
            placeholder="Senha" 
            bind:value={password} 
            on:keydown={blockSpaces} 
            maxlength="20"
          />
          {#if !passRegex.test(password) && password !== ""}
            <p class="helper">Use: ABC, abc, 123 e @#$</p>
          {/if}
        </div>
      </div>

      {#if errorMsg}
        <p class="error-toast" in:fade>{errorMsg}</p>
      {/if}

      <button class="btn-register" on:click={register}>CRIAR CONTA</button>
      
      <p class="footer-note">Ao prosseguir, você aceita nossa política de segregação de dados.</p>
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
    padding: 20px;
  }

  .bg-mesh {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(var(--neon-emerald) 0.5px, transparent 0.5px);
    background-size: 30px 30px;
    opacity: 0.05;
  }

  .reg-title {
    color: var(--neon-emerald);
    text-align: center;
    margin-bottom: 25px;
    letter-spacing: 4px;
    font-weight: 800;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 255, 128, 0.2);
    padding: 15px;
    border-radius: 10px;
    color: white;
    font-family: var(--font-main);
    outline: none;
    transition: 0.3s;
  }

  input:focus {
    border-color: var(--neon-emerald);
    background: rgba(0, 255, 128, 0.05);
  }

  .phone-row {
    display: flex;
    gap: 10px;
  }

  .ddi {
    width: 85px !important;
    text-align: center;
    color: var(--neon-cyan) !important;
    font-weight: bold;
  }

  .helper {
    font-size: 0.65rem;
    color: var(--neon-red);
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .error-toast {
    color: #fff;
    background: var(--neon-red);
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.8rem;
    margin: 15px 0;
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.4);
  }

  .btn-register {
    width: 100%;
    padding: 18px;
    margin-top: 20px;
    background: var(--neon-emerald);
    color: #000;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 20px var(--neon-emerald);
    transition: 0.3s;
  }

  .btn-register:hover {
    transform: scale(1.01);
    box-shadow: 0 0 35px var(--neon-emerald);
  }

  .footer-note {
    font-size: 0.6rem;
    color: #555;
    text-align: center;
    margin-top: 20px;
  }
</style>