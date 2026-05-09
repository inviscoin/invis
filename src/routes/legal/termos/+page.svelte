<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let hasReadToBottom = false;
  let userIP = "Detectando...";

  onMount(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      userIP = data.ip;
    } catch (e) { userIP = "Erro na captura"; }
  });

  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      hasReadToBottom = true; // Libera aceite [13, 14]
    }
  }
</script>

<main class="legal-page">
  <section class="content-container glass-morphism" in:fade>
    <header class="legal-header">
      <h1 class="neon-text-cyan">TERMOS DE USO</h1>
      <p class="subtitle">IP DE ACESSO: {userIP}</p>
    </header>

    <div class="scroll-content no-scrollbar" on:scroll={handleScroll}>
      <p><strong>ESTRITA OBSERVÂNCIA À LGPD</strong></p>
      <p>O usuário declara ciência de que o ecossistema INVIS é restrito e que suas interações sociais em Fórum e Chat são protegidas contra indexadores externos via metatags <em>noindex/nofollow</em> [13, 15].</p>
      
      <p>Você é co-responsável pela integridade dos dados e concorda com a remoção automática de metadados em todos os uploads [16].</p>
      
      <p>A mineração de INVISCoins é vinculada ao tempo de tela ativa. O uso de robôs ou Auto-Clickers resultará em Shadow-Ban automático pelos <strong>Circuit Breakers</strong> [17, 18].</p>
    </div>

    <div class="action-footer">
      <button class="btn-accept" disabled={!hasReadToBottom}>
        {hasReadToBottom ? "ACEITO E ASSINO" : "ROLE ATÉ O FIM"}
      </button>
      <p class="timestamp">Data/Hora: {new Date().toLocaleString()}</p>
    </div>
  </section>
</main>

<style>
  .btn-accept {
    width: 100%; padding: 18px; border-radius: 12px; border: none;
    background: var(--neon-emerald); color: #000; font-weight: bold;
    cursor: pointer; transition: 0.3s; box-shadow: 0 0 20px var(--neon-emerald);
  }
  .btn-accept:disabled {
    background: #333; color: #666; box-shadow: none; cursor: not-allowed;
  }
  .action-footer { margin-top: 25px; text-align: center; }
  .timestamp { font-size: 0.6rem; color: #555; margin-top: 10px; }
</style>