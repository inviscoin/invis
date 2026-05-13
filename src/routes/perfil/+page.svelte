<script>
    /* ARQUIVO: src/routes/perfil/+page.svelte */
    /* OBJETIVO: DASHBOARD DE IDENTIDADE COM 5 ABAS E TRAVA DE IDADE */
    import AuthWrapper from "$lib/components/AuthWrapper.svelte";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { stripMetadata } from "$lib/utils/exif_stripper";
    import { fade, slide } from "svelte/transition";

    let activeAba = 1; // 1: Perfil, 2: Social, 3: Galeria, 4: Banco, 5: Loja
    let birthDate = "22/04/87";
    let age = 38;

    async function handleGalleryUpload(e) {
        const file = e.target.files;
        if (file) {
            const cleanFile = await stripMetadata(file);
            console.log("Upload limpo e otimizado pronto.");
        }
    }
</script>

<AuthWrapper>
    <div class="profile-matrix gpu-accelerated">
        <nav class="aba-selector">
            {#each [1-5] as i}
                <button class:active={activeAba === i} on:click={() => activeAba = i}>
                    ABA {i}
                </button>
            {/each}
        </nav>

        <GlassCard padding="30px" borderColor="var(--neon-cyan)">
            {#if activeAba === 1}
                <div class="aba-content" in:fade>
                    <h3 class="neon-text-cyan">DADOS CADASTRAIS</h3>
                    <div class="info-row">
                        <label>Data de Nascimento (Imutável)</label>
                        <div class="immutable-field">{birthDate} ({age} anos)</div>
                    </div>
                    <input type="text" placeholder="Nome Completo" class="invis-input" />
                    <input type="email" placeholder="E-mail" class="invis-input" />
                    <button class="btn-update">ATUALIZAR</button>
                    <button class="btn-suspend">SUSPENDER CONTA</button>
                </div>
            {:else if activeAba === 2}
                <div class="aba-content" in:fade>
                    <h3 class="neon-text-purple">IDENTIDADE SOCIAL</h3>
                    <select class="invis-select"><option>Estado Civil</option></select>
                    <select class="invis-select"><option>Hobby Principal</option></select>
                    <textarea placeholder="Descrição (Quem é você na Matriz?)" class="invis-textarea"></textarea>
                </div>
            {:else if activeAba === 3}
                <div class="aba-content" in:fade>
                    <h3 class="neon-text-emerald">GALERIA (40 FOTOS)</h3>
                    <div class="gallery-grid">
                        <label class="upload-square">
                            <input type="file" on:change={handleGalleryUpload} hidden />
                            <span>+</span>
                        </label>
                    </div>
                </div>
            {/if}
        </GlassCard>
    </div>
</AuthWrapper>

<style>
    .profile-matrix { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 20px; }
    .aba-selector { display: flex; justify-content: space-between; padding: 0 10px; }
    .aba-selector button { 
        background: none; border: none; color: #555; font-weight: 800; font-size: 0.7rem; 
        letter-spacing: 2px; cursor: pointer; transition: 0.3s;
    }
    .aba-selector button.active { color: var(--neon-cyan); text-shadow: 0 0 10px var(--neon-cyan); }
    
    .aba-content { display: flex; flex-direction: column; gap: 15px; }
    .neon-text-cyan { letter-spacing: 5px; font-size: 0.9rem; margin-bottom: 20px; }
    .immutable-field { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; color: #888; font-family: monospace; }
    
    .invis-input, .invis-select, .invis-textarea {
        width: 100%; padding: 15px; background: rgba(0,0,0,0.3); border: 1px solid rgba(0, 200, 255, 0.2);
        border-radius: 12px; color: white; outline: none;
    }

    .btn-update { background: var(--neon-emerald); color: #000; font-weight: 900; border: none; padding: 15px; border-radius: 12px; cursor: pointer; }
    .btn-suspend { background: transparent; border: 1px solid var(--neon-red); color: var(--neon-red); padding: 10px; border-radius: 12px; margin-top: 20px; font-size: 0.7rem; }

    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .upload-square { height: 100px; border: 2px dashed rgba(0, 255, 128, 0.3); border-radius: 15px; display: flex; justify-content: center; align-items: center; color: var(--neon-emerald); font-size: 2rem; cursor: pointer; }
</style>