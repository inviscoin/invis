<script>
  import { fade } from 'svelte/transition';
</script>

<main class="legal-page">
  <section class="content-container glass-morphism" in:fade>
    <header class="legal-header">
      <h1 class="neon-text-cyan">EXCLUSÃO DE DADOS</h1>
      <p class="subtitle">DIREITO AO ESQUECIMENTO E REVOGAÇÃO OAUTH</p>
    </header>

    <div class="scroll-content no-scrollbar">
      <p>Para cumprir as normas do Facebook/Instagram e da LGPD, o INVIS disponibiliza o protocolo de expurgo de dados [10, 11].</p>
      
      <div class="steps">
        <div class="step">
          <span class="step-num">01</span>
          <p>Acesse <strong>Perfil > Aba 1</strong> e clique em <strong>Suspender Conta</strong> para o congelamento imediato [12].</p>
        </div>
        <div class="step">
          <span class="step-num">02</span>
          <p>Para remoção definitiva, envie um ticket em <strong>Contato</strong> com o assunto "Hard Delete".</p>
        </div>
        <div class="step">
          <span class="step-num">03</span>
          <p><strong>Período de Graça:</strong> Seus dados ficam em Soft Delete por 30 dias. No 31º dia, ocorre o expurgo permanente de mensagens e tokens sociais [11].</p>
        </div>
      </div>

      <div class="note glass-morphism">
        <p><strong>Importante:</strong> Recibos de saques FIAT são mantidos por 5 anos conforme exigência da Receita Federal [11].</p>
      </div>
    </div>
    
    <footer class="legal-footer">
       <a href="/login" class="back-link">Retornar ao Login</a>
    </footer>
  </section>
</main>

<style>
  /* Importa os mesmos estilos base da página de privacidade */
  .step { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
  .step-num { 
    background: var(--neon-cyan); color: #000; 
    font-weight: 900; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem;
  }
  .note { padding: 15px; border: 1px solid var(--neon-emerald); border-radius: 12px; margin-top: 20px; }
</style>