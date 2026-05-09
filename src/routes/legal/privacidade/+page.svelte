<script>
  import { fade, slide } from 'svelte/transition';
</script>

<main class="legal-page">
  <div class="glow-overlay"></div>
  
  <section class="content-container glass-morphism" in:fade>
    <header class="legal-header">
      <h1 class="neon-text-cyan">POLÍTICA DE PRIVACIDADE</h1>
      <p class="subtitle">ESTRITA OBSERVÂNCIA À LEI Nº 13.709/2018 (LGPD)</p>
    </header>

    <div class="scroll-content no-scrollbar">
      <div class="clause">
        <h2>1. COLETA E SEGREGAÇÃO DE DADOS</h2>
        <p>O ecossistema INVIS utiliza o princípio de <strong>Privacy by Design</strong>. Coletamos identificadores unificados (E-mail, Nickname) via OAuth para garantir sua identidade única na Matriz [4, 5].</p>
      </div>

      <div class="clause">
        <h2>2. PROTEÇÃO DE METADADOS (EXIF STRIPPING)</h2>
        <p>Toda imagem enviada ao sistema passa por remoção automática de tags EXIF e coordenadas GPS via Canvas API antes do armazenamento, impossibilitando perseguições (stalking) [6, 7].</p>
      </div>

      <div class="clause">
        <h2>3. ACESSO SOCIAL E FILTROS DE IDADE</h2>
        <p>Seus dados de nascimento são imutáveis e definem qual versão do Dashboard será injetada, garantindo ambientes isolados entre menores e adultos [8, 9].</p>
      </div>

      <div class="clause">
        <h2>4. SEGURANÇA E BOUNCER ENGINE</h2>
        <p>Suas credenciais sociais nunca tocam o Front-end. O motor <strong>Bouncer</strong> mascara os tokens via Proxy Seguro, protegendo sua carteira contra interceptações [90.1, 432].</p>
      </div>
    </div>

    <footer class="legal-footer">
      <div class="social-logos">
        <svg viewBox="0 0 24 24" width="24" fill="var(--neon-cyan)"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.292-2.108 4.452-2.32 2.32-5.92 2.32-8.24 0-2.48-2.48-2.48-6.52 0-9 1.48-1.48 3.52-1.96 5.44-1.44l2.56-2.56C15.56 5.04 12.8 4.56 10.4 5.52c-4.44 1.76-7.36 6.08-7.36 10.88 0 6.36 5.16 11.52 11.52 11.52 3.44 0 6.08-1.12 8.24-3.4 2.24-2.24 3.08-5.36 3.08-7.96 0-.56-.04-1.12-.12-1.64h-13.48z"/></svg>
        <svg viewBox="0 0 24 24" width="24" fill="var(--neon-cyan)"><path d="M24 12.073c0-6.627-5.373-12.073-12-12.073S0 5.446 0 12.073c0 5.99 4.348 10.951 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.652 23.024 24 18.062 24 12.073z"/></svg>
        <svg viewBox="0 0 24 24" width="24" fill="var(--neon-cyan)"><path d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.353 2.619 6.778 6.981 6.98 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.777-2.62 6.98-6.98.059-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.2-4.353-2.619-6.777-6.983-6.98C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 3.222.144 4.775 1.974 4.921 5.212.054 1.265.069 1.648.069 4.849s-.015 3.585-.069 4.849c-.149 3.228-1.709 5.057-4.921 5.212-1.265.054-1.648.069-4.849.069s-3.585-.015-4.849-.069c-3.224-.144-4.775-1.975-4.921-5.212-.054-1.265-.069-1.648-.069-4.849s.015-3.585.069-4.849c.149-3.224 1.709-5.056 4.921-5.212 1.265-.055 1.648-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </div>
      <a href="/" class="back-link">Voltar para o Sistema</a>
    </footer>
  </section>
</main>

<style>
  .legal-page {
    height: 100vh; width: 100vw;
    background: radial-gradient(circle, #3a3a99 0%, #0b0e11 100%);
    display: flex; justify-content: center; align-items: center;
    position: relative; overflow: hidden;
  }
  .glow-overlay {
    position: absolute; inset: 0;
    box-shadow: inset 0 0 200px #000;
    animation: pulseVignette 4s infinite alternate;
  }
  .content-container {
    width: 90%; max-width: 600px; max-height: 85vh;
    padding: 40px; border-radius: 32px;
    background: rgba(11, 14, 17, 0.85);
    border: 1px solid var(--neon-border-cyan);
    display: flex; flex-direction: column;
    z-index: 10;
  }
  .legal-header { text-align: center; margin-bottom: 30px; }
  .neon-text-cyan {
    font-size: 1.8rem; letter-spacing: 4px;
    text-shadow: 0 0 15px var(--neon-cyan);
  }
  .subtitle { color: #666; font-size: 0.7rem; letter-spacing: 2px; }
  .scroll-content { flex: 1; overflow-y: auto; padding-right: 10px; }
  .clause { margin-bottom: 25px; }
  h2 { color: var(--neon-cyan); font-size: 0.9rem; margin-bottom: 10px; letter-spacing: 1px; }
  p { font-size: 0.85rem; line-height: 1.6; color: #ccc; }
  .legal-footer { 
    margin-top: 30px; padding-top: 20px; 
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; flex-direction: column; align-items: center; gap: 20px;
  }
  .social-logos { display: flex; gap: 20px; opacity: 0.5; }
  .back-link { color: var(--neon-emerald); text-decoration: none; font-size: 0.8rem; font-weight: bold; }
  @keyframes pulseVignette { from { opacity: 0.6; } to { opacity: 1; } }
</style>