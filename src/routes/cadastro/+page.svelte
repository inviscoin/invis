<script>
  let email = "", password = "", nickname = "", ddi = "+55", phone = "", fullName = "";

  // Bloqueio de espaços em tempo real [16]
  function blockSpaces(e) {
    if (e.key === " ") e.preventDefault();
  }
</script>

<main class="auth-page">
  <GlassCard padding="30px">
    <h2>CADASTRO INVIS</h2>
    <input type="text" placeholder="Nome Completo" bind:value={fullName} />
    <input type="text" placeholder="Nickname (5-10 chars)" bind:value={nickname} on:keydown={blockSpaces} maxlength="10" />
    <input type="email" placeholder="E-mail" bind:value={email} on:keydown={blockSpaces} />
    
    <div class="row">
      <input type="text" style="width: 60px" bind:value={ddi} on:keydown={blockSpaces} />
      <input type="text" placeholder="Telefone (9 dígitos)" bind:value={phone} on:keydown={blockSpaces} maxlength="9" />
    </div>

    <input type="password" placeholder="Senha (Mín. 6 chars + Símbolo)" bind:value={password} on:keydown={blockSpaces} />
    
    <button class="btn-main">CRIAR CONTA</button>
  </GlassCard>
</main>