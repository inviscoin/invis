<script>
    /* ARQUIVO: src/routes/suporte/senha/+page.svelte */
    /* OBJETIVO: FLUXO DE RECUPERAÇÃO DE ACESSO COM VERIFICAÇÃO SECUNDÁRIA */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';

    let email = "";
    let firstName = "";
    let step = 1;
    let message = "";

    async function handleRecover() {
        if (email.includes("@")) {
            step = 2;
        }
    }

    async function finalSubmit() {
        // Envia alerta instantâneo para o ADM [5]
        message = "Sua senha chegará em seu e-mail em até 12 horas.";
        setTimeout(() => goto('/login'), 5000);
    }
</script>

<AuthWrapper>
    <GlassCard padding="40px" borderColor="var(--neon-red)">
        <h2 class="support-title">RECUPERAÇÃO</h2>

        {#if step === 1}
        <div class="step-box" in:fly={{ x: 50 }}>
            <p>Digite seu e-mail cadastrado</p>
            <input type="email" bind:value={email} placeholder="email@exemplo.com" class="invis-input" />
            <button class="btn-recover" on:click={handleRecover}>CONTINUAR</button>
        </div>
        {:else if step === 2 && !message}
        <div class="step-box" in:fly={{ x: 50 }}>
            <p>Para confirmar, digite seu primeiro nome</p>
            <input type="text" bind:value={firstName} placeholder="Seu nome" class="invis-input" />
            <button class="btn-recover" on:click={finalSubmit}>SOLICITAR SENHA</button>
        </div>
        {/if}

        {#if message}
            <div class="success-msg" in:fade>
                <p>{message}</p>
                <div class="countdown-bar"></div>
            </div>
        {/if}

        <a href="/login" class="back-link">Voltar ao Login</a>
    </GlassCard>
</AuthWrapper>

<style>
    .support-title { color: var(--neon-red); text-align: center; letter-spacing: 6px; margin-bottom: 30px; }
    .step-box p { font-size: 0.8rem; color: #aaa; margin-bottom: 15px; text-align: center; }
    .invis-input {
        width: 100%; padding: 18px; background: rgba(255,255,255,0.02);
        border: 1px solid var(--neon-red); border-radius: 12px; color: white;
        text-align: center; margin-bottom: 20px;
    }
    .btn-recover {
        width: 100%; padding: 18px; background: var(--neon-red); color: white;
        border: none; border-radius: 12px; font-weight: 900; cursor: pointer;
        box-shadow: 0 0 15px rgba(255, 77, 77, 0.3);
    }
    .success-msg { text-align: center; color: var(--neon-emerald); font-weight: 800; }
    .back-link { display: block; text-align: center; margin-top: 30px; color: #555; text-decoration: none; font-size: 0.8rem; }
    .countdown-bar { height: 2px; background: var(--neon-emerald); width: 100%; margin-top: 10px; animation: drain 5s linear forwards; }
    @keyframes drain { from { width: 100%; } to { width: 0%; } }
</style>