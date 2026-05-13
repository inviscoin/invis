<script>
    /* ARQUIVO: src/routes/onboarding/age/+page.svelte */
    /* OBJETIVO: VALIDAÇÃO DE IDADE IMUTÁVEL E SEGREGAÇÃO JURÍDICA */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade, scale } from 'svelte/transition';

    let birthInput = "";
    let age = null;
    let isValid = false;

    function handleInput(e) {
        // Máscara automática dd/mm/aa [3, 4]
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 6) v = v.substring(0, 6);
        
        if (v.length >= 2) v = v.substring(0, 2) + "/" + v.substring(2);
        if (v.length >= 5) v = v.substring(0, 5) + "/" + v.substring(5);
        
        birthInput = v;

        if (v.length === 8) {
            calculateAge(v);
        } else {
            isValid = false;
            age = null;
        }
    }

    function calculateAge(dateStr) {
        const [day, month, yearShort] = dateStr.split('/').map(Number);
        const fullYear = yearShort > 25 ? 1900 + yearShort : 2000 + yearShort;
        const birthDate = new Date(fullYear, month - 1, day);
        const today = new Date();
        
        let calculated = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculated--;
        }
        
        age = calculated;
        isValid = age >= 0 && age < 120;
    }

    async function confirmAge() {
        if (!isValid) return;
        localStorage.setItem('invis_age', age);
        localStorage.setItem('invis_dob', birthInput);
        // Grava no Supabase via Bouncer
        goto('/legal/termos');
    }

    function cancel() {
        // Expurgo de dados conforme regra INVIS [4]
        localStorage.clear();
        goto('/login');
    }
</script>

<AuthWrapper>
    <div class="age-matrix-center" in:scale>
        <GlassCard padding="50px" borderColor="var(--neon-cyan)">
            <div class="age-header">
                <svg viewBox="0 0 100 100" class="age-icon-svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--neon-cyan)" stroke-width="1" stroke-dasharray="5 5" />
                    <path d="M30,70 Q50,20 70,70" stroke="var(--neon-emerald)" fill="none" stroke-width="3" />
                    <circle cx="50" cy="40" r="10" fill="var(--neon-cyan)" />
                </svg>
                <h2>QUAL SUA DATA DE NASCIMENTO?</h2>
            </div>

            <div class="input-container">
                <input type="text" 
                       placeholder="dd/mm/aa" 
                       value={birthInput}
                       on:input={handleInput}
                       maxlength="8"
                       class="age-input no-select" />
                
                {#if age !== null}
                    <p class="age-display" in:fade>{age} ANOS</p>
                {/if}
            </div>

            <div class="btn-group">
                <button class="btn-cancel" on:click={cancel}>CANCELAR</button>
                <button class="btn-confirm" disabled={!isValid} on:click={confirmAge}>OK</button>
            </div>
            
            <p class="legal-note">Esta informação é imutável e define seu ambiente.</p>
        </GlassCard>
    </div>
</AuthWrapper>

<style>
    .age-matrix-center { width: 100%; max-width: 450px; text-align: center; }

    .age-header h2 {
        color: white; font-size: 1rem; letter-spacing: 4px; margin-top: 20px;
        text-shadow: 0 0 10px var(--neon-cyan);
    }

    .age-icon-svg { width: 80px; height: 80px; margin: 0 auto; filter: drop-shadow(0 0 10px var(--neon-cyan)); }

    .input-container { margin: 40px 0; position: relative; }

    .age-input {
        background: transparent; border: none; border-bottom: 2px solid var(--neon-cyan);
        color: white; font-size: 2.5rem; text-align: center; width: 100%;
        font-family: monospace; outline: none; letter-spacing: 5px;
    }

    .age-display {
        color: var(--neon-emerald); font-weight: 900; font-size: 1.2rem;
        margin-top: 15px; letter-spacing: 3px; text-shadow: 0 0 8px var(--neon-emerald);
    }

    .btn-group { display: flex; gap: 20px; justify-content: center; }

    .btn-confirm {
        background: var(--neon-emerald); color: #000; font-weight: 900;
        padding: 15px 40px; border-radius: 12px; border: none; cursor: pointer;
        box-shadow: 0 0 20px var(--neon-emerald);
    }

    .btn-confirm:disabled { background: #333; color: #666; cursor: not-allowed; box-shadow: none; }

    .btn-cancel {
        background: transparent; border: 1px solid var(--neon-red); color: var(--neon-red);
        padding: 15px 30px; border-radius: 12px; cursor: pointer; font-weight: 800;
    }

    .legal-note { font-size: 0.6rem; color: #555; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; }

    .no-select { -webkit-tap-highlight-color: transparent; }
</style>