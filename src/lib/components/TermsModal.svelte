<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let hasReadToBottom = false;

  // Lógica de monitoramento de rolagem conforme regra INVIS
  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      hasReadToBottom = true;
    }
  }

  function handleAccept() {
    if (hasReadToBottom) dispatch('accept');
  }

  function handleDecline() {
    // Se discordar, a conta temporária deve ser expurgada [4]
    dispatch('decline');
  }
</script>

<div class="terms-overlay">
  <div class="glass-modal">
    <h2>Termos de Uso e Privacidade</h2>
    
    <div class="terms-content" on:scroll={handleScroll}>
      <p><strong>ESTRITA OBSERVÂNCIA À LGPD (Lei nº 13.709/2018)</strong></p>
      <p><strong>Cláusula 1:</strong> Este documento formaliza o compromisso de segurança e zelo pelos registros, evitando vazamentos e acessos indevidos [3].</p>
      <p><strong>Cláusula 2:</strong> O ecossistema INVIS é restrito. Fotos de fórum e chat são protegidas contra indexadores externos (noindex/nofollow) [4].</p>
      <p><strong>Cláusula 3:</strong> O usuário é co-responsável pela integridade dos dados e concorda com a remoção automática de metadados (EXIF Stripping) em uploads [4, 5].</p>
      <p>... (Texto jurídico completo do padrão INVIS) ...</p>
    </div>

    <div class="button-row">
      <button class="btn-decline" on:click={handleDecline}>Discordo</button>
      <button 
        class="btn-accept" 
        disabled={!hasReadToBottom} 
        on:click={handleAccept}
      >
        Ciente
      </button>
    </div>
  </div>
</div>

<style>
  .terms-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(25px);
    display: flex; justify-content: center; align-items: center; z-index: 10000;
  }
  .glass-modal {
    background: rgba(11, 14, 17, 0.85); width: 90%; max-width: 500px;
    padding: 30px; border-radius: 20px; border: 1px solid #00c8ff; color: white;
  }
  .terms-content {
    height: 300px; overflow-y: auto; background: rgba(255,255,255,0.05);
    padding: 15px; margin: 20px 0; border-radius: 10px; font-size: 0.9rem;
    line-height: 1.5;
  }
  .button-row { display: flex; justify-content: space-between; gap: 15px; }
  .btn-accept { background: #00FF80; color: black; font-weight: bold; flex: 1; height: 45px; border-radius: 8px; cursor: pointer; }
  .btn-accept:disabled { background: #333; color: #666; cursor: not-allowed; }
  .btn-decline { background: transparent; color: #FF4D4D; border: 1px solid #FF4D4D; flex: 1; border-radius: 8px; cursor: pointer; }
</style>