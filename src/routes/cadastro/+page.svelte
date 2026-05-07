<!-- ARQUIVO: src/routes/cadastro/+page.svelte -->
<script>
    let email = "", password = "", nickname = "";
    let errorMsg = "";

    // Regex INVIS: Mínimo 6 caracteres, maiúscula, minúscula, número e símbolo [24, 25].
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

    async function handleRegister() {
        // Bloqueia espaços em branco [16].
        if ([email, password, nickname].some(v => v.includes(" "))) {
            errorMsg = "Espaços não são permitidos";
            return;
        }

        if (!passwordRegex.test(password)) {
            errorMsg = "Senha fora dos padrões de segurança";
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });
        if (!error) window.location.href = "/onboarding/age";
    }
</script>

<div class="glass-auth-card">
    <h2>Nova Conta INVIS</h2>
    <input type="text" placeholder="Nickname" bind:value={nickname} maxlength="10" />
    <input type="email" placeholder="E-mail" bind:value={email} />
    <input type="password" placeholder="Senha" bind:value={password} />
    <button on:click={handleRegister}>Criar</button>
</div>